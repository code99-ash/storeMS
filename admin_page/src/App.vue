<template>
  <router-view/>
</template>

<script setup>
import { onMounted } from 'vue'
import store from '@/store'

onMounted(async() => {
  await store.dispatch('products/fetchProducts');
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
