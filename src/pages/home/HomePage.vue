<template>
  <div v-if="userHabits">
    <h1 class="mb-6 text-center text-2xl font-medium">Today</h1>
    <div class="mx-2 flex flex-col gap-3">
      <HabitCard
        v-for="habit in filteredHabits"
        :key="habit.id"
        :habit="habit"
      />
    </div>
  </div>
  <div v-else>
    <p class="text-center text-gray-600">Loading...</p>
  </div>
</template>

<script setup lang="ts">
import HabitCard from "@/components/features/HabitCard.vue";

import { habitsApi } from "@/api/habits";
import { ref, onMounted, computed } from "vue";

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
  periodicity: "day" | "week" | "month";
  startDate: string;
  endDate: string | null;
};

const userHabits = ref<Habit[]>([]);

const getLocalDateKey = (date: Date | string): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const filteredHabits = computed(() => {
  if (!userHabits.value.length) return [];

  const todayKey = getLocalDateKey(new Date());

  return userHabits.value.filter((habit) => {
    const startDateKey = getLocalDateKey(habit.startDate);
    const endDateKey = habit.endDate ? getLocalDateKey(habit.endDate) : null;
    const isAfterStart = todayKey >= startDateKey;
    const isBeforeEnd = !endDateKey || todayKey <= endDateKey;

    return isAfterStart && isBeforeEnd;
  });
});

async function getHabits() {
  try {
    const response = await habitsApi.getAllUserHabits();
    console.log(response.data);
    userHabits.value = response.data;
  } catch (error) {
    console.log("Error fetching user habits: ", error);
  }
}

onMounted(() => {
  getHabits();
});
</script>
