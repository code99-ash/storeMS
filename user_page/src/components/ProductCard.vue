<template>
    <div class="bg-slate-50 hover:shadow p-2 group flex flex-col justify-between">
          <img :src="`${imageBase}/${product.image}`" class="h-280px group-hover:scale-90 transition-all" />
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

<script setup>
import { ref, onMounted } from 'vue'
import { apiBase } from '@/utils'
import store from '@/store'

const props = defineProps(['product'])
const imageBase = `${apiBase.central}/images`

const qty = ref(0)

onMounted(() => {
    const trgt = store.state.cartItems.find(each => each._id == props.product._id);
    if(trgt) {
        qty.value = trgt.quantity
    } 
})

const addtocart = async() => {
    if(qty.value == 0) return;

    const { price, _id, title, image } = props.product;
    const data = {_id, price, title, image, quantity: qty.value}
    // console.log(data)
    await store.dispatch('updateCart', data)
    qty.value = 0;

    store.dispatch('addFeedback', {
        heading: 'Added to Cart',
        variant: 'success',
        body: 'Successfully added product to cart !!',
    })
    // console.log(store.state.cartItems)
}

</script>