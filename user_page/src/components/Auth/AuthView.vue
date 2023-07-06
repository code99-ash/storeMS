<template>
    <div class="modal p-3 transition-all" :class="[modelValue?'scale-100':'scale-0']">
        <div class="modal-card w-full max-w-[600px] relative">
            <i 
                class="pi pi-times text-lg absolute top-5 right-5 text-slate-400 cursor-pointer" 
                @click="$emit('update:modelValue', false)"
            ></i>
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

</script>

<style lang="scss">
.modal {
    @apply fixed top-0 left-0 bg-[#000e06cf] w-full h-[100vh] flex items-center justify-center z-[30];

    .modal-card {
        @apply bg-white border border-[#9F9696] rounded p-[15px];
    }
}

.auth-inputs {
    @apply h-[38px] border border-[#CFC5C5] rounded-sm p-2 pl-3 outline-0 bg-[#F5F5F5]
    text-sm;
}
</style>