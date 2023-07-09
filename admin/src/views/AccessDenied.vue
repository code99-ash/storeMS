<template>
    <div class="fixed w-full h-[100vh] z-[100] pt-[60px] md:pt-[100px] px-3 space-y-3 md:space-y-5">
        <div class="flex pb-3 items-center justify-center text-center">
            <i class="pi pi-exclamation-triangle text-4xl md:text-6xl mr-3 text-red-500"></i>
            <h1 class="text-center text-2xl sm:text-3xl md:text-7xl text-slate-700 font-bold">Access Denied</h1>
        </div>
        <div class="flex flex-col items-center gap-2 max-w-[600px] mx-auto text-center">
            <p class="text-sm md:text-lg">Looks like you are don't have access to manage the dashboard</p>
            <button class="px-[12px] py-[8px] rounded bg-teal-600 text-white w-max" @click="backToLogin">
                <i class="pi pi-arrow-left mr-2"></i> Back to Home
            </button>
        </div>
    </div>
</template>

<script setup>
import { productionHost } from '@/utils'
const backToLogin = () => {
    window.location = productionHost
}

</script>