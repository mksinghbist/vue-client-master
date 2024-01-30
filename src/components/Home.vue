<template>
  <div>
    <Service></Service>
  </div>
</template>

<script>
import Service from './Service.vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
  name: 'HomePage',
  components: { Service },
  setup() {
    const router = useRouter();
    const store = useStore();
    const checkUserLogin = () => {
      var isLoginValue = localStorage.getItem('isAuthenticated');
      if (isLoginValue == 'false' || isLoginValue == null || isLoginValue == undefined) {
        store.commit('setIsLogin', false);
        router.push('/login');
      } else {
        store.commit('setIsLogin', true);
      }
    };
    onMounted(() => {
      checkUserLogin();
    });
  }
};

</script>

<style scoped>
</style>