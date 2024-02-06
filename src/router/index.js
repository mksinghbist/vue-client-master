import { createRouter,createWebHistory } from "vue-router"
import AboutUs from '../components/About.vue';
import ContactUs from '../components/Contact.vue';
import ProductServe from '../components/Service.vue';
import Home from '../components/Home.vue';
import LoginPage from '../components/LoginPage.vue';
import SignUpPage from '../components/SignUpPage.vue';
import ProductAdd from '../components/products/ProductInsert.vue';
import ProductList from '../components/products/ProductList.vue'; 
import AdminPanel from '../components/admin/AdminPanel.vue'
import store from '../store';
import CheckOutPage from '../components/baskets/checkout.vue';

const routes = [
  {
    path: '/',
    name: 'App',
    component: store.state.isAdmin ? AdminPanel : Home,
  },
  {
    path: '/home',
    name: 'Home',
    component: store.state.isAdmin ? AdminPanel : Home,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutUs
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactUs
  },
  {
    path: '/service',
    name: 'Service',
    component: ProductServe,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignUpPage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/productAdd',
    name: 'ProductAdd',
    component: store.state.isAdmin ? ProductAdd : Home,
    meta: {
      admin: true,
    }, 
  },
  {
    path: '/productlist',
    name: 'ProductList',
    component: store.state.isAdmin ? ProductList : Home,
    meta: {
      admin: true,
    },
  },
  {
    path: '/adminPanel',
    name: 'AdminPannel',
    component: store.state.isAdmin ? AdminPanel : Home,
    meta: {
      admin: true,
    }, 
  },
  {
    path: '/checkout',
    name: 'Check Out Page',
    component: CheckOutPage,
    meta: {
      admin: false,
    }, 
  },
  
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.afterEach(() => {
  document.title = 'Local Bazzar';
});
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.isAuthenticated;
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    console.log('I am here 1');
    if (!isAuthenticated) {
      if(to.name == "Signup") {
        next();
      } 
      else {
        next('/login');
      }
    } 
    else {
      next();
    }
  }
  else {
    if(to.fullPath == '/login' && isAuthenticated && store.state.isLogin) {
      next('/');
    } else {
      next();
    }
  }
});
export default router