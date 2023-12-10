<template>
      <div class="flex items-center bg-indigo-100 w-screen" style="font-family: 'Muli', sans-serif;">
        <div class="container ml-auto mr-auto flex flex-wrap items-start">
            <div class="w-full pl-5 lg:pl-2">
                <h1 class="text-3xl lg:text-4xl text-gray-700 font-extrabold">
                    Best Sellers
                </h1>
            </div>
            <div class="w-full md:w-1/2 lg:w-1/4 pl-5 pr-5 mb-5 lg:pl-2 lg:pr-2" v-for="(product, index) in products" :key="index">
              <ProductCardVue :productTitle="product.productTitle" :productPrice="product.productPrice" 
              :productQty="product.productQty" 
              :productImgUrl="product.productImgUrl" 
              :productDesc="product.productDesc">
              </ProductCardVue>
            </div>
        </div>
      </div>
</template>
<script>
import ProductCardVue from './ProductCard.vue';
export default {
  name: 'ProductServe',
  components : { ProductCardVue},
  props: {
    products : {
      type: Array,
      default : () =>
        [ 
          {
            productTitle: 'iPhone 11 Pro Max',
            productPrice:'$1099,00',
            productQty: 5,
            productImgUrl:'https://srv-cdn.onedio.com/store/bf2cbc886120f284ef46fd92a48f5fb58c62e6a50fbdf8fa796d057dd0ddc242.png',
            productDesc: 'And then there was Pro.',
          },
          {
            productTitle: 'iPhone 11',
            productPrice:'$699,00',
            productQty: 6,
            productImgUrl:'https://srv-cdn.onedio.com/store/7fd6410ffac110960cb4a60b09878db19ebbdf3c8b6e842918d16f3c61784763.png',
            productDesc: 'Just the right amount of everything.',
          },
          {
            productTitle: 'iPhone XR',
            productPrice:'$599,00',
            productQty: 10,
            productImgUrl:'https://srv-cdn.onedio.com/store/988bccbdb9ca395f581f98faa9ce3a55123f12bfcef608c838532b813646e557.png',
            productDesc: 'Brilliant. In every way.',
          },
          {
            productTitle: 'iPhone SE',
            productPrice:'$399,00',
            productQty: 15,
            productImgUrl:'https://srv-cdn.onedio.com/store/cfdd8ebc1b39e215c44c7c9a02bfaa49287f79b806ec5743124d0aea25c2b0c3.png',
            productDesc: 'Lots to love. Less to spend.',
          }
        ] 
    }
  }
}
</script>