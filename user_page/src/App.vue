<template>
  <div>
    <div class="w-[300px] h-max p-2 space-y-2 z-[50] fixed top-0 right-0 mt-[65px]">
      <TransitionGroup name="list">
        <FeedbackItem :feedback="f" v-for="f in $store.state.feedbacks" :key="f.id" />
      </TransitionGroup>
    </div>

    <router-view/>
  </div>
</template>

<script setup>
import { inject, onMounted } from 'vue'
import store from '@/store'
import FeedbackItem from '@/components/Feedbacks/FeedbackItem.vue'
import { io } from 'socket.io-client'

onMounted(async () => {
  await store.dispatch('fetchProducts');
  const socket = io('http://localhost:5001')

  // Check if the socket is defined before using it
  if(socket) {
    socket.on('productChannel', (message) => {
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
</style>
