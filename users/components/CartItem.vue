<template>
    <div class="p-2 flex gap-2 relative bg-[#F5F5F5] max-w-[500px] md:max-w-full">
            <i 
                class="pi pi-trash text-red-500 text-lg absolute top-3 right-3 cursor-pointer"
                @click="removeFromCart"
            ></i>
            <img :src="`${imageBase}/${item.image}`" class="cart-img" />
            <div class="h-full space-y-5 md:pt-[30px] px-5">
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
            <!-- {{ item }} -->
          </div>
</template>

<script>
import { centralBase } from '@/utils'
export default {
  props: ['item'],
  data: () => ({
    imageBase: `${centralBase}/images`,
    qty: 0
  }),
  mounted() {
    const trgt = this.$store.state.cartItems.find(each => each._id == this.item._id);
    if(trgt) {
        this.qty = trgt.quantity
    } 
  },
  methods: {
    updateCartItem(e) {
        this.$store.dispatch('updateCart', {_id: this.item._id, quantity: e.target.value})
    },
    removeFromCart() {
        this.$store.dispatch('removeFromCart', this.item._id)
        this.$store.dispatch('addFeedback', {
                heading: 'Success Alert',
                variant: 'success',
                body: 'Successfully deleted from cart !!',
        })
    }
  }
}




</script>

<style scoped>
.cart-img {
  @apply flex-none w-[65px] sm:w-[85px] md:w-[120px] h-[65px] sm:h-[85px] md:h-[120px];
}
</style>