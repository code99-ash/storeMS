<template>
    <div class="product-card group">
          <img :src="`${imageBase}/${product.image}`" class="prod-img group-hover:scale-40 transition-all" />
          <div class="prod-body">
            <p class="text-slate-500 text-sm">{{product.title}}</p>
            <div class="flex justify-between items-center">
              <h4 class="text-xl font-medium text-slate-500">#{{product.price}}</h4>
              <div class="flex items-center gap-x-3">
                <input 
                    type="number" 
                    class="w-[65px] h-[38px] border rounded text-center outline-0 border-slate-300" 
                    v-model="qty"
                    :min="1"
                />
                <i 
                    class="pi pi-shopping-cart text-orange-400 text-xl cursor-pointer"
                    @click="addtocart"    
                ></i>
              </div>
            </div>
          </div>
        </div>
</template>

<script>
import { centralBase } from '@/utils'
export default {
  props: ['product'],
  data: () => ({
    imageBase: `${centralBase}/images`,
    qty: 0
  }),
  mounted() {
    const trgt = this.$store.state.cartItems.find(each => each._id == this.product._id);
    if(trgt) {
        this.qty = trgt.quantity
    } 
  },
  methods: {
    async addtocart() {
      if(this.qty == 0) return;

      const { price, _id, title, image } = this.product;
      const data = {_id, price, title, image, quantity: this.qty}
      // console.log(data)
      await this.$store.dispatch('updateCart', data)
      this.qty = 0;

      this.$store.dispatch('addFeedback', {
          heading: 'Added to Cart',
          variant: 'success',
          body: 'Successfully added product to cart !!',
      })
      // console.log(this.store.state.cartItems)
  }
  }
}
</script>

<style scoped>
.product-card {
  @apply bg-white border border-slate-200 hover:shadow-lg p-2 flex flex-col justify-between h-max;
}
.prod-img {
  @apply grow object-cover w-full h-auto scale-[.8] xl:scale-100;
}
.prod-body {
  @apply p-2 space-y-2 flex-none h-[100px] flex flex-col justify-end;
}
</style>