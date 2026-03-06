<template>
    <div class="fixed inset-0  flex items-center justify-center" @click="$emit('closeModal')">
        <div class="border border-amber-50 bg-amber-50/20 backdrop-blur-md p-4 rounded-3xl">
            <div class="grid grid-cols-5 gap-4">
                <button 
                    v-for="colorKey in colorStore.availableColors"
                    :key="colorKey"
                    class="w-10 h-10 rounded-full"
                    :class="colorStore.colorMap[colorKey].bgClass"
                    @click="$emit('selectedColor', colorKey)"
                >
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useColorStore } from '@/stores/colorStore';

const colorStore = useColorStore();
</script>

<style scoped>

</style>