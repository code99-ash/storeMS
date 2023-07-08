<template>
    <div>
        <header class="flex items-center justify-between">
            <h3 class="text-xl font-medium text-[#8D6527]">Register</h3>
        </header>
        <form class="py-[25px] space-y-3" @submit.prevent="submit">
            <div class="form-group">
                <label>Full Name</label>
                <input class="auth-inputs text-slate-600 w-full" v-model="form.name" />
            </div>
            <div class="form-group">
                <label>Email Address</label>
                <input class="auth-inputs text-slate-600 w-full" v-model="form.email" />
            </div>
            <div class="flex items-center gap-3">
                <input 
                    class="auth-inputs text-slate-600 w-1/5" 
                    type="password"
                    v-model="form.password" 
                />
                <input 
                    class="auth-inputs text-slate-600 w-1/5" 
                    type="password"
                    v-model="form.password2" 
                />
            </div>
            <button 
                class="text-teal-700 float-left bg-transparent text-sm"
                @click="$store.dispatch('auth/setAuthType', 'login')"
            >Already have an account?</button>
            <button 
                class="bg-amber-600 text-white px-[12px] py-[6px] float-right rounded" 
                :class="{'saturate-50 cursor-not-allowed': saving}"
                :disabled="saving"
            >
                {{ !saving? 'Register':'A moment' }}
                <i class="pi text-sm ml-1" :class="[saving?'pi-spin pi-spinner':'pi-lock']"></i>
            </button>
        </form>
    </div>
</template>

<script>
import { authBase } from '@/utils'
export default {
    props: ['modelValue'],
    emits: ['update:modelValue'],
    data: () => ({
        saving: false,
        form: {
            name: 'Ikhlas Oyelami',
            email: 'oyetikh1@gmail.com',
            password: 'password',
            password2: 'password',
        },
    }),
    methods: {
        clearForm() {
            this.form = { name: '', email: '', password: '', password2: '' }
        },
        async submit() {
            const { name, email, password, password2 } = this.form;
            if(!(name && email && password && password2)) {
                this.$store.dispatch('addFeedback', {
                    heading: 'Form Error',
                    variant: 'error',
                    body:  `All fields are required`,
                })
                return
            }
            else if(password !== password2) {
                this.$store.dispatch('addFeedback', {
                    heading: 'Form Error',
                    variant: 'error',
                    body:  `Passwords do not match`,
                })
                return;
            }

            this.saving = true

            try {
                const fd = new FormData();
                fd.append('name', name)
                fd.append('email', email)
                fd.append('password', password)

                const res = await this.$axios.post(`${authBase}/register`, {name, email, password});
                console.log(res)
                this.$emit('update:modelValue', 'login')
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