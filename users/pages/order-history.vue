<template>
  <div class="">
    <main class="container py-3">
      <h1 class="font-medium text-2xl mb-5 pl-3">Order History</h1>
          <!-- Order History -->
          <template v-if="$store.state.auth.loggedIn">
              <div v-if="!open" class="flex justify-center">
                <i class="pi pi-spin pi-spinner text-5xl text-slate-300"></i>
              </div>
              <template v-else>
                <div class="bg-white mb-2 max-w-[600px] p-3" v-for="i in $store.state.orders" :key="i._id">
                    <div class="h-full grow flex flex-col md:flex-row gap-3">
                        <div class="w-full md:w-2/3 space-y-1 md:space-y-2">
                            <h1 class="text-xs md:text-sm text-slate-500">REF - {{ i.reference }}</h1>
                            <h1 class="text-xs md:text-[14px] text-slate-500">Status - {{ i.status }}</h1>
                        </div>
                        <div class="w-full md:w-1/3 flex items-center gap-3 md:flex-col space-y-1 md:space-y-3">
                            <h1 class="text-[14px] text-slate-500">NGN {{ i.amount }}</h1>
                            <h1 class="text-[14px] text-slate-500">{{ i.createdAt }}</h1>
                        </div>
                    </div>
                </div>
              </template>
          </template>
          <div class="border border-amber-500 text-red-500 py-[25px]" v-else>
            <h4 class="text-center">No Access, please login</h4>
          </div>
          

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