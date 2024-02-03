<template>
    <div class="bg-white rounded-lg min-h-32 md:min-h-40 lg:min-h-60 p-2">
        <figure class="mb-1">
            <img :src="productObject.productImgUrl" alt="" class="h-28 md:h-40 lg:h-60 ml-auto mr-auto" />
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
            <div class="flex items-right">
                <AcButton buttonType="text" class="flex ml-auto w-15 h-10 px-2" @click="addProduct">  
                    <i class="fas fa-plus text-xl"></i> 
                </AcButton>
            </div>
        </div>
    </div>
</template>

<script>
    import AcButton from './Button.vue';
    import carts from '../common/carts'
    export default {
        name: 'ProductCard',
        components: { AcButton },
        props: {
            productObject : {
                type: Object,
                default: () => {
                    return {};
                }
            }
        },
        setup(props) {
            const addProduct = () => {
                carts.addToCart(props.productObject)
            }
            return {
                addProduct,
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