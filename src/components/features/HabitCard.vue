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
    <button
      v-if="currentCount !== habit.target"
      @click.prevent="addCount"
      class="hover:cursor-pointer"
    >
      <Add class="size-5" />
    </button>
    <span v-else class="z-10 flex items-center justify-center">
      <Check class="size-4" />
    </span>
  </div>
</template>

<script setup lang="ts">
import Add from "@/assets/icons/Add.vue";
import Check from "@/assets/icons/Check.vue";
import { useColorStore } from "@/stores/colorStore";
import { ref, computed, watch, onMounted } from "vue";

type Habit = {
  id: string;
  icon: string;
  title: string;
  description?: string;
  group: "Health" | "Productivity" | "Sport";
  color: string;
  target: number;
  unit:
    | "times"
    | "steps"
    | "m"
    | "km"
    | "ml"
    | "l"
    | "g"
    | "mg"
    | "sec"
    | "min"
    | "hr";
  trackingType: "count";
  startDate: string;
  endDate: string | null;
};

const props = defineProps<{
  habit: Habit;
  selectedDate?: Date;
}>();

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

const colorStore = useColorStore();
const colorData = computed(() => colorStore.getColorData(props.habit.color));

function addCount() {
  if (currentCount.value < props.habit.target) {
    currentCount.value++;
  }
}

const fillPercentage = computed(() => {
  return (currentCount.value / props.habit.target) * 100;
});

watch(currentCount, saveProgress);
watch(() => props.selectedDate, loadProgress, { immediate: true });

onMounted(loadProgress);
</script>
