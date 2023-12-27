<template>
  <div class="container mx-4 my-4">
    <div class="flex">
      <!-- Left Card -->
      <div class="w-1/2 border p-4" id="productAdd">
        <form @submit.prevent="submitForm" class="max-w-md mx-auto">
          <input 
            type="file" 
            @change="handleImageChange" 
            id="image" 
            class="w-full mb-2 p-2 border"
            required
          />
          <div class="p-2 flex">
            <div class="w-1/2 pr-2">
              <strong>Price :</strong>
              <input
                type="text"
                class="text-center ml-2 text-gray-700 w-1/4 border-blue-500 border-2 rounded"
                :class="{ 'border-red-500': validationErrorPrice }"
                name="productQty"
                placeholder="0"
                v-model="userInputPrice"
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
                v-model="userInputQty"
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
              v-model="userInputDescription"
              @input="validateDescription"
              placeholder="Enter description here"
              required
            ></textarea>
            <span v-if="validationErrorDescription" class="text-red-400">Description should not be empty</span>
          </div>
          <div class="p-4 flex justify-end">
            <Button bType="text" @click="checkPreviewProduct">Preview</Button>
            <Button class="ml-5">Add</Button>
          </div>
      </form>
      </div>

      <!-- Right Card -->
      <div v-if="previewProduct" class="w-1/3 border ml-10">
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import Button from '../Button.vue'
export default {
  name: "productInsert",
  components: { Button },
  setup() {
    const userInputPrice = ref(0);
    const userInputQty = ref(0);
    const userInputDescription = ref('');
    const validationErrorPrice = ref(false);
    const validationErrorQty = ref(false);
    const validationErrorDescription = ref(false);
    const previewProduct = ref(false);

    const validatePrice = () => {
      validationErrorPrice.value = userInputPrice.value <= 0;
    };

    const validateQuantity = () => {
      validationErrorQty.value = userInputQty.value <= 0;
    };

    const validateDescription = () => {
      validationErrorDescription.value = userInputDescription.value.trim() === '';
    };

    const submitForm = () => {
      // Perform additional form submission logic if needed
      console.log('Form submitted successfully!');
    };
    const checkPreviewProduct = () => {
      previewProduct.value = true;
    };

    return {
      userInputPrice,
      userInputQty,
      userInputDescription,
      validatePrice,
      validateQuantity,
      validateDescription,
      validationErrorPrice,
      validationErrorQty,
      validationErrorDescription,
      submitForm,
      previewProduct,
      checkPreviewProduct,
    };
  },
};
</script>

<style>
  #productAdd span {
    display: block;
  }
</style>
