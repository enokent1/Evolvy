<template>
  <div
    class="relative flex justify-between overflow-hidden rounded-lg p-2"
    :class="colorData.bgLightClass"
  >
    <div
      class="absolute top-0 left-0 h-full transition-all duration-300"
      :class="colorData.bgClass"
      :style="{ width: fillPercentage + `%` }"
    ></div>
    <div class="z-10 flex items-stretch gap-5">
      <div
        class="flex w-10 items-center justify-center rounded-lg"
        :class="colorData.bgLightClass"
      >
        <span class="text-xl">{{ habit.icon }}</span>
      </div>
      <div>
        <h2 class="font-medium">{{ habit.title }}</h2>
        <span
          class="rounded-lg border px-3 py-0.5 text-sm"
          :class="[colorData.borderClass, colorData.bgLightClass]"
        >
          {{ currentCount }} / {{ habit.target }} {{ habit.unit }}
        </span>
      </div>
    </div>
    <button class="rounded-lg bg-gray-200 p-2" @click.prevent="addCound">
      +
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  habit: {
    type: Object,
    required: true,
  },
});

import { useColorStore } from "@/stores/colorStore";
import { ref, computed } from "vue";

const colorStore = useColorStore();
const colorData = computed(() => colorStore.getColorData(props.habit.color));

const currentCount = ref<number>(0);

function addCound() {
  if (currentCount.value < props.habit.target) {
    currentCount.value++;
  }
}

const fillPercentage = computed(() => {
  return (currentCount.value / props.habit.target) * 100;
});
</script>
