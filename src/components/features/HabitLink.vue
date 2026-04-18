<template>
  <RouterLink :to="`/habits/${habit.id}`">
    <div
      class="flex items-center justify-between rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm"
    >
      <div class="flex items-center gap-3">
        <span class="text-2xl">{{ habit.icon }}</span>
        <span>{{ habit.title }}</span>
      </div>
      <Plus class="size-5 text-gray-400 transition hover:text-gray-800" />
    </div>
  </RouterLink>
</template>

<script setup>
import Plus from "@/assets/icons/Plus.vue";

const props = defineProps({
  habit: {
    type: Object,
    required: true,
  },
});
</script>
