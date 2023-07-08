<template>
    <section class="order-list">
      <div class="block md:flex gap-2 w-full relative">
        <!-- Checkbox -->
        <div :class="['checkbox absolute ', selected?'active':'']" @click="toggleSelect">
            <i class="pi pi-check text-sm"></i>
        </div>
        <div class="ml-3 md:w-2/5 space-y-1 p-3 space-y-2 text-slate-500 font-medium text-sm">
          <h1 class="px-2 w-full md:px-0 border-r md:border-0">{{ order.reference }}</h1>
          <div class="flex item-center md:block md:space-y-1  ">
            <h1 class="px-2 md:w-full md:px-0 border-r md:border-0">NGN {{ order.amount }}</h1>
            <h1 class="px-2 md:w-full md:px-0">{{ order.items.length }} Piece(s)</h1>
          </div>
        </div>
        <div class="pl-3 grow">
            <div class="flex items-center w-full space-y-2">
              <div class="w-2/3 space-y-2 font-medium text-[15px] pt-[20px]">
                <h1 class="text-[#8D6527]">By: {{ order.customer[0].name }}</h1>
                <h1 class="text-orange-400">{{order.phone}}</h1>
              </div>
              <div class="w-1/3 flex justify-around items-center gap-3 md:gap-0">
                <button 
                    :class="['order-status', 
                    order.status == 'pending'?'bg-[#C8743E]':'bg-teal-700'
                ]">{{order.status}}</button>
                <i 
                    class="pi pi-chevron-right text-lg text-[#C8743E] cursor-pointer transition-all"
                    :class="{'rotate-90': opened}"
                    @click="toggleOpen"
                ></i>
              </div>
            </div>
            <div class="block text-slate-500 pt-2">
              <p class="text-sm font-medium">{{ order.deliveryAaddress }}</p>
            </div>
        </div>
      </div>

      <!-- Ordered Items -->
      <section :class="['space-y-2 transition-all space-y-3', !opened? 'scale-0 h-0':'scale-100']">
        <ordered-item
            v-for="item in order.products" 
            :key="item._id" class="item-list"
            :product="item" :items="order.items"
        ></ordered-item>
      </section>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import OrderedItem from '@/components/OrderedItem'

const props = defineProps(['order', 'selection'])
const emits = defineEmits(['selectOrder'])


const opened = ref(false)

const selected = computed(() => {
    return props.selection.includes(props.order._id)
})

const toggleOpen = () => {
    opened.value = !opened.value
}

const toggleSelect = () => {
    emits('selectOrder', {id: props.order._id})
}
</script>

<style lang="scss">
.order-status {
    @apply px-[12px] py-[6px] rounded text-sm text-white capitalize;
}
.checkbox {
    @apply border w-[18px] h-[18px] flex items-center justify-center cursor-pointer
    bg-slate-300;

    .pi-check {
        @apply text-xs text-slate-300;
    }

    &.active {
        @apply bg-[#C8743E] border-white;

        .pi-check {
            @apply text-white text-[10px];
        }
    }
}

.item-list {
    @apply min-h-[80px] rounded p-2 bg-[#FFFDF6] flex gap-2 w-max mb-2 md:ml-[45px];

    img {
        @apply flex-none w-[60px] h-[60px] rounded;
    }
}
</style>