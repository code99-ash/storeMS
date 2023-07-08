<template>
    <div class="flex items-center gap-2">
        <nuxt-link to="/cart" class="cart-btn">
            <span class="hidden md:inline">My Cart</span> 
            <i class="pi pi-shopping-cart"></i>
            {{ $store.state.cartItems.length  }}
        </nuxt-link>
        <button class="account-btn" @click="$store.dispatch('auth/setOpenAuth', true)" v-if="!isAuthenticated">
            Login <i class="pi pi-lock"></i>
        </button>
        <button class="account-btn" @click="$store.dispatch('auth/logout')" v-else>
            Logout <i class="pi pi-sign-out"></i>
        </button>
    </div>
</template>

<script>
export default {
    computed: {
        isAuthenticated() {
            return this.$store.state.auth.loggedIn
        }
    }
}
</script>