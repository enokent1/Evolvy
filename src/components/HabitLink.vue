<template>
    <RouterLink :to="`/habits/${habit.id}`">
        <div class="flex justify-between items-center rounded-full bg-gray-950 px-4 py-2">
            <div class="flex items-center gap-3">
                <span class="text-2xl">{{ habit.icon }}</span>
                <span class="text-white">{{ habit.title }}</span>
            </div>
            <component :is="HeartIcon" class="size-6 text-white"/>
        </div>
    </RouterLink>
</template>

<script setup>
import HeartIcon from '@/assets/icons/HeartIcon.vue';

const props = defineProps({
    habit: {
        type: Object,
        required: true
    }
})
</script>
