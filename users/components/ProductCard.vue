<template>
    <div class="bg-slate-50 hover:shadow p-2 group flex flex-col justify-between">
          <img :src="`${imageBase}/${product.image}`" class="h-[280px] object-cover group-hover:scale-90 transition-all" />
          <div class="p-2 space-y-2">
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
import { apiBase } from '@/utils'
export default {
  props: ['product'],
  data: () => ({
    imageBase: `${apiBase.central}/images`,
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