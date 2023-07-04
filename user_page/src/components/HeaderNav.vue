<template>
    <div class="header bg-white">
      <nav class="container p-[20px] flex justify-between">
        <router-link to="/" class="text-[#7C3100] font-medium text-3xl">Classilicious</router-link>
          <nav class="flex items-center gap-x-5">
            <router-link :to="{name: 'Cart'}" class="cart-btn">
              View Cart <i class="pi pi-shopping-cart"></i>
            </router-link>
            <router-link to="/" class="account-btn">
              Login <i class="pi pi-lock"></i>
            </router-link>
        </nav>
      </nav>
    </div>
</template>