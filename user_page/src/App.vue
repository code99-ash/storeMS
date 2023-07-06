<template>
  <div>
    <div class="w-[300px] h-max p-2 space-y-2 z-[50] fixed top-0 right-0 mt-[65px]">
      <TransitionGroup name="list">
        <FeedbackItem :feedback="f" v-for="f in $store.state.feedbacks" :key="f.id" />
      </TransitionGroup>
    </div>

    <HeaderNav :authType="authType" v-if="route.name !== 'Home'" />
    <header class="w-full fixed z-50 p-3 md:p-0" v-else>
      <nav class="header-nav">
        <router-link :to="{name: 'Cart'}" class="cart-btn">
          View Cart <i class="pi pi-shopping-cart"></i>
        </router-link>
        <button class="account-btn" @click="openLogin">
          Login <i class="pi pi-lock"></i>
        </button>
      </nav>
    </header>

    <AuthView v-model="openAuth">
      <login-view v-model="authType" v-if="authType=='login'" @closePopup="openAuth=false"></login-view>
      <register-view v-model="authType" v-else @closePopup="openAuth=false"></register-view>
    </AuthView>

    <router-view />
  </div>
</template>

<script setup>
import { io } from 'socket.io-client'
import { onMounted, ref, watch } from 'vue'
import  { useRoute } from 'vue-router'
import store from '@/store'
import FeedbackItem from '@/components/Feedbacks/FeedbackItem.vue'
import AuthView from './components/Auth/AuthView.vue'
import HeaderNav from './components/HeaderNav.vue'
import RegisterView from '@/components/Auth/RegisterView.vue';
import LoginView from '@/components/Auth/LoginView.vue';
import axios from 'axios'

const route = useRoute();
const authType = ref('login')
const openAuth = ref(false)

const openLogin = () => {
  authType.value = 'login'
  openAuth.value = true
}

watch(() => route.value, (val) => {
  console.log('route change', val)
})

onMounted(async () => {
  await store.dispatch('fetchProducts');
  await store.dispatch('getCartItems');
  const socket = io('http://localhost:5001')

  axios.interceptors.response.use(undefined, function (err) {
    return new Promise(function (resolve, reject) {
      if (err.status >= 400 && err.status <= 403 && err.config && !err.config.__isRetryRequest) {
      // if you ever get an unauthorized, logout the user
        this.$store.dispatch('auth/logout')
      // you can also redirect to /login if needed !
      }
      throw err;
    });
  });

  // Check if the socket is defined before using it
  if(socket) {
    socket.on('productChannel', (message) => {
      console.log(message.data)

      const { method, data } = message.data;
      if(method == 'create') {
        store.dispatch('addProduct', data)
      }
      else if(method == 'remove') {
        store.dispatch('removeProduct', data)
      }
    })
  }
})
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.header-nav {
  @apply flex py-[20px] justify-end space-x-3 max-w-[1200px] mx-auto;
}
</style>
