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
                @click="$emit('update:modelValue', 'register')"
            >Don't have an account?</button>
            <button class="bg-amber-600 text-white px-[12px] py-[6px] float-right rounded">
                {{ !saving? 'Login':'A moment' }}
                <i class="pi text-sm ml-1" :class="[saving?'pi-spin pi-spinner':'pi-sigin']"></i>
            </button>
        </form>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import store from '@/store'
import axios from 'axios'
import { apiBase } from '@/utils'

const emit = defineEmits(['closePopup'])

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
    
    const { email, password } = form;
    if(!(email && password)) {
        store.dispatch('addFeedback', {
            heading: 'Form Error',
            variant: 'error',
            body:  `All fields are required`,
        })
        return
    }
    saving.value = true;
  try {
        const res = await axios.post(`${apiBase.auth}/login`, {email, password});
        console.log(res)
        store.dispatch('auth/setAccessToken', res.data);

        // emit('update:modelValue', 'login')
        emit('closePopup')
        store.dispatch('addFeedback', {
            heading: 'Notification',
            variant: 'success',
            body: 'Login was successful, welcome back!!',
        })
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