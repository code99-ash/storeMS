<template>
  <div class="home">
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
        <product-card
          v-for="p in $store.state.products" 
          :key="p._id" :product="p"
        ></product-card>

      </div>
    </section>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';
export default {
  components: { ProductCard }
}

</script>


<style scoped>
.hero-banner {
  background: url('/images/hero-banner.png');
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
</style>