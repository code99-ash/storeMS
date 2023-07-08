export default {
    mounted() {
        this.initFetch()
    },
    methods: {
        async initFetch() {
            console.log(this.$store.state.auth.accessToken)
            if(this.$store.state.auth.accessToken == '') {
                const token = localStorage.getItem('auth-token');
                if(token) {
                    await this.$store.dispatch('auth/userRequest', token);
                }
            }
            await this.$store.dispatch('fetchProducts')
            await this.$store.dispatch('getCartItems')
        },
    }
}