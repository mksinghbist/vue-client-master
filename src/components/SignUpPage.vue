<template>
    <div class="flex items-center min-h-screen bg-gray-100 lg:justify-center">
      <div
        class="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md"
      >
        <div
          class="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly"
        >
          <div class="my-3 text-4xl font-bold tracking-wider text-center">
            <a href="#"><strong>Local Bazzar</strong></a>
          </div>
          <p class="mt-6 font-normal text-center text-gray-300 md:mt-0">
            On Local Bazzar Platform Provide Best Quality and Delivery on time
          </p>
          <p class="flex flex-col items-center justify-center mt-10 text-center">
            <span>If you have an account?</span>
            <router-link to="/" class="underline hover:text-green-500">Get Started!</router-link> 
          </p>
          <p class="mt-6 text-sm text-center text-gray-300">
            Read our <a href="#" class="underline">terms</a> and <a href="#" class="underline">conditions</a>
          </p>
        </div>
        <div class="p-5 bg-white md:flex-1">
          <h3 class="my-4 text-2xl font-semibold text-gray-700">Account Create</h3>
          <form @submit.prevent="InsertUserData" class="flex flex-col space-y-5">
            <div class="flex flex-col space-y-1">
              <label for="email" class="text-sm font-semibold text-gray-500">Name</label>
              <input
                type="text"
                id="name"
                v-model="userName" 
                autofocus
                class="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div class="flex flex-col space-y-1">
              <label for="email" class="text-sm font-semibold text-gray-500">Email address</label>
              <input
                type="email"
                id="email"
                v-model="userEmail" 
                autofocus
                class="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div class="flex flex-col space-y-1">
              <div class="flex items-center justify-between">
                <label for="password" class="text-sm font-semibold text-gray-500">Password</label>
                <a href="#" class="text-sm text-blue-600 hover:underline focus:text-blue-800">Forgot Password?</a>
              </div>
              <input
                type="password"
                id="password"
                v-model="userPassword"
                class="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div>
              <button
                type="submit"
                class="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
              >
                SignUp
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>
<script>
    import { insertDataFromApi } from '../services/apiService.ts'; 
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    import eventBus from '../common/eventBus.js';
    export default {
      name: 'SignUpPage',
      components: {},
      setup () {
        const userName = ref('');
        const userEmail = ref('');
        const userPassword = ref('');
        const router = useRouter();
        const store = useStore();
        const InsertUserData = async () => {
          try {
            eventBus.emit('showLoader');
            const data = await insertDataFromApi('signup', { 
              userName: userName.value,
              userEmail: userEmail.value, 
              userPassword: userPassword.value,
            });
            eventBus.emit('hideLoader');
            if(data.status == 'true' || data.status == true) { 
                store.commit('setIsLogin', false);             
                router.push('/login');
            } else {
              userEmail.value = '';
              userPassword.value = '';
              userName.value = '';
            }
          } catch (error) {
            console.log(error)
          }
        };
        return {
          userName,
          userEmail,
          userPassword,
          InsertUserData
        }
      }
    }
</script>