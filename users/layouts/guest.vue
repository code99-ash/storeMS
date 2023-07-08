<template>
    <section>
        <div class="header bg-white">
            <nav class="header-nav">
                <router-link to="/" class="text-[#7C3100] font-medium text-3xl">Classilicious</router-link>
                <div class="flex items-center gap-x-5">
                    <header-right-links></header-right-links>
                </div>
            </nav>
        </div>

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

        <section class="">
            <Transition name="fade">
                <nuxt />
            </Transition>
        </section>
    </section>
</template>

<script>
import HeaderRightLinks from '@/components/HeaderRightLinks'
import initiateData from '@/mixins/initiateData'
import AuthView from '~/components/Auth/AuthView.vue';
import RegisterView from '~/components/Auth/RegisterView.vue';
import LoginView from '~/components/Auth/LoginView.vue';
import FeedbackItem from '@/components/Feedbacks/FeedbackItem.vue'

export default {
    components: { AuthView, RegisterView, LoginView, FeedbackItem, HeaderRightLinks },
    mixins: [initiateData]
}
</script>

<style scoped>
.header-nav {
  @apply py-[20px] flex items-center justify-between space-x-3 max-w-[1200px] mx-auto px-3 xl:px-0;
}
</style>