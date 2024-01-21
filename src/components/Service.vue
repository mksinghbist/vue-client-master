<template>
      <div class="flex items-center bg-indigo-100 w-screen" style="font-family: 'Muli', sans-serif;">
        <div class="container ml-auto mr-auto flex flex-wrap items-start">
            <div class="w-full pl-5 lg:pl-2">
                <h1 class="text-3xl lg:text-4xl text-gray-700 font-extrabold">
                    Best Sellers
                </h1>
            </div>
            <div class="w-full md:w-1/2 lg:w-1/4 pl-5 pr-5 mb-5 lg:pl-2 lg:pr-2" v-for="(product, index) in newProductList" :key="index">
              <ProductCardVue :productTitle="product.productTitle" :productPrice="product.productPrice" 
              :productQty="product.productQty" 
              :productImgUrl="product.productImgUrl" 
              :productDesc="product.productDesc">
              </ProductCardVue>
            </div>
        </div>
      </div>
</template>
<script>
import { computed, onMounted,ref } from 'vue';
import ProductCardVue from './ProductCard.vue';
import { fetchDataFromApi  } from '../services/apiService';
export default {
  name: 'ProductServe',
  components: {
    ProductCardVue,
  },
  props: {
  },
  setup() {
      const productList = ref([]);
      const fetechProductList = async () => {
          try {
              const data = await fetchDataFromApi('user/product/list');
              productList.value = data.productList;
          } catch (error) {
              productList.value = [];
          }
      }
      const newProductList = computed(() => productList.value); 
      onMounted(() =>{
        fetechProductList();
      })
    return {
      newProductList
    };
  },
};
</script>

<style scoped>
/* Add any scoped styles if needed */
</style>
