<template>
    <div class="cart-picker flex items-center">
      <div v-if="inputValue === 1" class="pl-2" @click="deleteProduct">
        <span class="text-sm"><i class="fa-solid fa-trash text-red-600"></i></span>
      </div>
      <div v-else class="pl-2" @click="decrement">
        <span class="text-sm"><i class="fa-solid fa-minus text-white"></i></span>
      </div>
      <input class="mx-2 font-bold rounded-md text-center w-10" v-model="inputValue">
      <div @click="increment">
        <span class="text-sm"><i class="fa-solid fa-plus text-white"></i></span>
      </div>
    </div>
  </template>
  
  <script>
    import { ref } from 'vue';
    import carts from '../../common/carts';
    export default {
        name: 'MiniBasketPicker',
        components: { },
        props: {
          initialQty : {
                type:Number,
                default: 1,
            },
            productId: {
                type: String,
                default: '',
            }
        },
        setup(props,{emit}) {            
            const inputValue = ref(props.initialQty);
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