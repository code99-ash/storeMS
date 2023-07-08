<template>
    <div class="item-list">
        <img 
            :src="`${imageBase}/${data.image}`" 
            class="w-[65px] h-[65px] md:w-[80px] md:h-[80px]" 
        />
        <div class="md:flex items-center gap-2 py-[10px]">
            <div class="text-slate-500 text-sm font-medium max-w-[300px] px-2">{{ data.title }}</div>
            <div class="text-slate-500 max-w-[400px] font-medium px-2 flex items-center gap-x-3">
                <span>{{ data.price }}</span>
                <i class="pi pi-times"></i>
                <span>{{ data.quantity }}</span>
                <span>=</span>
                <span>{{ data.total }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { apiBase } from '@/utils'

const imageBase = `${apiBase.central}/images`

const props = defineProps(['items', 'product'])
const quantity =  props.items.find(i => i.product == props.product._id).quantity

const data = computed(() => {
    return {
        title: props.product.title,
        image: props.product.image,
        price: props.product.price,
        quantity: quantity,
        total: props.product.price * quantity
    }
})
</script>