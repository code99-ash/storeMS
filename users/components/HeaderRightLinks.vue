<template>
    <div class="flex items-center gap-2">
        <nuxt-link to="/cart" class="cart-btn">
            <span class="hidden md:inline">My Cart</span> 
            <i class="pi pi-shopping-cart"></i>
            {{ $store.state.cartItems.length  }}
        </nuxt-link>
        <button class="account-btn" @click="$store.dispatch('auth/setOpenAuth', true)">
            Login <i class="pi pi-lock"></i>
        </button>
    </div>
</template>

<script>

</script>