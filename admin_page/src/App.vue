<template>
  <section>
    <header class="bg-white border-b border-slate-300">
      <nav class="container header-nav">
        <router-link :to="{name: 'Home'}" class="logo">Classilicious</router-link>
        <div class="flex items-center gap-x-3">
          <router-link :to="{name: 'Home'}" class="links">Snacks & Treats</router-link>
          <router-link :to="{name: 'Orders'}" class="links">
            Orders <span class="px-2 py-1 text-orange-400">0</span>
          </router-link>
        </div>
        <button class="account-btn">Admin <i class="pi pi-lock text-sm"></i></button>
      </nav>
    </header>
    <div class="container py-[20px]">
      <div class="w-[300px] h-max p-2 space-y-2 z-[50] fixed top-0 right-0 mt-[65px]">
        <TransitionGroup name="list">
          <FeedbackItem :feedback="f" v-for="f in $store.state.feedbacks" :key="f.id" />
        </TransitionGroup>
      </div>
      
      <router-view/>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import store from '@/store'
import FeedbackItem from '@/components/Feedbacks/FeedbackItem.vue'
import { io } from 'socket.io-client'

onMounted(async() => {
// console.log(`${window.location.origin}`)
  await store.dispatch('products/fetchProducts');
  await store.dispatch('orders/fetchOrders');

  const socket = io('http://localhost:5002')

  // Check if the socket is defined before using it
  if(socket) {
    socket.on('orderChannel', (message) => {
      console.log(message.data)

      const { method, data } = message.data;
      if(method == 'create') {
        store.dispatch('addProduct', data)
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
  @apply flex items-center justify-between py-[20px] min-h-[65px];

  .links {
    @apply px-[12px] py-[8px] text-slate-500 text-lg bg-slate-50 hover:shadow transition-all
    hover:rounded-full duration-1000;
  }
}
.account-btn {
  @apply border border-[#7C3100] text-[#7C3100] font-bold px-[12px] py-[8px] rounded
  hover:bg-[#7C3100] hover:text-white transition-all;
}
.logo {
  @apply text-[#7C3100] font-medium text-3xl;
}
</style>
