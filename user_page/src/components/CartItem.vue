<template>
    <div class="p-2 flex gap-2 relative bg-[#F5F5F5]">
            <i 
                class="pi pi-trash text-red-500 text-lg absolute top-3 right-3 cursor-pointer"
                @click="$store.dispatch('removeFromCart', item._id)"
            ></i>
            <img :src="`${imageBase}/${item.image}`" class="flex-none w-[175px] h-auto" />
            <div class="h-full space-y-5 pt-[30px] px-5">
              <h1 class="text-[14px] text-slate-500">{{ item.title }}</h1>
              <div class="flex space-x-3 items-center text-slate-500">
                <h3 class="">#{{ item.price }}  X</h3>
                <input 
                    type="number" 
                    class="w-[45px] h-[35px] border rounded text-center outline-0 border-slate-300" 
                    :value="item.quantity"
                    :min="1"
                    @change="updateCartItem($event)"
                />
                <h3 class="text-[18px]">=  {{ item.price * item.quantity }}</h3>
              </div>
            </div>
          </div>
</template>

<script setup>
import store from '@/store'
import { apiBase } from '@/utils'

const props = defineProps(['item'])
const imageBase = `${apiBase.central}/images`

const updateCartItem = e => {
    store.dispatch('updateCart', {_id: props.item._id, quantity: e.target.value})
}

</script>