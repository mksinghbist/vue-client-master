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
    isMobileDevice: false,
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
    isMobileDevice: false,
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
    setAdminStatus(state, isAdmin) {
      state.isAdmin = isAdmin ? true : false;
      localStorage.setItem('isAdmin',state.isAdmin);
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
    setMobileDevice(state, isSmallDevice){
      state.isMobileDevice = isSmallDevice;
      localStorage.setItem('isMobileDevice',state.isMobileDevice);
    }
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
      const isAdmin = localStorage.getItem('isAdmin');
      if(isAdmin != null && isAdmin != undefined) {
        commit('setAdminStatus', isAdmin);
      }
    },
    checkCustomerCart({commit}) {
      const useCarts = localStorage.getItem('customerCart');
      if(useCarts != null && useCarts != undefined) {
        try {
          const initialCart = JSON.parse(useCarts);
          commit('addToCart', initialCart.cartEntries);
        } catch(error) {
          commit('addToCart', []);
        }
      }
    }, 
    checkUserDevice({commit}) {
      commit('setMobileDevice', window.innerWidth <= 765);
    },
  }
});

store.dispatch('checkAuthentication');
store.dispatch('checkUserLogin');
store.dispatch('getUser');
store.dispatch('checkUserAsAdmin');
store.dispatch('checkCustomerCart');
store.dispatch('checkUserDevice');

export default store;

