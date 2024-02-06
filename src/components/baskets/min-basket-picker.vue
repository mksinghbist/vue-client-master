<template>
    <div class="cart-picker flex items-center">
      <AcButton v-if="inputValue === 1" class="pl-2" @click="deleteProduct">
        <span class="text-sm"><i class="fa-solid fa-trash text-red-700"></i></span>
      </AcButton>
      <AcButton v-else class="pl-2" @click="decrement">
        <span class="text-sm"><i class="fa-solid fa-minus text-white-700"></i></span>
      </AcButton>
      <input class="mx-2 font-bold rounded-md text-center w-10" v-model="inputValue">
      <AcButton @click="increment">
        <span class="text-sm"><i class="fa-solid fa-plus text-white-700"></i></span>
      </AcButton>
    </div>
  </template>
  
  <script>
    import { ref } from 'vue';
    import AcButton from '../Button.vue';
    import carts from '../../common/carts';
    export default {
        name: 'MiniBasketPicker',
        components: { AcButton },
        props: {
            intialQty : {
                type:Number,
                default: 1,
            },
            productId: {
                type: String,
                default: '',
            }
        },
        setup(props,{emit}) {            
            const inputValue = ref(props.intialQty);
            const deleteProduct = () =>{
                carts.removeProductCarts(props.productId);
                emit('removeProduct', 0);
            };
            const decrement = () =>{
                if (inputValue.value > 1) {
                    inputValue.value--;
                    carts.updateQty(props.productId, inputValue);               
                }
            };
            const increment = () => {
                inputValue.value++;
                carts.updateQty(props.productId, inputValue);
            };
            
            return {
                inputValue,
                decrement,
                increment,
                deleteProduct,
            }
        }
    };
  </script>