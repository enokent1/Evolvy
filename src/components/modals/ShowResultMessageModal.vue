<template>
    <div class="fixed inset-0  flex items-center justify-center" @click="$emit('closeModal')">
        <div 
            v-if="type === 'success'"
            class="flex flex-col items-center border-2 border-green-400 bg-green-300/30 backdrop-blur-md p-6 rounded-3xl"
        >
            <h2 class="font-medium text-xl">{{ message }}</h2>
            <button
                class="mt-4 px-5 py-3 bg-white rounded-full"
                @click="$emit('routerBack')"
            >
                Go back to habits
            </button>
        </div>
        <div 
            v-else
            class="flex flex-col items-center border-2 border-red-400 bg-red-300/30 backdrop-blur-md p-6 rounded-3xl"
        >
            <h2 class="font-medium text-xl">{{ message }}</h2>
            <button
                class="mt-4 px-5 py-3 bg-white rounded-full"
                @click="$emit('closeModal')"
            >
                Try again
            </button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    type: {
        type: String,
        required: true
    }, 
    message: {
        type: String,
        required: true
    }
})
</script>