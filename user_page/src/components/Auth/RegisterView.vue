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
                @click="$emit('update:modelValue', 'login')"
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

<script setup>
import { reactive, ref } from 'vue'
import store from '@/store'
import axios from 'axios'
import { apiBase } from '@/utils'

defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const saving = ref(false)

const form = reactive({
    name: 'Ikhlas Oyelami',
    email: 'oyetikh1@gmail.com',
    password: 'password',
    password2: 'password',
})

const clearForm = () => {
    form.name = 'Ikhlas Oyelami'
    form.email = 'oyetikh1@gmail.com'
    form.password = 'password'
    form.password2 = 'password'
}

const submit = async() => {
    
    const { name, email, password, password2 } = form;
    if(!(name && email && password && password2)) {
        store.dispatch('addFeedback', {
            heading: 'Form Error',
            variant: 'error',
            body:  `All fields are required`,
        })
        return
    }
    else if(password !== password2) {
        store.dispatch('addFeedback', {
            heading: 'Form Error',
            variant: 'error',
            body:  `Passwords do not match`,
        })
        return;
    }
    saving.value = true;
  try {
        const fd = new FormData();
        fd.append('name', name)
        fd.append('email', email)
        fd.append('password', password)

        const res = await axios.post(`${apiBase.auth}/register`, {name, email, password});
        console.log(res)
        emit('update:modelValue', 'login')
    } catch(err) {
        console.log('Error saving product', err)
        store.dispatch('addFeedback', {
            heading: 'Error Alert',
            variant: 'error',
            body: err.response.data ?? 'An error occured',
        })
    }
    saving.value = false;
}

</script>