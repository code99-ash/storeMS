<template>
  <div class="home">
    <header class="flex items-center gap-x-5 mb-3">
      <h1 class="text-slate-500 text-xl font-medium">Snacks & Treats</h1>
      <button 
        class="bg-amber-600 text-amber-50 px-[12px] py-[8px] rounded text-sm"
        @click="addModal=true"
      >New Product +</button>
    </header>

    <AddProductModal v-model="addModal" />

    <!-- Product List -->
    <single-product 
      v-for="p in $store.state.products.data" 
      :key="p._id" :product="p" class="product-list mb-2"
    ></single-product>

    <DeleteProduct 
      v-model="openDelConfirm"
      :loading="loading"
      @confirmOperation="confirmOperation"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AddProductModal from '../components/Modals/AddProductModal.vue';
import DeleteProduct from '../components/Modals/DeleteProduct.vue';
import SingleProduct from '../components/SingleProduct.vue';

const addModal = ref(false)
</script>

<style lang="scss">
.product-list {
  @apply flex items-center gap-2 p-3 rounded bg-slate-100 min-h-[100px];
}
</style> 