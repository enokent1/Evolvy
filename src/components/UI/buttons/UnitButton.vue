<template>
    <button class="bg-gray-200 border border-gray-400 text-sm p-3 rounded-xl">
        {{ unit }}
    </button>
</template>

<script setup>
const props = defineProps({
    unit: {
        type: String,
        default: 'times'
    }
})
</script>

<script>
export default {
    name: 'unit-button'
}
</script>
