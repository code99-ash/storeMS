<template>
  <div class="">
    <main class="max-w-[1100px] mx-auto py-3">
      <div class="flex gap-5">
       
        <div class="grow space-y-2">
          <!-- Cart Item -->
          <cart-item v-for="i in  $store.state.cartItems" :key="i.id" :item="i"></cart-item>
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
              Checkout&nbsp;&nbsp;{{$store.state.cartAmount}} <i class="pi pi-shopping-cart text-lg ml-1"></i>
            </button>
          </form>
        </div>
     
      </div>
    </main>
  </div>
</template>


<script setup>
import CartItem from '../components/CartItem.vue';

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