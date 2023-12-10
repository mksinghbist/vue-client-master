<template>
    <div class="bg-gray-900 text-gray-100 py-3.5 px-6 shadow 
    md:flex justify-between item-center fixed top-0 left-0 right-0 z-[1000]">
    <div class="flex item-center cursor-pointer">
        <span class="text-green-500 text-xl mr-1">
        <img class="w-10" src="../assets/LocalBazZar.png"/>
        </span>
        <h1 class="text-xl"><strong>Local Bazzar</strong></h1>
    </div>
    <SearchBar></SearchBar>
    <span @click="MenuOpen()" class="absolute md:hidden right-6 top-1.5 cursor-pointer text-4xl">
    <i :class="[isOpen ? 'bi bi-x' : 'bi bi-filter-left']"></i>
    </span>
    <ul class="md:flex md:item-center md:px-0 px-3 md:pb-0 pb-10 
    md:static absolute bg-gray-900 md:w-auto w-1/2 top-14 duration-700 ease-in opacity-90"
    :class="[isOpen ? 'left-0' : 'left-[-100%]']">
        <li class="md:mx-4 md:my-0 my-6" v-for="link in Links" :key="link.id">
        <router-link :to="link.link" @click="MenuOpen()" class="text-xl hover:text-green-500">{{ link.name }}</router-link> 
        </li>
        <acButton>Get Started</acButton>  
    </ul> 
    </div>
</template>

<script>
import { ref } from 'vue';
import acButton from './Button.vue';
import SearchBar from './SearchBar.vue';
export default {
name : 'NavBar',
components : { acButton,SearchBar },
setup () {
    var isOpen = ref(false);
    var Links = [
        { name : "Home", link: '/home'},
        { name : "Services", link: 'service'},
        { name : "About", link: 'about'},
        { name : "Contact", link: 'contact'},
        
    ];
    const MenuOpen = ()=> {
        isOpen.value = !isOpen.value
    }
    return {
        Links,
        isOpen,
        MenuOpen
    }
}
}
</script>
