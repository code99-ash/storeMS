<template>
    <div :class="['w-full rounded-sm shadow-lg', variant.bg]">
        <header :class="['p-2 font-bold border-b border-slate-50 flex items-center justify-between text-sm', variant.text]">
            {{ feedback.heading }} 
            <i 
                :class="['pi pi-times text-sm cursor-pointer', variant.text]"
                @click="$store.dispatch('removeFeedback', feedback.id)"
            ></i>
        </header>
        <div :class="['p-3 text-xs', variant.text]">
            {{ feedback.body }} 
        </div>
      </div>
</template>

<script setup>
/* eslint-disable */
import { computed, onMounted } from 'vue'
const props = defineProps(['feedback'])
import store from '@/store'

const variant = computed(() => {
    const { variant } = props.feedback
    if(variant == 'error') {
        return { text: 'text-red-500', bg: 'bg-red-100' }
    }
    if(variant == 'success') {
        return { text: 'text-teal-500', bg: 'bg-teal-50' }
    }
    if(variant == 'info') {
        return { text: 'text-cyan-500', bg: 'bg-cyan-50' }
    }
    return { text: 'text-amber-500', bg: 'bg-amber-100' }
})

onMounted(() => {
    const { duration, id } = props.feedback;
    if(duration == null) return;

    setTimeout(() => {
        store.dispatch('removeFeedback', id)
    }, duration);
})
</script>
