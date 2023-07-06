<template>
    <section>
        <header class="w-full fixed z-50 p-3 md:p-0">
            <nav class="header-nav">
                <nuxt-link to="/cart" class="cart-btn">
                View Cart <i class="pi pi-shopping-cart"></i>
                </nuxt-link>
                <button class="account-btn" @click="$store.dispatch('auth/setOpenAuth', true)">
                Login <i class="pi pi-lock"></i>
                </button>
            </nav>
        </header>
        <section class="">
            <Transition name="fade">
                <nuxt />
            </Transition>
        </section>
        <AuthView v-if="$store.state.auth.authType == 'login'">
            <login-view></login-view>
        </AuthView>
        <AuthView v-else>
            <register-view></register-view>
        </AuthView>

        <div class="w-[300px] h-max p-2 space-y-2 z-[50] fixed top-0 right-0 mt-[65px]">
            <TransitionGroup name="list">
                <feedback-item :feedback="f" v-for="f in $store.state.feedbacks" :key="f.id"></feedback-item>
            </TransitionGroup>
        </div>
    </section>
</template>

<script>
import AuthView from '~/components/Auth/AuthView.vue';
import RegisterView from '~/components/Auth/RegisterView.vue';
import LoginView from '~/components/Auth/LoginView.vue';
import FeedbackItem from '@/components/Feedbacks/FeedbackItem.vue'

export default {
    components: { AuthView, RegisterView, LoginView, FeedbackItem },
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

<style scoped>
.header-nav {
  @apply flex py-[20px] justify-end space-x-3 max-w-[1200px] mx-auto;
}
</style>