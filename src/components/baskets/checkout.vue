<template>
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

<div class="carts_place_order">

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
        return {
            cartProducts,
            deleteProduct
        } 
    }
}

</script>
<style>
</style>