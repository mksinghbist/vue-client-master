<template>
    <div @mouseover="showBasketModal" @mouseout="hideBasketModal" class="basket-container">
        <AcButton @click="redirectToCart" id="basket" class="">
            <span>
                <i class="fas fa-shopping-basket text-2xl"></i>
            </span>
            <span class="pl-2"><span class="rupee-icon"></span>{{calculateTotalPrice}}</span>
            <span class="pl-4">1</span>
        </AcButton>
        <!-- Basket Modal -->
        <div v-show="isBasketModalVisible" class="basket-modal w-80">
            <div class="p-4 rounded-lg w-full">
                <!-- Product details -->
                <ul class="text-slate-400">
                    <li class="container mb-2" v-for="(product, index) in products.slice(0, 3)" :key="index">
                        <div class="card flex bg-white p-2 rounded-lg shadow-md">
                            <div class="h-16 w-16 overflow-hidden rounded-lg">
                                <img :src="product.productImgUrl" alt="" class="object-cover w-full h-full">
                            </div>
                            <div class="flex-1 ml-2">
                                <p class="text-sm font-semibold">{{ product.productTitle }}</p>
                                <div class="flex justify-between items-center">
                                    <!-- Price Section -->
                                    <div class="price-section">
                                        <p class="text-gray-500">
                                            <span class="rupee-icon"></span>
                                            {{ product.productPrice }}
                                        </p>
                                        <span class="text-xs text-black"> Qty: 2 </span>
                                    </div>

                                    <!-- Price Total -->
                                    <div class="priceTotal">
                                        <span class="text-base text-black font-bold"> {{ product.productPrice * 2 }} </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <span class="text-xs font-bold">Showing 3 of {{products.length}} items</span>
                </ul>
        
                <!-- Total price -->
                <div class="flex justify-between text-lg font-bold">
                    <div class="text-gray-700">Total:</div>
                    <div class="text-gray-700">
                        <span class="rupee-icon"></span>
                        {{ calculateTotalPrice }}
                    </div>
                </div>
        
                <!-- Checkout button -->
                <button @click="checkout" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                    Checkout
                </button>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import AcButton from '../Button.vue';
  import { useStore } from 'vuex';
  export default {
    name : 'MiniBasket',
    components : {AcButton},
    setup () {
        const store =  useStore();
        const isBasketModalVisible = ref(false);
        const products = computed(() => {
            return store.state.customerCart.cartEntries;
        });
        const showBasketModal = () => {
            isBasketModalVisible.value = true;
        };
        const hideBasketModal =() => {
          isBasketModalVisible.value = false;
        };
        const calculateTotalPrice = computed(() => {
             return products.value.reduce((total, product) => total + parseFloat(product.productPrice.replace('$', '')), 0).toFixed(2);
        });
        const checkout = () => {
        // Implement your checkout logic here
        alert('Checkout clicked!');
        };
        const redirectToCart = () => {
            // Implement your redirection logic here
            alert('Checkout clicked!');
        };
        return {
            isBasketModalVisible,
            showBasketModal,
            hideBasketModal,
            calculateTotalPrice,
            checkout,
            products,
            redirectToCart
        }
    }
  };
  </script>
  
  <style scoped>
    .rupee-icon::before {
        content: "\20B9";
        display: inline-block;
    }
    .basket-container {
        position: relative;
    }
    .basket-modal {
        @apply absolute;

        transform: translate(-50%, 1%);
        background-color: #cccccc;
        padding: 5px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }

  </style>
  