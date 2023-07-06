<template>
    <div class="">
      <main class="container py-3">
        <h1 class="font-medium text-2xl mb-5 pl-3">Order History</h1>
            <!-- Cart Item -->
        <!-- <div class="p-2 flex gap-2 relative bg-[#F5F5F5] md:w-2/3 mb-2" v-for="i in items" :key="i.id">
            <img :src="require(`@/assets/images/${i.image}`)" class="flex-none w-[80px] h-[80px]" />
            <div class="h-full grow flex flex-col md:flex-row gap-3">
                <div class="w-full md:w-2/3 space-y-1 md:space-y-5">
                    <h1 class="text-xs md:text-sm text-slate-500">{{ i.title }}</h1>
                    <h1 class="text-xs md:text-[14px] text-slate-500">REF - {{ i.ref }}</h1>
                </div>
                <div class="w-full md:w-1/3 flex items-center gap-3 md:flex-col space-y-1 md:space-y-3">
                    <h1 class="text-[14px] text-slate-500">NGN {{ i.price }}</h1>
                    <h1 class="text-[14px] text-slate-500">{{ i.date }}</h1>
                </div>
            </div>
        </div> -->
      </main>
    </div>
  </template>
  
  
<script>
export default {
  data: () => ({
    items: [],
    layout: 'guest'
  })
}
</script>
  
  <style scoped>
  .form-group {
    @apply space-y-1;
  }
  .form-group label {
    @apply text-slate-500 text-[14px] font-medium block;
  }
  .form-group input {
    @apply h-[38px] w-full border border-slate-300 rounded p-2 outline-0;
  }
  </style>