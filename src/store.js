// store.js or store.ts

import { createApp } from 'vue';
import { createStore } from 'vuex';

const app = createApp();

app.use(createStore);
const getDefaultState = () => {
  return {
    isAuthenticated: false,
    isLogin: false,
    isAdmin: false,
    user: '',
    navRouter: [
      { name: "Home", link: '/home' },
      { name: "About", link: '/about' },
      { name: "Contact", link: '/contact' },
    ],
    customerCart: { cartEntries: []},
  };
}
const store = createStore({
  state: {
    isAuthenticated: false,
    isLogin : false,
    isAdmin : false,
    user : '',
    navRouter : [
      { name : "Home", link: '/home'},
      { name : "About", link: '/about'},
      { name : "Contact", link: '/contact'}, 
    ],
    customerCart: { cartEntries: []}, 
  },
  mutations: {
    resetState(state) {
      Object.assign(state, getDefaultState());
    },
    setAuthentication(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    setIsLogin(state, isLogin) {
      state.isLogin = isLogin;
      localStorage.setItem('isUserLogin',isLogin);
    },
    setUserData(state, user) {
      state.user = user;
      localStorage.setItem('userInfo',user);
    },
    setAdminStatus(state, user) {
      user = JSON.parse(user);
      state.isAdmin = user.admin ? true : false;

      if(state.isAdmin) {
        state.navRouter = [
          { name: "Dashboard", link: '/adminPanel' },
          { name: "Produuct List", link: '/productlist' },
          { name: "Product Add", link: '/productAdd' },
        ]
      } else {
        state.navRouter = [
          { name : "Home", link: '/home'},
          { name : "About", link: '/about'},
          { name : "Contact", link: '/contact'}, 
        ];
      }
    },
    addToCart(state, carts) {
      state.customerCart.cartEntries = carts ? carts : [];
      localStorage.setItem('customerCart',JSON.stringify(state.customerCart));
    },
  },
  actions : {
    checkAuthentication({ commit }) {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      commit('setAuthentication', isAuthenticated);
    },
    checkUserLogin({commit}) {
      const isUserLogin = localStorage.getItem('isUserLogin') === 'true';
      commit('setIsLogin', isUserLogin);
    },
    getUser({commit}) {
      const userInfo = localStorage.getItem('userInfo');
      if(userInfo != null) commit('setUserData', userInfo);
    },
    checkUserAsAdmin({commit}) {
      const userInfo = localStorage.getItem('userInfo');
      if(userInfo != null) commit('setAdminStatus', userInfo);
    },
    checkCustomerCart({commit}) {
      const useCarts = localStorage.getItem('customerCart');
      if(useCarts != null && useCarts != undefined) {
        try {
          var initialCart = JSON.parse(useCarts);
          console.log(initialCart.cartEntries)
          commit('addToCart', initialCart.cartEntries);
        } catch(error) {
          commit('addToCart', []);
        }
      }
    }, 
  }
});

store.dispatch('checkAuthentication');
store.dispatch('checkUserLogin');
store.dispatch('getUser');
store.dispatch('checkUserAsAdmin');
store.dispatch('checkCustomerCart');

export default store;

