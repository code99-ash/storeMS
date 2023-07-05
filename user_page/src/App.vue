<template>
  <router-view/>
</template>

<script setup>
import { inject, onMounted } from 'vue'
import store from '@/store'

onMounted(async () => {
  await store.dispatch('fetchProducts');

  const socket = inject('$socket')
  socket.on('message', (message) => {
    console.log(message)
  })

  socket.on('newProduct', msg => {
    console.log('NEW PROD', msg)
  })
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
