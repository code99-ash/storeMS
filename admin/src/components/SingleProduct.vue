<template>
    <section class="product-list mb-2">
      <img :src="`${imageBase}/${product.image}`" class="flex-none w-[80px] md:w-[120px] h-[80px] md:h-[115px] rounded" />
      <div class="flex flex-col md:flex-row gap-2 w-full">

        <div class="w-full md:w-1/3 space-y-2 border-b md:border-0 md:space-y-5 p-3">
          <h1 class="text-slate-500 font-medium text-sm md:text-base">{{ product.title }}</h1>
          <h1 class="text-slate-500 textsm md:text-lg font-medium">#{{ product.price }}</h1>
        </div>
        <div class="w-full md:w-2/3 flex items-center gap-2">
          <div class="w-1/2 md:text-center space-y-2 md:space-y-5 text-slate-500 font-medium text-[15px] md:pt-[20px]">
            <h1 class="">No Orders yet</h1>
            <h1 class="">{{product.qtyAvailable}} available</h1>
          </div>
          <div class="w-1/2 flex items-center justify-around gap-3 md:gap-0">
            <i class="pi pi-pencil text-lg text-amber-500 cursor-pointer"></i>
            <i class="pi pi-trash text-lg text-red-500 cursor-pointer" @click="openDelConfirm=true"></i>
          </div>
        </div>

      </div>
      <DeleteProduct 
        v-model="openDelConfirm"
        :loading="loading"
        @confirmOperation="confirmOperation"
      />
    </section>

</template>

<script setup>
import { ref } from 'vue'
// import axios from 'axios'
import axios from '@/axios-interceptor'

import store from '@/store'
import { apiBase } from '@/utils'
import DeleteProduct from './Modals/DeleteProduct.vue'

const imageBase = `${apiBase.central}/images`


const props = defineProps(['product'])
const openDelConfirm = ref(false)
const loading = ref(false)

const confirmOperation = async() => {
    loading.value = true
    try {
        const { _id, image } = props.product
        await axios.post(`${apiBase.central}/products/delete`, { _id, image }, {
            header: { 'Content-Type': 'application/json' }
        })
        await store.dispatch('products/removeProduct', _id)
       
        store.dispatch('addFeedback', {
            heading: 'Success Alert',
            variant: 'success',
            body: 'Successfully deleted products !!',
        })
    } catch(err) {
        console.log(err.response.data)
        store.dispatch('addFeedback', {
            heading: 'Error Alert',
            variant: 'error',
            body: err.response.data ?? 'Error removing admin, please try again',
        })
    }
    loading.value = false
}
</script>
