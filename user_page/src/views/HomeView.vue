<template>
  <div class="home">
    <header class="w-full fixed z-50 p-3 md:p-0">
      <nav class="header-nav">
        <router-link :to="{name: 'Cart'}" class="cart-btn">
          View Cart <i class="pi pi-shopping-cart"></i>
        </router-link>
        <router-link to="/" class="account-btn">
          Login <i class="pi pi-lock"></i>
        </router-link>
      </nav>
    </header>
    <div class="hero-banner">
      <div class="hero-content">
        <button class="w-[65px] h-[65px] rounded-full bg-[#8D6527] text-white absolute bottom-[30px] right-0">
          <i class="pi pi-arrow-down text-3xl"></i>
        </button>
        <div class="hero-highlight">
          <h1>Cassilicious</h1>
          <h4>Snacks & Treats</h4>
        </div>
        <div class="hero-footer text-sm space-y-5">
          <p class="leading-relaxed font-light text-white bg-[#070404c9] p-2">
            2, Abak Road, Uyo, <br>
            Akwa Ibom State, Nigeria
          </p>
          <p class="font-light text-white bg-[#070404c9] p-2 ml-[50px]">
            A taste that satisfy your hunger
          </p>
        </div>
      </div>
    </div>
    
    <section class="py-[20px] max-w-[1200px] mx-auto">
      <div class="grid grid-cols-4 gap-2">
       
        <!-- Produt Card -->
        <div class="bg-slate-50 hover:shadow p-2 group flex flex-col justify-between" v-for="p in $store.state.products" :key="p.id">
          <img :src="require(`@/assets/images/${p.image}`)" class="h-280px group-hover:scale-90 transition-all" />
          <div class="p-2 space-y-2">
            <p class="text-slate-500 text-sm">{{p.title}}</p>
            <div class="flex justify-between items-center">
              <h4 class="text-xl font-medium text-slate-500">#{{p.price}}</h4>
              <div class="flex items-center gap-x-3">
                <input type="number" class="w-[65px] h-[38px] border rounded text-center outline-0 border-slate-300" value="0">
                <i class="pi pi-shopping-cart text-orange-400 text-xl"></i>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data: () => ({

  })
};
</script>


<style lang="scss" scoped>
.hero-banner {
  background: url('@/assets/images/hero-banner.png');
  @apply w-full h-[600px] bg-cover bg-no-repeat bg-center relative;
}
.hero-content {
  @apply max-w-[1200px] h-full mx-auto py-[100px] p-3 relative;
}
.hero-highlight h1 {
  @apply text-white text-6xl font-medium;
}
.hero-highlight h4 {
  @apply text-white text-3xl mx-5 mt-4 font-medium;
}
.hero-footer {
  @apply absolute bottom-0 py-[30px] pl-3 border-t border-slate-300 min-w-[400px] min-h-[120px]
  text-slate-300;
}
.hero-footer p {
  // @apply ;
}
.header-nav {
  @apply flex py-[20px] justify-end space-x-3 max-w-[1200px] mx-auto;
}
</style>