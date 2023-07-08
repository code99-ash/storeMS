<template>
    <div>
        <header class="flex items-center justify-between">
            <h3 class="text-xl font-medium text-[#8D6527]">Login</h3>
        </header>
        <form class="py-[25px] space-y-3" @submit.prevent="submit">
            <div class="form-group">
                <label>Email Address</label>
                <input class="auth-inputs text-slate-600 w-full" v-model="form.email" />
            </div>
            <div class="form-group">
                <label>Password</label>
                <input class="auth-inputs text-slate-600 w-full" v-model="form.password" />
            </div>
            <button 
                class="text-teal-700 float-left bg-transparent text-sm"
                @click="$store.dispatch('auth/setAuthType', 'register')"
            >Don't have an account?</button>
            <button class="bg-amber-600 text-white px-[12px] py-[6px] float-right rounded">
                {{ !saving? 'Login':'A moment' }}
                <i class="pi text-sm ml-1" :class="[saving?'pi-spin pi-spinner':'pi-sigin']"></i>
            </button>
        </form>
    </div>
</template>

<script>
import { authBase } from '@/utils'
export default {
    data: () => ({
        saving: false,
        form: {
            email: 'oyetikh1@gmail.com',
            password: 'password',
        },
    }),
    methods: {
        clearForm() {
            this.form = { email: '', password: '' }
        },
        async submit() {
            const { email, password } = this.form;
            if(!(email && password)) {
                this.$store.dispatch('addFeedback', {
                    heading: 'Form Error',
                    variant: 'error',
                    body:  `All fields are required`,
                })
                return
            }
            this.saving = true;

            try {
                const res = await this.$axios.post(`${authBase}/login`, {email, password});
                console.log(res)
                this.$store.dispatch('auth/setAccessToken', res.data);

                // emit('update:modelValue', 'login')
                this.$store.dispatch('auth/setOpenAuth')
                this.$store.dispatch('addFeedback', {
                    heading: 'Notification',
                    variant: 'success',
                    body: 'Login was successful, welcome back!!',
                })
            } catch(err) {
                console.log('Error saving product', err)
                this.$store.dispatch('addFeedback', {
                    heading: 'Error Alert',
                    variant: 'error',
                    body: err.response.data ?? 'An error occured',
                })
            }
            this.saving = false;
        }
    }
}

</script>