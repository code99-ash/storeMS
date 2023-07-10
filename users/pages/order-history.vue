<template>
  <div class="">
    <main class="container py-3">
      <h1 class="font-medium text-2xl mb-5 pl-3">Order History</h1>
          <!-- Order History -->
          <div v-if="!open" class="flex justify-center">
            <i class="pi pi-spin pi-spinner text-5xl text-slate-300"></i>
          </div>
          <template v-else>
            <div class="bg-white mb-2 p-3" v-for="i in $store.state.orders" :key="i._id">
                <div class="h-full grow flex flex-col md:flex-row gap-3">
                    <div class="w-full md:w-1/1 space-y-1 md:space-y-2">
                        <h1 class="text-xs md:text-sm text-slate-500">REF - {{ i.reference }}</h1>
                        <h1 class="text-[14px] text-slate-500">{{ i.createdAt }}</h1>
                      </div>
                      <div class="w-full md:w-1/2 flex items-center justify-between md:justify-start gap-x-3 md:gap-x-5">
                        <button :class="['btn text-white', i.status=='pending'?'bg-amber-600':'bg-teal-600']">
                          {{ i.status }}
                        </button>
                        <h1 class="text-slate-500 text-lg font-medium">NGN {{ i.amount }}</h1>
                    </div>
                </div>
            </div>
          </template>
    </main>
  </div>
</template>
  
  
<script>
export default {
  layout: 'guest',
  data: () => ({
    open: false,
  }),
  beforeMount() {
    this.fetchOrders()
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('user'))
    this.$socket.on(`orderChannel-${user._id}`, (data) => {
      // Handle the received data
      const { i, status } = data;
      console.log('order ids updates', {i, status})
      this.$store.dispatch('updateOrderStatus', { ids: i, status })
    });

    this.$socket.on('message', msg => console.log(msg))

    this.$socket.emit('registerUserID', user._id);
  },
  beforeDestroy() {
    const user = JSON.parse(localStorage.getItem('user'))
    this.$socket.emit('deregisterUserID', user._id)
  },  
  methods: {
    async fetchOrders() {
      const user = localStorage.getItem('user')
      await this.$store.dispatch('fetchOrders', JSON.parse(user)._id)
      this.open = true
    },
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
    @apply h-[38px] w-full border border-slate-300 rounded p-2 outline-0;
  }
  </style>