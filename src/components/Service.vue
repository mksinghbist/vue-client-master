<template>
  <div v-if="!isAdmin" class="flex items-center bg-gray-50 w-screen">
    <div class="container ml-auto mr-auto mb-10">
      <div class="flex flex-wrap items-start">
        <div class="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 pr-5 mb-5 lg:pl-2 lg:pr-2" v-for="(product, index) in newProductList" :key="index">
          <ProductCardVue :productObject="product"></ProductCardVue>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { computed, onMounted,ref } from 'vue';
  import ProductCardVue from './ProductCard.vue';
  import { fetchDataFromApi  } from '../services/apiService';
  import { useStore } from 'vuex';
  import eventBus from '../common/eventBus';
  export default {
    name: 'ProductServe',
    components: {
      ProductCardVue,
    },
    props: {
    },
    setup() {
        const productList = ref([]);
        const store = useStore();
        const fetechProductList = async () => {
            try {
                eventBus.emit('showLoader');
                const data = await fetchDataFromApi('user/product/list');
                productList.value = data.productList;
                eventBus.emit('hideLoader');
            } catch (error) {
                productList.value = [];
            }
        }
        const isAdmin = computed(() => store.state.isAdmin);
        const newProductList = computed(() => productList.value); 
        onMounted(() =>{
          fetechProductList();
        })
      return {
        newProductList,
        isAdmin
      };
    },
  };
</script>

<style scoped>
/* Add any scoped styles if needed */
</style>
