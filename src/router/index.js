import { createRouter,createWebHistory } from "vue-router"
import AboutUs from '../components/About.vue';
import ContactUs from '../components/Contact.vue';
import ProductServe from '../components/Service.vue';
import Home from '../components/Home.vue';
import LoginPage from '../components/LoginPage.vue';
import SignUpPage from '../components/SignUpPage.vue';

const routes = [
  {
    path: '/',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
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
    component: ProductServe
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignUpPage
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignUpPage
  },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.afterEach(() => {
  document.title = 'Local Bazzar';
});
export default router