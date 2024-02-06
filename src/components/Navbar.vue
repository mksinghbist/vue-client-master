<template>
    <div  class="bg-gray-900 text-gray-100 py-3.5 px-6 shadow md:flex justify-between item-center fixed top-0 left-0 right-0 z-[1000] shadow-md">
        <div class="flex items-center justify-between">
            <span @click="MenuOpen()" class="md:hidden cursor-pointer text-4xl">
                <i :class="[isOpen ? 'bi bi-x' : 'bi bi-filter-left']"></i>
            </span>

            <router-link to="/" class="flex items-center">
                <span class="text-green-500 text-xl mr-1 aspect-square mix-blend-hard-light">
                    <img class="w-10" src="../assets/LocalBazZar.png" />
                </span>
                <h1 class="text-xl mt-[5px]">
                    <strong>Local Bazzar</strong>
                </h1>
            </router-link>

            <span v-if="isMobileDevice" class="flex items-center cursor-pointer">
                <MiniBasket v-if="!isAdmin"></MiniBasket> 
            </span>
        </div>

        <div :class="isMobileDevice ? 'my-2' : 'mb-2'">
            <SearchBar v-if="!isAdmin"></SearchBar>
            <ul
                class="md:flex md:item-end md:px-0 px-3 md:pb-0 pb-10 md:static absolute bg-gray-900 md:w-auto w-1/2 top-14 duration-700 ease-in opacity-90"
                :class="[isOpen ? 'left-0' : 'left-[-100%]']"
            >
                <li class="md:mr-4 md:my-0 my-6" v-for="link in Links" :key="link.id">
                <router-link :to="link.link" @click="MenuOpen()" class="text-xl hover:text-green-500">{{ link.name }}</router-link>
                </li>
                <AcButton v-if="isMobileDevice" class="pl-2" @click="userLogout()">
                    <span class="text-xl"><i class="fa-solid fa-power-off text-red-700"></i></span>
                </AcButton>
            </ul>
        </div>
        <div v-if="!isMobileDevice" class="flex justify-between items-center">
            <MiniBasket v-if="!isAdmin"></MiniBasket>     
            <AcButton class="pl-2" @click="userLogout()">
                <span class="text-2xl"><i class="fa-solid fa-power-off text-red-700"></i></span>
            </AcButton>
        </div>
    </div>
  </template>
  

<script>
import { ref , onMounted, computed } from 'vue';
import AcButton from './Button.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'
import MiniBasket from './baskets/mini-basket.vue';
import SearchBar from './SearchBar.vue';
export default {
name : 'NavBar',
components : { AcButton,SearchBar, MiniBasket },
props: {},
setup () {
    var isOpen = ref(false);
    const store = useStore();
    const isLogined = computed(() => {
        return store.state.isLogin;
    });
    const isAdmin = computed(() => {
        return store.state.isAdmin;
    });
    const router = useRouter();
    var Links = computed(() => {
        const updatedNavRouter = [...store.state.navRouter];
        return updatedNavRouter;
    })
    const MenuOpen = ()=> {
        isOpen.value = !isOpen.value
    };
    const userLogout = () => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('isAuthenticated');
        store.commit('setAuthentication', false);
        store.commit('setIsLogin', false);
        store.commit('resetState');

    };
    const isLoginChecked  = () => {
      var isLoginValue = localStorage.getItem('isAuthenticated');
      if(!isLoginValue == 'true') {
        router.push('/login');
      }
    } 

    const isMobileDevice = computed(() => store.state.isMobileDevice);

    onMounted( () => {
        isLoginChecked(); 
        window.addEventListener('resize', store.commit('setMobileDevice', window.innerWidth <= 765));
    })
    return {
        Links,
        isOpen,
        MenuOpen,
        userLogout,
        isLogined,
        isAdmin,
        isMobileDevice,
    }
}
}
</script>
