<template>
  <div class="home">
    <header class="flex items-center gap-x-5 mb-3">
      <h1 class="text-slate-500 text-xl font-medium">Snacks & Treats</h1>
      <button class="bg-amber-600 text-amber-50 px-[12px] py-[8px] rounded text-sm">New Product +</button>
    </header>

    <!-- Product List -->
    <section class="product-list" v-for="p in $store.state.products.data" :key="p._id">
      <img :src="`${imageBase}/${p.image}`" class="flex-none w-[120px] h-[115px] rounded" />
      <div class="flex gap-2 w-full">

        <div class="w-1/3 space-y-5 p-3">
          <h1 class="text-slate-500 font-medium text-base">{{ p.title }}</h1>
          <h1 class="text-slate-500 text-lg font-medium">#{{ p.price }}</h1>
        </div>
        <div class="w-1/3 text-center space-y-5 p-3 text-slate-500 font-medium text-[15px] pt-[20px]">
          <h1 class="">No Orders yet</h1>
          <h1 class="">10 available</h1>
        </div>
        <div class="w-1/3 flex items-center justify-around gap-3 md:gap-0">
          <i class="pi pi-pencil text-lg text-amber-500"></i>
          <i class="pi pi-trash text-lg text-red-500"></i>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup>
import { apiBase } from '@/utils'

const imageBase = `${apiBase.central}/images`

</script>


<style lang="scss" scoped>
.product-list {
  @apply flex items-center gap-2 p-3 rounded bg-slate-100 min-h-[100px];
}
</style> 