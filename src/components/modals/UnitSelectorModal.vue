<template>
    <modal-wrapper>
        <div class="flex flex-col gap-3 items-center">
            <h2 class="font-medium">Select Unit</h2>
            <div class="grid grid-cols-4 gap-4">
                <unit-button 
                    v-for="unit in units" 
                    :key="unit"
                    :unit="unit"
                    @click="$emit('selectedUnit', unit)"
                />
            </div>
        </div>
    </modal-wrapper>
</template>

<script setup>
import ModalWrapper from '../wrappers/ModalWrapper.vue';

const units = [
    'times',
    'steps',
    'm',
    'km',
    'ml',
    'l',
    'g',
    'mg',
    'sec',
    'min',
    'hr'
]
</script>
