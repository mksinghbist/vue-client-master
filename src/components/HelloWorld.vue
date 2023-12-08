<template>
  <div class="bg-green-400 h-screen">
    <Navbar/>
  </div>
</template>

<script>
import Navbar from './Navbar.vue';
export default {
  name: 'HelloWorld',
  components : { Navbar},
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
