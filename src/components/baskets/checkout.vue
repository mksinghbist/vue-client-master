<template>
    <div class="back_home-page">
        <router-link to="/" class="flex items-center underline"> <strong class="p-2 text-base">Home</strong></router-link>
    </div>
    <div v-if="totalProductQty != 0" class="bg-white">
        <div class="user_address">

        </div>
        <div class="carts_product-list">
            <ul>
                <li class="container p-2" v-for="product in cartProducts" :key="product.id">
                    <div class="card flex items-center justify-between bg-white rounded-lg shadow-md"> <!-- Center content vertically and horizontally -->
                        <img class="w-20" src="../../assets/LocalBazZar.png" alt="Product Image"/>
                        <MiniBasketPicker 
                            :productId="product.productId"
                            :initialQty="product.userEnterQty"
                        ></MiniBasketPicker>
                        <span class="m-4" @click="deleteProduct(product.productId)">
                            <i class="fa fa-trash text-red-700" aria-hidden="true"></i>
                        </span>
                    </div>
                </li>

            </ul>

        </div>

        <div class="carts_place_order card flex justify-between mb-0 w-full p-4 fixed-bottom bg-white shadow-md">
            <div class="flex items-center justify-start">
                <span class="px-4 py-2">
                    <strong>Total Price : </strong>
                    {{ totalProductPrice }}
                </span>
            </div>
            <div  class="flex items-center justify-end">
                <button @click="placeOrderForPayment" class="bg-yellow-500 text-black px-4 py-2 rounded">
                    <span>Place order</span>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
    import { computed } from 'vue';
    import { useStore } from 'vuex';
    import MiniBasketPicker from './min-basket-picker.vue';
    import carts from '../../common/carts';
    export default {
        name : 'CheckOutPage',
        components : { MiniBasketPicker },
        setup () {
            const store = useStore();
            const cartProducts = computed(() => store.state.customerCart.cartEntries);
            const deleteProduct = (id) => {
                carts.removeProductCarts(id);
            }
            const totalProductPrice = computed(() => {
                return cartProducts.value.reduce((total, product) => total + parseFloat(product.productPrice.replace('$', '') * parseFloat(product.userEnterQty)), 0).toFixed(2);
            });

            const totalProductQty = computed(() => {
             return cartProducts.value.reduce((total, product) => total + parseFloat(product.userEnterQty), 0);
            });
            return {
                cartProducts,
                deleteProduct,
                totalProductPrice,
                totalProductQty
            } 
        }
    }

</script>
<style>
    .fixed-bottom {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
    }

</style>