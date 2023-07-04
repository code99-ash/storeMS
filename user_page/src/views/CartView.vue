<template>
  <div class="">
    <HeaderNav />
    
    <main class="max-w-[1100px] mx-auto py-3">
      <div class="flex gap-5">
       
        <div class="grow space-y-2">
          <!-- Cart Item -->
          <div class="p-2 flex gap-2 relative bg-[#F5F5F5]" v-for="i in  $store.state.cartItems" :key="i.id">
            <i class="pi pi-trash text-red-500 text-lg absolute top-3 right-3"></i>
            <img :src="require(`@/assets/images/${i.image}`)" class="flex-none w-[175px] h-auto" />
            <div class="h-full space-y-5 pt-[30px] px-5">
              <h1 class="text-[14px] text-slate-500">{{ i.title }}</h1>
              <div class="flex space-x-3 items-center text-slate-500">
                <h3 class="">#{{ i.price }}  X</h3>
                <input 
                type="number" 
                class="w-[45px] h-[35px] border rounded text-center outline-0 border-slate-300" 
                :value="i.quantity"
                />
                <h3 class="text-[18px]">=  {{ i.price * i.quantity }}</h3>
              </div>
            </div>
          </div>
        </div>
        <!-- Checkout Info -->
        <div class="flex-none w-[500px] min-h-[100px] bg-slate-100 rounded p-3">
          <h1 class="text-xl font-medium text-slate-500">Checkout Info</h1>
          <form class="space-y-3">
            <div class="form-group">
              <label>Address</label>
              <input type="text" />
            </div>
            <div class="form-group">
              <label>Contact Number</label>
              <input type="text" placeholder="+234-903-444-4444" />
            </div>

            <button class="text-white px-[12px] py-[8px] bg-orange-400 float-right rounded">
              Checkout&nbsp;&nbsp;NGN3,350 <i class="pi pi-shopping-cart text-lg ml-1"></i>
            </button>
          </form>
        </div>
     
      </div>
    </main>
  </div>
</template>


<script setup>
import HeaderNav from '@/components/HeaderNav.vue';

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