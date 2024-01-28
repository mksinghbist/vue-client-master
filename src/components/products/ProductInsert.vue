<template>
  <div class="container mx-4 my-4">
    <div class="flex">
      <!-- Left Card -->
      <div class="w-full border p-4 lg:w-1/2 shadow-sm bg-gray-100" id="productAdd">
          <div class="custom-file-input-container flex-wrap bg-gray-200 mb-2 p-2" @drop="handleFileDragDrop" @dragover.prevent>
            <input 
              type="file" 
              ref="fileInput"
              @change="handleFileChange" 
              id="fileInput" 
              name="fileInput"
              class="w-full border invisible cursor-pointer"
              required
              accept=".pdf, .jpg, .jpeg, .png"
            />
            <label for="fileInput" class="custom-button cursor-pointer mb-6">
              <i class="fa-solid fa-cloud-arrow-down"></i> Choose a File
            </label>
            <p class="pl-6" v-if="productUpload" v-html="productUploadMsg"></p>
          </div>
          <form @submit.prevent="submitForm">
            <input type= "hidden" id="productUrl" name="productUrl" value="">
            <div class="p-2">
              <strong>Product Type :</strong>
              <select v-model="selectedProduct" class="w-1/3 p-1 ml-2 text-sm text-gray-700 border border-gray-300 rounded">
                <option disabled value="">Choose Products</option>
                <option value="0">Electronic Product</option>
                <option value="1">Grocery Product</option>
                <option value="2">Vegetable Product</option>
                <option value="3">Farmer Product</option>
              </select>
            </div>
            <div class="p-2">
              <strong>Product Title :</strong>
                <input
                  type="text"
                  class="text-center ml-2 w-2/3 text-gray-700 border-blue-500 border-2 rounded"
                  name="productTitle"
                  placeholder="Required"
                  v-model="productTitle"
                  @input="validateTitle"
                  step="any"
                  required
                >
            </div>
            <div class="p-2 flex">
              <div class="w-1/2 pr-2">
                <strong>Price :</strong>
                <input
                  type="text"
                  class="text-center ml-2 text-gray-700 w-1/4 border-blue-500 border-2 rounded"
                  :class="{ 'border-red-500': validationErrorPrice }"
                  name="productQty"
                  placeholder="0"
                  v-model="productPrice"
                  @input="validatePrice"
                  required
                >
                <span v-if="validationErrorPrice" class="text-red-400 ">Price should be greater than 0</span>
              </div>
              <div class="w-1/2 pr-2">
                <strong>Quantity :</strong>
                <input
                  type="number"
                  class="text-center ml-2 text-gray-700 w-1/4 border-blue-500 border-2 rounded"
                  :class="{ 'border-red-500': validationErrorQty }"
                  name="productQty"
                  placeholder="0"
                  v-model="productQty"
                  @input="validateQuantity"
                  step="any"
                  required
                >
                <span v-if="validationErrorQty" class="text-red-400">Quantity should be greater than 0</span>
              </div>
            </div>
            <div class="p-2">
              <div class="mb-2">
                <strong>Description :</strong>
              </div>
              <textarea
                class="w-full h-24 p-2 border-blue-500 border-2 rounded"
                :class="{ 'border-red-500': validationErrorDescription }"
                v-model="productDescription"
                name="productDescription"
                id="productDescription"
                @input="validateDescription"
                placeholder="Enter description here"
                required
              ></textarea>
              <span v-if="validationErrorDescription" class="text-red-400">Description should not be empty</span>
            </div>
            <div class="p-4 flex justify-end">
              <Button bType="button" @click="checkPreviewProduct(previewProduct)">Preview</Button>
              <Button class="ml-5" bType="submit">Add</Button>
            </div>
          </form>
      </div>

      <!-- Right Card -->
      <div v-if="previewProduct" class="w-full lg:w-1/3 border ml-10">
        <div class="w-full border p-2 previous-image">
          <img :src="productImgUrl" alt="" class="h-64 ml-auto mr-auto" />
        </div>
        <div class="p-2">
          <p><strong>{{ productTitle }}</strong></p>
          <strong>Price : {{ productPrice }}</strong>
        </div>
        <div class="p-2">
            <h3>{{ productDescription }}</h3>
        </div>
        <div class="p-4 flex justify-end">
          <Button class="ml-5" bType="text">Buy</Button>
        </div>
      </div>
    </div>
    <AcLoader :loading="isLoading"></AcLoader>
  </div>
</template>

<script>
import { ref , onMounted } from 'vue';
import Button from '../Button.vue'
import { fileUpload , insertDataFromApi} from '@/services/apiService';
import AcLoader from '../common/AcLoader.vue';
export default {
  name: "productInsert",
  components: { Button, AcLoader },
  setup() {
    const productPrice = ref(0);
    const productQty = ref(0);
    const productDescription = ref('');
    const validationErrorPrice = ref(false);
    const validationErrorQty = ref(false);
    const validationErrorDescription = ref(false);
    const previewProduct = ref(false);
    const productTitle = ref('');
    const fileInput = ref(null);
    const productImgUrl = ref('');
    const selectedProduct = ref('');
    const productUploadMsg = ref();
    const productUpload = ref(false);
    const isLoading = ref(false);

    const resetForm = () => {
      productPrice.value = 0;
      productQty.value = 0;
      productDescription.value = '';
      validationErrorPrice.value = false;
      validationErrorQty.value = false;
      validationErrorDescription.value = false;
      previewProduct.value = false;
      productTitle.value = '';
      fileInput.value.value = '';
      productImgUrl.value = '';
      selectedProduct.value = '';
      productUploadMsg.value = '';
      productUpload.value = false;
    }
    const checkProductUploadStatus = (status) => {
      productUpload.value = true;
      if(status) {
        productUploadMsg.value = `<span class="text-green-700"> File Uploaded SuccessFully ...</span>`
      } 
      else {
        productUploadMsg.value = `<span class="text-green-700"> File not uploaded SuccessFully ! Please try again...</span>`
      }

    } 
    const readImage = () => {
      const files = fileInput.value.files;
      if (files.length > 0) {
        const reader = new FileReader();
        reader.onload = (e) => {
          productImgUrl.value = e.target.result;
        };
        reader.readAsDataURL(files[0]);
        checkProductUploadStatus(true);
      }
    };
    const triggerFileInput = () => {
      fileInput.value.click();
    };

    const handleFileChange = () => {
      readImage();
    }; 
    const handleFileDragDrop = (event) => {
      event.preventDefault();
      fileInput.value = event.dataTransfer;
      if(fileInput.value.files.length > 0) {
        readImage();
      }
    };
    const uploadFiles = async () => {
      const formData = new FormData();
      formData.append('fileInput', fileInput.value.files[0]);
      try {
        const response = await fileUpload('products/upload', formData );
        productImgUrl.value = response.downloadURL;
        return response;
      } catch (error) {
        console.error('Error uploading image:', error);
        return error;
      }
    };


    const validatePrice = () => {
      validationErrorPrice.value = productPrice.value <= 0;
    };

    const validateQuantity = () => {
      validationErrorQty.value = productQty.value <= 0;
    };

    const validateDescription = () => {
      validationErrorDescription.value = productDescription.value.trim() === '';
    };

    const submitForm = async () => {
      try {
        if(productImgUrl.value) {
          isLoading.value = true;
          let imageUploadResponse = await uploadFiles();
          if(!imageUploadResponse.status) throw new Error('Error uploading image. Server response:', imageUploadResponse); 
          var productPayload = {
            productImgUrl : imageUploadResponse.downloadURL,
            productTitle : productTitle.value,
            productQty : productQty.value,
            productPrice : productPrice.value,
            productType: selectedProduct.value,
            productDescription : productDescription.value,
          }
          const data = await insertDataFromApi('products/add', productPayload );
          if(data.status == 'true' || data.status == true) {
            isLoading.value = false;
            resetForm();
          }
        } else { 
          isLoading.value = false;
          throw new Error("User didn't selected any image");
        }
      } catch(error) {
        console.log('adding success full -->', error);
        isLoading.value = false;
      }
    };
    const checkPreviewProduct = (isPreviewStatus) => {
      previewProduct.value = isPreviewStatus ? false  : true;
    };
    onMounted(() => {
      fileInput.value = document.getElementById('fileInput');
    });
    return {
      productPrice,
      productQty,
      fileInput,
      productDescription,
      validationErrorPrice,
      validationErrorQty,
      validationErrorDescription,
      productUploadMsg,
      productUpload,
      validatePrice,
      validateQuantity,
      validateDescription,
      submitForm,
      previewProduct,
      productTitle,
      productImgUrl,
      selectedProduct,
      checkPreviewProduct,
      triggerFileInput,
      handleFileChange,
      handleFileDragDrop,
      isLoading,
    };
  },
};
</script>

<style>
  #productAdd span {
    display: block;
  }
.custom-file-input-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
.custom-button {
  padding: 10px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  display: inline-block;
}
</style>
