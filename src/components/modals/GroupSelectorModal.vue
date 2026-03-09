<template>
    <div class="absolute inset-0 flex items-center justify-center"
        @click="$emit('closeModal')"
    >
        <div class="flex flex-col gap-5 border border-amber-50 bg-amber-50/20 backdrop-blur-md p-5 rounded-3xl mx-20 w-full">
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
    </div>
</template>

<script setup>
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
