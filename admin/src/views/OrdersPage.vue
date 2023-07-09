<template>
  <div class="orders">
    <header class="flex items-center gap-x-5 mb-3">
      <h1 class="text-slate-500 md:text-xl font-medium">Orders</h1>
      <div class="flex items-center gap-3">
        <button 
          class="bg-teal-700 text-[#fff] px-[12px] py-[8px] px-[10px] py-[6px] rounded text-xs md:text-sm" 
          @click="markStatus('delivered')"
          :class="{'cursor-not-allowed saturate-50': selected.length == 0}"
          :disabled="selected.length == 0"
        >
          Mark Delivered ({{ selected.length }})
        </button>
        <button 
          class="bg-[#C8743E] text-[#fff] px-[12px] py-[8px] px-[10px] py-[6px] rounded text-xs md:text-sm" 
          @click="markStatus('pending')"
          :class="{'cursor-not-allowed saturate-50': selected.length == 0}"
          :disabled="selected.length == 0"
        >
          Mark Pending ({{ selected.length }})
        </button>
      </div>
    </header>

    <!-- Product List -->
    <order-ref  
      v-for="p in $store.state.orders.data" 
      :key="p._id" :order="p"
      @selectOrder="selectOrder"
      :selection="selected"
    ></order-ref>
  </div>
</template>

<script setup>
import OrderRef from '@/components/OrderRef'
import { ref } from 'vue'
import store from '@/store'
import { apiBase } from '@/utils' 
import axios from '@/axios-interceptor'

let selected = ref([])

const selectOrder = ({id}) => {
  if(!selected.value.includes(id)) return selected.value.push(id)
  // console.log({id, selected})
  selected.value = selected.value.filter(each => each !== id)
}

const markStatus = async(status) => {
  if(selected.value.length == 0) return;

  try {
    const fd = {ids: selected.value, status}
    await axios.put(`${apiBase.central}/orders`, fd)
    await store.dispatch('orders/updateOrderStatus', fd)
  
    await store.dispatch('addFeedback', {
      heading: 'Status Changes',
      variant: 'success',
      body:  `Successfully changed ${selected.value.length} item(s) status to ${status}`,
    })
  
    selected.value = []
  } catch(err) {
    // console.log(err)
    store.dispatch('addFeedback', {
      heading: 'Error Alert',
      variant: 'error',
      body: err.response.data ?? 'Error changing orders status',
    })
  }
}

</script>

<style lang="scss" scoped>
.order-list {
  @apply space-y-3 p-2 rounded bg-[#F5F5F5] mb-2;
}
</style>