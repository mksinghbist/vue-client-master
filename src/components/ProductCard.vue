<template>
    <div class="bg-grey rounded-lg border-solid border min-h-32 md:min-h-40 lg:min-h-60 p-2 flex flex-col">
      <figure class="mb-1">
        <img :src="productObject.productImgUrl" alt="" class="h-28 md:h-40 lg:h-60 ml-auto mr-auto" />
      </figure>
      <div class="rounded-lg p-2 bg-gray-600 flex flex-col flex-grow">
        <div class="product_heading">
            <h5 class="text-white text-sm font-bold leading-5">
                {{ productObject.productTitle }}
            </h5>
        </div>
        <div class="product_sub-heading">
            <span class="text-xs text-white font-extralight leading-4">{{ productObject.productDesc }}</span>
        </div>
        <div class="flex items-center">
          <div class="text-base text-white font-light">
            <span class="rupee-icon"></span>{{ productObject.productPrice }}
          </div>
        </div>
        <div v-if="!isAddButtonClick && newProductQty == 0" class="flex items-end justify-end h-5">
            <AcButton class="ml-auto" 
            buttonType="text" 
            padding="p-0.5"
            @click="addProduct">  
                <span class="text-sm">Add to Cart</span>
            </AcButton>
        </div>

        <div v-if="isAddButtonClick || newProductQty != 0" class="flex items-end justify-end">
          <MiniBasketPicker 
            :productId="productObject.productId"
            :initialQty="newProductQty"
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
            const initialQty = ref(carts.getProductUserEnterQty(props.productObject.productId));
            const addProduct = () => {
                isAddButtonClick.value = true;
                var newProduct = props.productObject;
                newProduct.userEnterQty = 1;
                initialQty.value = 1;
                carts.addToCart(newProduct)
            }
            const handleRemoveProduct = (value) => {
                initialQty.value = value;
                isAddButtonClick.value = false;
            };
            const newProductQty = computed(() => initialQty.value);
            return {
                addProduct,
                isAddButtonClick,
                initialQty,
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