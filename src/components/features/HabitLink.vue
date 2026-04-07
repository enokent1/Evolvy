<template>
  <RouterLink :to="`/habits/${habit.id}`">
    <div
      class="flex items-center justify-between rounded-full bg-gray-200 px-4 py-2"
    >
      <div class="flex items-center gap-3">
        <span class="text-2xl">{{ habit.icon }}</span>
        <span>{{ habit.title }}</span>
      </div>
      <component :is="HeartIcon" class="size-6 text-gray-500" />
    </div>
  </RouterLink>
</template>

<script setup>
import HeartIcon from "@/assets/icons/HeartIcon.vue";

const props = defineProps({
  habit: {
    type: Object,
    required: true,
  },
});
</script>
