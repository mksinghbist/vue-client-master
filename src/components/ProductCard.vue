<template>
    <div class="bg-white rounded-lg m-h-64 p-2 transform hover:translate-y-2 hover:shadow-xl transition duration-300">
        <figure class="mb-2">
        <img :src="productImgUrl" alt="" class="h-64 ml-auto mr-auto" />
        </figure>
        <div class="rounded-lg p-4 bg-purple-700 flex flex-col">
        <div>
            <h5 class="text-white text-2xl font-bold leading-none">
            {{ productTitle }}
            </h5>
            <span class="text-xs text-gray-400 leading-none">{{ productDesc }}</span>
        </div>
        <div class="flex items-center">
            <div class="text-lg text-white font-light">
            {{ productPrice }}
            </div>
            <button href="javascript:;" class="rounded-full bg-purple-900 text-white hover:bg-white hover:text-purple-900 hover:shadow-xl focus:outline-none w-10 h-10 flex ml-auto transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-current m-auto">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            </button>
        </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ProductCard',
        props: {
            productImgUrl: {
                type: String,
                default: '',
            },
            productTitle : {
                type: String,
                default: ''
            },
            productPrice : {
                type: String,
                default: ''
            },
            productQty : {
                type: Number,
                default: 0
            },
            productDesc : {
                type: String,
                default: ''
            }
        }
        
    }
</script>