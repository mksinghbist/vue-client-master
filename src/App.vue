<template>
  <div class="m-2 md:m-0 lg:m-0 bg-gray-50 h-screen">
    <AcLoader></AcLoader>
    <div v-if="isLogined">
        <Navbar></Navbar> 
        <div class="mt-40">
          <RouterView></RouterView>
        </div>
        <BottomNavBar/>
        
    </div>
    <LoginPage v-if="!isLogined"></LoginPage>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import { onMounted, computed  } from 'vue';
import LoginPage from './components/LoginPage.vue';
import { useStore } from 'vuex';
import BottomNavBar  from './components/BottomNavbar.vue'
import AcLoader from './components/common/AcLoader.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    LoginPage,
    BottomNavBar,
    AcLoader
},
  props : {},
  setup() {
    //const router = useRouter();
    const store = useStore();
    const isLogined = computed(() => {
        return store.state.isLogin;
    });
    const fetchData = () => {
      var isLoginValue = localStorage.getItem('isAuthenticated');
      if (isLoginValue == 'false' || isLoginValue == null || isLoginValue == undefined) {
        store.commit('setIsLogin', false);
      } else {
        store.commit('setIsLogin', true);
      }
      store.dispatch('checkCustomerCart');
    };
    onMounted(() => {
      fetchData();
      window.addEventListener('resize', store.commit('setMobileDevice', window.innerWidth <= 650));
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
  font-weight: 400;
}
</style>
