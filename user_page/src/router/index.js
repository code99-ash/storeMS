import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { name: 'guest' }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/CartView.vue'),
    meta: { name: 'guest' }
  },
  {
    path: '/order-history',
    name: 'Orders',
    component: () => import('@/views/OrderHistory.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const token = store.state.auth.accessToken ?? ''
  // console.log(to.meta.name)
  console.log(token)

  if(token) {
    await store.dispatch('auth/userRequest', token)
  }
  next()

  if(to.meta.name == 'guest') {
    if(store.state.auth.loggedIn) { next('/'); }
    next()
  }else {
    if(!store.state.auth.loggedIn) { // not authenticated, back to login
      // next('/')
      store.dispatch('addFeedback', {
        heading: 'Error Alert',
        variant: 'error',
        body: 'Access denied, please login again',
      })
    }
    next();
  }
})


export default router
