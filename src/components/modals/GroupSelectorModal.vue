<template>
    <modal-wrapper>
        <div class="flex flex-col gap-6 w-60">
            <button 
                v-for="group in groups"
                :key="group.id"
                class="p-2 border rounded-full w-full text-center"
                :class="group.name === defaultGroup ? [color, 'border-2'] : 'border-gray-300'"
                @click.prevent="$emit('selected-group', group.name)"
            >
                {{ group.name }}
            </button>
        </div>
    </modal-wrapper>
</template>

<script setup>
import ModalWrapper from '../wrappers/ModalWrapper.vue';

const props = defineProps({
    defaultGroup: {
        type: String,
        default: 'No Group'
    },
    color: {
        type: String,
        default: 'border-blue-500'
    }
})

const groups = [
    { id: 1, name: 'Health' },
    { id: 2, name: 'Productivity' },
    { id: 3, name: 'Sport' },
]

</script>
