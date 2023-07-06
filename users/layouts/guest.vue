<template>
    <section>
        <div class="header bg-white">
            <nav class="container p-[20px] flex justify-between">
                <router-link to="/" class="text-[#7C3100] font-medium text-3xl">Classilicious</router-link>
                <nav class="flex items-center gap-x-5">
                    <router-link to="/cart" class="cart-btn">
                    View Cart <i class="pi pi-shopping-cart"></i>
                    </router-link>
                    <button class="account-btn" @click="$store.dispatch('auth/setOpenAuth', true)">
                    Login <i class="pi pi-lock"></i>
                    </button>
                </nav>
            </nav>
        </div>
        <section class="">
            <Transition name="fade">
                <nuxt />
            </Transition>
        </section>
    </section>
</template>

<script>
export default {
    mounted() {
        this.initFetch()
    },
    methods: {
        async initFetch() {
            await this.$store.dispatch('fetchProducts')
            await this.$store.dispatch('getCartItems')
        }
    }
}
</script>