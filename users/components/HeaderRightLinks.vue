<template>
    <div class="flex items-center gap-2">
        <div class="flex">
            <nuxt-link to="/order-history" class="cart-btn" v-if="$store.state.auth.loggedIn">
                <i class="pi pi-shopping-cart mx-1 md:mx-0"></i>
                <span class="hidden md:inline">My Orders</span> 
            </nuxt-link>
            <nuxt-link to="/cart" class="cart-btn">
                <span class="hidden md:inline">My Cart</span> 
                <i class="pi pi-shopping-bag"></i>
                {{ $store.state.cartItems.length  }}
            </nuxt-link>
        </div>
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