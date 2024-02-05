<template>
    <div class="cart-picker flex items-center">
      <!-- Show delete icon if input value is 1 -->
      <AcButton v-if="inputValue === 1" class="pl-2" @click="deleteProduct">
        <span class="text-sm"><i class="fa-solid fa-trash text-red-500"></i></span>
      </AcButton>
  
      <!-- Show decrement button if input value is greater than 1 -->
      <AcButton v-else class="pl-2" @click="decrement">
        <span class="text-sm"><i class="fa-solid fa-minus text-blue-700"></i></span>
      </AcButton>
  
      <!-- Input field for quantity -->
      <input class="mx-2 font-bold rounded-md text-center w-10" v-model="inputValue">
  
      <!-- Increment button -->
      <AcButton @click="increment">
        <span class="text-sm"><i class="fa-solid fa-plus text-blue-500"></i></span>
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
        setup(props) {
            
            const inputValue = ref(props.intialQty);
            const deleteProduct = () =>{
                // Handle delete logic
                console.log('Deleting product');
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