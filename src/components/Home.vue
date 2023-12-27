<template>
  <div>
    <productInsert></productInsert>
  </div>
</template>

<script>
import productInsert from './products/productInsert.vue';
export default {
  name: 'HomePage',
  components: { productInsert },
};
</script>

<style scoped>
</style>