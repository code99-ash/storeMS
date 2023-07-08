<template>
  <div class="">
    <main class="container py-3">
      <div class="flex flex-col md:flex-row gap-5">
       
        <div class="grow space-y-2">
          <!-- Cart Item -->
          <cart-item v-for="i in $store.state.cartItems" :key="i.id" :item="i"></cart-item>
        </div>
        <!-- Checkout Info -->
        <div class="flex-none sm:w-[350px] xl:w-[500px] min-h-[100px] bg-slate-100 rounded p-3">
          <h1 class="text-xl font-medium text-slate-500">Checkout Info</h1>
          <form class="space-y-3 mt-3" @submit.prevent="checkoutOrder">
            <div class="form-group">
              <label>Address</label>
              <input type="text" v-model="address" />
            </div>
            <div class="form-group">
              <label>Contact Number</label>
              <input type="text" placeholder="+234-903-444-4444" v-model="phone" />
            </div>

            <button 
              class="text-white px-[12px] py-[8px] bg-orange-400 float-right rounded" 
              :class="{'cursor-not-allowed saturate-50': $store.state.cartItems.length == 0}"
              :disabled="$store.state.cartItems.length == 0"
            >
              Checkout&nbsp;&nbsp;{{$store.state.cartAmount}} <i class="pi pi-shopping-cart text-lg ml-1"></i>
            </button>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>


<script>
import { centralBase } from '~/utils';
import CartItem from '../components/CartItem.vue';
export default {
  components: { CartItem },
  layout: 'guest',
  data: () => ({
    address: '2, ABC Street,Uyo',
    phone: '+2348129029753'
  }),
  methods: {
    async checkoutOrder() {
      if(!(this.address && this.phone)) {
        this.$store.dispatch('addFeedback', {
            heading: 'Form Error Alert',
            variant: 'error',
            body: 'All fields are required',
        })
        return;
      }
      let user = localStorage.getItem('user')
      if(!user) {
        this.$store.dispatch('auth/setOpenAuth', true)
        return;
      }
      user = JSON.parse(user)
      console.log(user)
      const data = {
        user: user._id,
        ref: new Date().getTime().toString(),
        address: this.address,
        phone: this.phone,
        amount: this.$store.state.cartAmount,
        items: this.$store.state.cartItems.map(each => {
          const item = {
            product: each._id,
            quantity: each.quantity,
            price: each.price
          }
          return item;
        })
      }
      console.log(data)

      try {
        const resp = await this.$axios.$post(`${centralBase}/orders`, {...data})
        console.log(resp)
      }catch(err) {
        console.log(err)
        this.$store.dispatch('addFeedback', {
            heading: 'Error Alert',
            variant: 'error',
            body: err.response.data ?? 'An error occured',
        })
      }

    }
  }
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
  @apply h-[38px] w-full border border-slate-300 text-sm text-slate-500
  rounded p-2 outline-0;
}
</style>