import { createRouter,createWebHistory } from "vue-router"
import AboutUs from '../components/About.vue';
import ContactUs from '../components/Contact.vue';
import ProductServe from '../components/Service.vue';
import Home from '../components/Home.vue'

const routes = [
  {
    path: '/',
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router