<template>
    <div class="bg-gray-900 text-gray-100 py-3.5 px-6 shadow 
    md:flex justify-between item-center fixed top-0 left-0 right-0 z-[1000]">
    <div class="flex item-center cursor-pointer">
        <span class="text-green-500 text-xl mr-1">
            <img class="w-10" src="../assets/LocalBazZar.png"/>
        </span>
        <h1 class="text-xl"><strong>Local Bazzar</strong></h1>
    </div>
    <!-- <SearchBar></SearchBar> -->
    <span @click="MenuOpen()" class="absolute md:hidden right-6 top-1.5 cursor-pointer text-4xl">
    <i :class="[isOpen ? 'bi bi-x' : 'bi bi-filter-left']"></i>
    </span>
    <ul class="md:flex md:item-center md:px-0 px-3 md:pb-0 pb-10 
    md:static absolute bg-gray-900 md:w-auto w-1/2 top-14 duration-700 ease-in opacity-90"
    :class="[isOpen ? 'left-0' : 'left-[-100%]']">
        <li class="md:mx-4 md:my-0 my-6" v-for="link in Links" :key="link.id">
            <router-link v-if="!isAdmin && !['/productAdd'].includes(link.link)" :to="link.link" @click="MenuOpen()" class="text-xl hover:text-green-500">{{ link.name }}</router-link>
            <router-link v-if="isAdmin && ['/productAdd','/adminPanel'].includes(link.link)" :to="link.link" @click="MenuOpen()" class="text-xl hover:text-green-500">{{ link.name }}</router-link>  
        </li>
        <acButton @click="userLogout()"><span class="text-sm hover:text-red-500">Logout</span></acButton> 
    </ul> 
    </div>
</template>

<script>
import { ref , onMounted, computed} from 'vue';
import acButton from './Button.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'
export default {
name : 'NavBar',
components : { acButton },
props: {},
setup () {
    var isOpen = ref(false);
    const store = useStore();
    const isLogined = computed(() => {
        return store.state.isLogin;
    });
    const isAdmin = computed(() => {
        console.log(JSON.parse(store.state.user).admin);
        return store.state.user != "" ? JSON.parse(store.state.user).admin : false;
    });
    const router = useRouter();
    var Links = computed(() => {
        const updatedNavRouter = [...store.state.navRouter];
        if (isAdmin.value) {
            updatedNavRouter.splice(2, 0, { name: "Product Upload", link: '/productAdd' });
            updatedNavRouter.splice(3, 0, { name: "Admin Panel", link: '/adminPanel' });
        }
        return updatedNavRouter;
    })
    const MenuOpen = ()=> {
        isOpen.value = !isOpen.value
    };
    const userLogout = () => {
        sessionStorage.setItem('userInfo', '');
        sessionStorage.setItem('isAuthenticated', false);
        store.commit('setAuthentication', false);
        store.commit('setIsLogin', false);

    };
    const isLoginChecked  = () => {
      var isLoginValue = sessionStorage.getItem('isAuthenticated');
      if(!isLoginValue == 'true') {
        router.push('/login');
      }
    } 

    onMounted( () => {
        isLoginChecked(); 
    })
    return {
        Links,
        isOpen,
        MenuOpen,
        userLogout,
        isLogined,
        isAdmin
    }
}
}
</script>
