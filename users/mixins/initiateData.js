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