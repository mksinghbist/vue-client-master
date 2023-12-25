// store.js or store.ts

import { createApp } from 'vue';
import { createStore } from 'vuex';

const app = createApp();

app.use(createStore);

const store = createStore({
  state: {
    isAuthenticated: false,
    isLogin : false,
    user : '',
    navRouter : [
      { name : "Home", link: '/home'},
      { name : "About", link: '/about'},
      { name : "Contact", link: '/contact'}, 
  ]
  },
  mutations: {
    setAuthentication(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    setIsLogin(state, isLogin) {
      state.isLogin = isLogin;
      sessionStorage.setItem('isUserLogin',isLogin);
    },
    setUserData(state, user) {
      state.user = user;
      sessionStorage.setItem('userInfo',user);
    },
  },
  actions : {
    checkAuthentication({ commit }) {
      const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
      commit('setAuthentication', isAuthenticated);
    },
    checkUserLogin({commit}) {
      const isUserLogin = sessionStorage.getItem('isUserLogin') === 'true';
      commit('setIsLogin', isUserLogin);
    },
    getUser({commit}) {
      const userInfo = sessionStorage.getItem('userInfo');
      commit('setUserData', userInfo);
    },
  }
});

store.dispatch('checkAuthentication');
store.dispatch('checkUserLogin');
store.dispatch('getUser');
export default store;

