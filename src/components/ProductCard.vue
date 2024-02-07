<template>
    <div class="bg-white rounded-lg min-h-32 md:min-h-40 lg:min-h-60 p-2">
        <figure class="mb-1">
            <img :src="productObject.productImgUrl" alt="" class="h-28 md:h-40 lg:h-60 ml-auto mr-auto" />
            <!-- <img src="../assets/LocalBazZar.png" alt="" class="h-28 md:h-40 lg:h-60 ml-auto mr-auto" /> -->
        </figure>
        <div class="rounded-lg p-2 bg-gray-600 flex flex-col">
            <div>
                <h5 class="text-white text-base font-bold leading-none">
                {{ productObject.productTitle }}
                </h5>
                <span class="text-sm text-gray-400 leading-none">{{ productObject.productDesc }}</span>
            </div>
            <div class="flex items-center">
                <div class="text-lg text-white font-light">
                    <span class="rupee-icon"></span>{{ productObject.productPrice }}
                </div>
            </div>
            <div v-if="!isAddButtonClick && newProductQty == 0" class="flex items-end justify-end">
                <AcButton  buttonType="text" class="flex ml-auto w-15 h-10 px-2" @click="addProduct">  
                    Add to Cart
                </AcButton>
            </div>
            <div v-if="isAddButtonClick || newProductQty != 0 " class="flex items-end justify-end">
                <MiniBasketPicker 
                    :productId="productObject.productId"
                    :intialQty="newProductQty"
                    @removeProduct="handleRemoveProduct"
                >
                </MiniBasketPicker>
            </div>
        </div>
    </div>
</template>

<script>
    import { computed, ref } from 'vue';
    import AcButton from './Button.vue';
    import carts from '../common/carts'
    import MiniBasketPicker from '../components/baskets/min-basket-picker.vue'
    export default {
        name: 'ProductCard',
        components: { AcButton, MiniBasketPicker },
        props: {
            productObject : {
                type: Object,
                default: () => {
                    return {};
                }
            }, 
        },
        setup(props) {
            const isAddButtonClick = ref(false);
            const intialQty = ref(carts.getProduct(props.productObject.productId));
            const addProduct = () => {
                isAddButtonClick.value = true;
                var newProduct = props.productObject;
                newProduct.userEnterQty = 1;
                intialQty.value = 1;
                carts.addToCart(newProduct)
            }
            const handleRemoveProduct = (value) => {
                intialQty.value = value;
                isAddButtonClick.value = false;
            };
            const newProductQty = computed(() => intialQty.value);
            return {
                addProduct,
                isAddButtonClick,
                intialQty,
                handleRemoveProduct,
                newProductQty
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