<template>
    <div v-if="totalProductQty != 0" class="bg-white">
        <div class="user_address">
        </div>
        <div class="carts_product-list">
            <ul>
                <li class="container p-2" v-for="product in cartProducts" :key="product.id">
                    <div class="card flex items-center justify-between bg-white rounded-lg shadow-md"> <!-- Center content vertically and horizontally -->
                        <img class="w-20 object-cover p-2" :src="product.productImgUrl" alt="Product Image"/>
                        <!-- <img class="w-20" src="../../assets/LocalBazZar.png" alt="Product Image"/> -->
                        <MiniBasketPicker
                            :isCheckoutPage=true
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
                <div class="px-4 py-2 text-base" >
                    <small >
                        <strong>Total Price : </strong>
                        <span class="rupee-icon"></span>{{ totalProductPrice }}
                    </small>
                    <br/>
                    <small><strong>Qty: </strong>{{ totalProductQty }}</small>
                </div>
            </div>
            <div  class="flex items-center justify-end">
                <button @click="placeOrderForPayment" class="bg-yellow-500 text-black px-4 py-2 rounded">
                    <span>Place order</span>
                </button>
            </div>
        </div>
    </div>
    <div v-if="totalProductQty == 0">
        <div v-if="isPlaceOrder" class="flex justify-center items-center ">
            <div class="text-center">
                <h2 class="text-3xl font-bold">Order Received!</h2>
                <p class="text-lg mb-2">Thank you for your order! 🎉</p>     
            </div>
        </div>
        <div class="flex text-center justify-center">
            <router-link to="/"> 
                <div class="text-sm">
                    <span>Continue shoping back to <strong class="underline">Home</strong></span>
                </div>
            </router-link>
        </div>
    </div>
</template>
<script>
    import { computed, ref } from 'vue';
    import { useStore } from 'vuex';
    import MiniBasketPicker from './min-basket-picker.vue';
    import carts from '../../common/carts';
    import { placeOrder } from '../../services/orderService';
    export default {
        name : 'CheckOutPage',
        components : { MiniBasketPicker },
        setup () {
            const store = useStore();
            const isPlaceOrder = ref(false);
            const cartProducts = computed(() => store.state.customerCart.cartEntries);
            const deleteProduct = (id) => {
                carts.removeProductCarts(id);
            }
            const totalProductPrice = computed(() => {
                return cartProducts.value.reduce((total, product) => {
                const price = parseFloat(product.productPrice);
                const qty = parseFloat(product.userEnterQty);
                return total + (price * qty);
            }, 0).toFixed(2);
            });

            const totalProductQty = computed(() => {
                return cartProducts.value.reduce((total, product) => total + parseFloat(product.userEnterQty), 0);
            });
            const placeOrderForPayment = () => {
                store.commit('addToCart', []);
                isPlaceOrder.value = true;
                placeOrder({id:1, message: "New Order come"});
            };
            return {
                cartProducts,
                deleteProduct,
                totalProductPrice,
                totalProductQty,
                placeOrderForPayment,
                isPlaceOrder
            } 
        }
    }

</script>
<style>
    .rupee-icon::before {
        content: "\20B9";
        display: inline-block;
    }

</style>