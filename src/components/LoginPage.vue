<template>
  <div v-if='!isLogined && !isSignUpCheck' class="flex items-center justify-center min-h-screen bg-gray-100 lg:justify-center">
    <div
      class="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md"
    >
      <div
        class="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly"
      >
        <div class="flex justify-center item-center text-green-500 text-xl tracking-wider text-center">
            <img class="w-16 h-16" src="../assets/LocalBazZar.png" />
        </div>
        <div class="mb-2 text-2xl font-bold tracking-wider text-center">
          <a href="/"><strong>Local Bazzar</strong></a>
        </div>
        <p class="mt-2 text-base text-center text-gray-300 md:mt-0">
          Ensure the best quality and on-time delivery on our local bazar platform.
        </p>
        <p class="flex flex-col items-center justify-center mt-5 text-center">
          <span>Don't have an account?</span>
          <router-link to="/signup" class="underline hover:text-green-500" @click="openSignUp()">Get Create!</router-link> 
        </p>
        <p class="mt-4 text-sm text-center text-gray-300">
          Read our <a href="#" class="underline">terms</a> and <a href="#" class="underline">conditions</a>
        </p>
      </div>
      <div class="p-5 bg-white md:flex-1">
        <div v-if="isError" class="text-red-700">
            <span> {{ errMessage }}</span>
        </div>
        <h3 class="my-4 text-2xl font-semibold text-gray-700">Account Login</h3>
        <form @submit.prevent="userLogin" class="flex flex-col space-y-5">
          <div class="flex flex-col space-y-1">
            <label for="email" class="text-sm font-semibold text-black-500">Email address</label>
            <input
              v-model="userEmail" 
              autofocus
              class="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
            />
          </div>
          <div class="flex flex-col space-y-1">
            <div class="flex items-center justify-between">
              <label for="password" class="text-sm font-semibold text-black-500">Password</label>
              <a href="#" class="text-sm text-blue-600 hover:underline focus:text-blue-800">Forgot Password?</a>
            </div>
            <input
              type="password"
              v-model="userPassword"
              autocomplete="current-password"
              class="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
            />
          </div>
          <div class="flex items-center space-x-2">
            <input
              type="checkbox"
              id="remember"
              class="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
            />
            <label for="remember" class="text-sm font-semibold text-black-500">Remember me</label>
          </div>
          <div>
            <button
              type="submit"
              class="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div v-if="isLogined && !isSignUpCheck">
      <Navbar></Navbar> 
      <RouterView></RouterView>
  </div>
  <div v-if="isSignUpCheck">
      <div :class="{ 'mt-0': isSignUpCheck , 'mt-40' : !isSignUpCheck }">
        <RouterView></RouterView>
      </div>
  </div>
</template>

<script>
import { computed,ref } from 'vue';
import { insertDataFromApi } from '../services/apiService.ts'; 
import { useStore } from 'vuex';
import Navbar from './Navbar.vue';
import { useRouter } from 'vue-router';
import eventBus from '../common/eventBus.js';

export default {
  name: 'LoginPage',
  components: { Navbar },
  setup () {
    const store = useStore();
    const userEmail = ref('');
    const userPassword = ref();
    const isError = ref(false);
    const errMessage = ref('');
    const router = useRouter();
    const isSignup = ref(false);

    const userLogin = async () => {
      try {
        eventBus.emit('showLoader');
        const data = await insertDataFromApi('login', { 
          userEmail: userEmail.value, 
          password: userPassword.value 
        })
        if (data.status === 'true' || data.status === true) {
          // Store user data in Vuex if necessary
          store.commit('setUserData', JSON.stringify(data));
          store.commit('addToCart', data.carts);

          // Set authentication status
          localStorage.setItem('isAuthenticated', true);
          store.commit('setAuthentication', true);
          store.commit('setIsLogin', true);   
          store.commit('setAdminStatus', data.admin);

          isSignup.value = false;

          // Redirect to appropriate route based on user role
          if (data.admin) {
            router.push('/adminPanel');
          } else {
            router.push('/');
          }
        } else {
          // Handle login failure
          userEmail.value = '';
          userPassword.value = '';
          errMessage.value = data.msg || 'An error occurred during login.';
          isError.value = true;
        }
        eventBus.emit('hideLoader');
      } catch (error) {
        // Handle API request errors
        localStorage.setItem('isAuthenticated', false);
        errMessage.value = error.message || 'An error occurred during login.';
        isError.value = true;
        eventBus.emit('hideLoader');
      }

    };

    const openSignUp = () => {
      isSignup.value = true;
    }
    const isLogined = computed(() => {
      return store.state.isLogin;
    }); 
    const isSignUpCheck = computed(() =>  isSignup.value );
    return {
      userEmail,
      userPassword,
      userLogin,
      errMessage,
      isError,
      isLogined,
      openSignUp,
      isSignUpCheck,
    };
  }
}
</script>
