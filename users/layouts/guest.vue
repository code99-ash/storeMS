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

export default {
    components: { HeaderRightLinks },
    mixins: [initiateData]
}
</script>

<style scoped>
.header-nav {
  @apply py-[20px] flex items-center justify-between space-x-3 max-w-[1200px] mx-auto px-3 xl:px-0;
}
</style>