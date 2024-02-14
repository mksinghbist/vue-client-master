// store.js or store.ts

import { createApp } from 'vue';
import { createStore } from 'vuex';
import { updateUserCart , getCustomerCart} from '../services/cartService'; 

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
  getters: {
    itemsInCart : state => {
      return state.customerCart.cartEntries.reduce((total, product) => total + parseFloat(product?.userEnterQty), 0);
    }
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
      state.isAdmin = isAdmin == true || isAdmin == "true" ? true : false;
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
      if(state.isLogin) {
        updateUserCart('user/cartsupdate',{ userCart : state.customerCart.cartEntries } );
      }
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
    async checkCustomerCart({commit, state}) {
      if (state.isLogin) {
        const useCarts = localStorage.getItem('customerCart');
        if (useCarts != null && useCarts != undefined) {
          try {
            const initialCart = JSON.parse(useCarts);
            commit('addToCart', initialCart.cartEntries);
          } catch (error) {
            console.error('Error parsing cart from local storage:', error);
          }
        }
        const cartResponse = await getCustomerCart('user/getCarts');
        if (cartResponse.success) {
          commit('addToCart', cartResponse.data.carts ? cartResponse.data.carts : []);
        } else {
          console.error('Failed to fetch customer cart:', cartResponse.error);
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

