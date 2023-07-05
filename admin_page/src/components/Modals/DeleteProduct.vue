<template>
    <div class="modal p-3 transition-all" :class="[modelValue?'scale-100':'scale-0']">
        <div class="modal-card w-full max-w-[400px]">
            <header class="flex items-center justify-between p-3">
                <h3 class="text-xl font-medium text-red-500">
                    Confirm Delete
                </h3>
                <i 
                    class="pi pi-times text-lg text-slate-400 cursor-pointer"
                    @click="$emit('update:modelValue', false)"
                ></i>
            </header>
            <div class="p-3 text-sm text-slate-400 border-y border-slate-200 p-[15px]">
                <p>Are you sure you want to Delete this item? You won't be able to rollback.</p>
            </div>
            <footer class="p-3 flex justify-end gap-3 p-3">
                <button class="outline-btn" @click="$emit('update:modelValue', false)">Cancel</button>
                <button 
                    class="regular-btn" 
                    :class="{'cursor-not-allowed': loading}"
                    @click="$emit('confirmOperation')"
                >
                    {{ !loading? 'Confirm':'Wait' }}
                    <i class="pi pi-spin pi-spinner text-[9px]" v-if="loading"></i>
                </button>
            </footer>
        </div>
    </div>
</template>

<script setup>
defineProps(['modelValue', 'loading'])
defineEmits(['update:modelValue'])

</script>

<style lang="scss" scoped>
.modal {
    @apply fixed top-0 left-0 bg-[#000e06cf] w-full h-[100vh] flex items-center justify-center z-[30];

    .modal-card {
        @apply bg-white border border-[#9F9696] rounded;
    }
}

.add-inputs {
    @apply h-[38px] border border-[#CFC5C5] rounded-sm p-2 pl-3 outline-0 bg-[#F5F5F5]
    text-sm;
}

.outline-btn {
    @apply px-[10px] py-[6px] rounded border border-red-400 text-red-500 text-sm 
    transition-all hover:pr-4;
}
.regular-btn {
    @apply px-[10px] py-[6px] rounded border border-red-500 text-white bg-red-500 text-sm 
    transition-all hover:pl-4;
}
</style>