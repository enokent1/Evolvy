<template>
    <modal-wrapper>
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
    </modal-wrapper>
</template>

<script setup>
import { useColorStore } from '@/stores/colorStore';
import ModalWrapper from '@/components/wrappers/ModalWrapper.vue';

const colorStore = useColorStore()
</script>

<style scoped>

</style>