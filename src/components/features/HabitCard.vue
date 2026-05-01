<template>
  <div
    class="relative flex justify-between overflow-hidden rounded-lg p-2 pr-4"
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
    <div class="flex items-center">
      <Transition name="slide">
        <AddCounter
          v-show="showCounter"
          class="z-10 mr-1"
          :max-value="habit.target"
          @add-count="addCount($event)"
        />
      </Transition>
      <button
        v-if="currentCount !== habit.target"
        @click.prevent="showCounter = !showCounter"
        class="hover:cursor-pointer"
      >
        <SvgIcon
          name="plus-circle"
          class="size-5 transition-all"
          :class="{ 'rotate-45': showCounter }"
        />
      </button>
      <span v-else class="z-10 flex items-center justify-center">
        <SvgIcon name="check" class="size-4" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import AddCounter from "./AddCounter.vue";
import SvgIcon from "@/assets/icons/SvgIcon.vue";
import { getColorData } from "@/utils/colors/colorHelpers";
import { ref, computed, watch, onMounted } from "vue";
import { Habit } from "@/types";

const props = defineProps<{
  habit: Habit;
  selectedDate?: Date;
}>();

const showCounter = ref<boolean>(false);

const currentCount = ref<number>(0);
const progressKey = computed(() => {
  const date = props.selectedDate ? new Date(props.selectedDate) : new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dateKey = `${year}-${month}-${day}`;
  return `${props.habit.id}_${dateKey}`;
});

const progressStoreKey = "habitProgress";

const loadProgress = () => {
  const saved = localStorage.getItem(progressStoreKey);
  if (!saved) {
    currentCount.value = 0;
    return;
  }

  try {
    const data = JSON.parse(saved) as Record<string, number>;
    currentCount.value = data[progressKey.value] || 0;
  } catch {
    currentCount.value = 0;
  }
};

const saveProgress = () => {
  const saved = localStorage.getItem(progressStoreKey);
  const data = saved ? (JSON.parse(saved) as Record<string, number>) : {};
  data[progressKey.value] = currentCount.value;
  localStorage.setItem(progressStoreKey, JSON.stringify(data));
};

const colorData = computed(() => getColorData(props.habit.color));

function addCount(value: number) {
  if (currentCount.value < props.habit.target && value !== null) {
    if (currentCount.value + value > props.habit.target) {
      currentCount.value = props.habit.target;
    } else {
      currentCount.value += value;
    }
    showCounter.value = false;
  }
}

const fillPercentage = computed(() => {
  return (currentCount.value / props.habit.target) * 100;
});

watch(currentCount, saveProgress);
watch(() => props.selectedDate, loadProgress, { immediate: true });

onMounted(loadProgress);
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateY(50%);
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(-50%);
}

.slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
