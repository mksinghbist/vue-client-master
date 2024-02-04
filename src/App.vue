<template>
  <div class="m-2 md:m-0 lg:m-0 bg-gray-100 h-screen">
    <div v-if="isLogined">
        <Navbar></Navbar> 
        <div class="mt-20">
          <RouterView></RouterView>
        </div>
    </div>
    <LoginPage v-if="!isLogined"></LoginPage>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import LoginPage from './components/LoginPage.vue';
import { useStore } from 'vuex';

export default {
  name: 'App',
  components: {
    Navbar,
    LoginPage
},
  props : {},
  setup() {
    const router = useRouter();
    const store = useStore();
    const isLogined = computed(() => {
        return store.state.isLogin;
    })
    const fetchData = () => {
      var isLoginValue = localStorage.getItem('isAuthenticated');
      if (isLoginValue == 'false' || isLoginValue == null || isLoginValue == undefined) {
        store.commit('setIsLogin', false);
        router.push('/login');
      } else {
        store.commit('setIsLogin', true);
      }
    };
    onMounted(() => {
      fetchData();
    });

    return {
      isLogined,
    };
  },
};

</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  line-height:normal;
}
</style>
