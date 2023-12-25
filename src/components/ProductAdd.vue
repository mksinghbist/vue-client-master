<!-- ProductForm.vue -->
<template>
    <div>
      <form @submit.prevent="submitForm" class="max-w-md mx-auto">
        <label for="image">Product Image:</label>
        <input type="file" @change="handleImageChange" id="image" class="mb-2 p-2 border" />
  
        <div v-if="previewImage" class="mb-4">
          <img :src="previewImage" alt="Product Preview" class="max-w-full h-auto" />
        </div>
  
        <label for="quantity">Quantity:</label>
        <input type="text" v-model="quantity" id="quantity" class="mb-2 p-2 border" />
  
        <label for="title">Title:</label>
        <input type="text" v-model="title" id="title" class="mb-2 p-2 border" />
  
        <label for="description">Description:</label>
        <textarea v-model="description" id="description" class="mb-2 p-2 border"></textarea>
  
        <button type="submit" class="bg-blue-500 text-white p-2">Submit</button>
      </form>
      <div class="w-full md:w-1/2 lg:w-1/4 pl-5 pr-5 mb-5 lg:pl-2 lg:pr-2">
        <ProductCardVue :productTitle="title"
        :productImgUrl="image" 
        :productDesc="description">
        </ProductCardVue>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import {ref} from 'vue';
  import ProductCardVue from './ProductCard.vue';
  
  export default {
    name : "productAdd",
    components: {ProductCardVue},
    setup() {
        var image = ref(null);
        var previewImage =ref(null);
        var quantity = ref('');
        var title = ref('');
        var description = ref('');
        var product = ref(null);
        const handleImageChange = (event) => {
            console.log('imge', event.target.files[0]);
            image.value = event.target.files[0];
            previewImage.value = URL.createObjectURL(image.value);
        };
        const submitForm = () =>{
            const formData = new FormData();
            formData.append('image', image.value);
            formData.append('quantity', quantity.value);
            formData.append('title', title.value);
            formData.append('description',description.value);

            axios.post('http://your-node-api/product', formData)
            .then(response => {
                product.value = response.data;
            })
            .catch(error => {
                console.error('Error submitting form:', error);
            });
        };
        const buyProduct = () => {
            // Implement the buy logic here
            console.log('Buying product:', this.product);
        };

        return {
        image,
        previewImage,
        quantity,
        title,
        description,
        product,
        handleImageChange,
        submitForm,
        buyProduct,
      };
   
    },
  };
  </script>
  
  <style scoped>
  /* Add your component-specific styles using Tailwind CSS classes here */
  </style>
  