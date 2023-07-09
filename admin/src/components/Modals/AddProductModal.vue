<template>
    <div class="modal p-3 transition-all" :class="[modelValue?'scale-100':'scale-0']">
        <div class="modal-card w-full max-w-[600px]">
            <header class="flex items-center justify-between">
                <h3 class="text-xl font-medium text-[#8D6527]">
                    <span class="text-slate-500">New</span> Snacks & Treats
                </h3>
                <i 
                    class="pi pi-times text-lg text-slate-400 cursor-pointer"
                    @click="$emit('update:modelValue', false)"
                ></i>
            </header>
            <input type="file" ref="file" @change="handleFileChange($event)" class="hidden" />
            <form class="py-[25px] space-y-3" @submit.prevent="saveProduct">
                <div class="add-inputs text-slate-400 w-full cursor-pointer ellipsis" @click="$refs.file.click()">
                    {{ form.file.name ?? 'Upload image (png, jpg, jpeg)' }}
                </div>
                <input class="add-inputs text-slate-600 w-full" placeholder="Product title" v-model="form.title" />
                <div class="flex items-center gap-3">
                    <input 
                        class="add-inputs text-slate-600 w-1/5" 
                        type="number"
                        :min="1"
                        v-model="form.price" 
                        placeholder="Quantity Avail" />
                    <input 
                        class="add-inputs text-slate-600 w-1/5" 
                        type="number"
                        :min="1"
                        v-model="form.quantity" 
                        placeholder="Price" />
                </div>
                <button class="bg-amber-600 text-white px-[12px] py-[6px] float-right rounded">
                    {{ !saving? 'Save':'Saving' }}
                    <i class="pi text-sm ml-1" :class="[saving?'pi-spin pi-spinner':'pi-save']"></i>
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import store from '@/store'
// import axios from 'axios'
import axios from '@/axios-interceptor'

import { apiBase } from '@/utils'

defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const saving = ref(false)

const form = reactive({
    file: {name: null},
    title: 'Hut Sushi Pizza',
    price: 100,
    quantity: 1
})

const clearForm = () => {
    form.file = {name: null},
    form.title = 'Hut Sushi Pizza'
    form.price = 100
    form.quantity = 1
}

const handleFileChange = (e) => {
    const allowed = ['image/png', 'image/jpg', 'image/jpeg'];

    if(!allowed.includes(e.target.files[0]['type'])) {
        store.dispatch('addFeedback', {
            heading: 'File Selection Warning',
            variant: 'warning',
            body:  `Only image files of jpg, png, jpeg is allowed`,
        })

        return
    }
    form.file = e.target.files[0]
}

const saveProduct = async() => {
    
    const { file, title, price, quantity } = form;
    if(!(file.name && title && price > 0 && quantity > 0)) {
        store.dispatch('addFeedback', {
            heading: 'Form Error',
            variant: 'error',
            body:  `All fields are required`,
        })
        return
    }
    saving.value = true;
  try {
        const fd = new FormData();
        fd.append('title', title)
        fd.append('price', price)
        fd.append('qtyAvailable', quantity)
        fd.append('files', file)

        const res = await axios.post(`${apiBase.central}/products`, fd, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log(res.data)

        await store.dispatch('products/addProduct', res.data)
        store.dispatch('addFeedback', {
            heading: 'Success Alert',
            variant: 'success',
            body: 'Successfully created new products !!',
        })
        clearForm()
        emit('update:modelValue', false)
    } catch(err) {
        console.log('Error saving product', err)
        store.dispatch('addFeedback', {
            heading: 'Error Alert',
            variant: 'error',
            body: err.response.data ?? 'Error saving new products',
        })
    }
    saving.value = false;
}

</script>

<style lang="scss" scoped>
.modal {
    @apply fixed top-0 left-0 bg-[#000e06cf] w-full h-[100vh] flex items-center justify-center z-[30];

    .modal-card {
        @apply bg-white border border-[#9F9696] rounded p-[15px];
    }
}

.add-inputs {
    @apply h-[38px] border border-[#CFC5C5] rounded-sm p-2 pl-3 outline-0 bg-[#F5F5F5]
    text-sm;
}
</style>