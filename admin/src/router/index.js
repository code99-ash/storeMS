import { createRouter, createWebHistory } from 'vue-router'
import { production } from '../utils'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('@/views/OrdersPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const redirect = production == 'false'? 'http://localhost:3000':window.location.origin
  const token = localStorage.getItem('auth-token');
  if(!token) {
    window.location = redirect;
  }else {
    await store.dispatch('auth/userRequest', token)
  }
  if(store.state.auth.loggedIn) {
    next();
    return;
  }
  // next()
  window.location = redirect
})

export default router
