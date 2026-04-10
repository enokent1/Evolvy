<template>
  <div v-if="userHabits">
    <h1 class="mb-6 text-center text-2xl font-medium">{{ dateDisplayName }}</h1>
    <Calendar
      @selected-day="resolveDateDisplay($event)"
      :selected-date="selectedDate"
    />
    <div class="mx-2 flex flex-col gap-3">
      <HabitCard
        v-for="habit in filteredHabits"
        :key="habit.id"
        :habit="habit"
        :current-count="getCurrentProgress(habit.id)"
        @update-progress="(newCount) => updateProgress(habit.id, newCount)"
      />
    </div>
  </div>
  <div v-else>
    <p class="text-center text-gray-600">Loading...</p>
  </div>
</template>

<script setup lang="ts">
import HabitCard from "@/components/features/HabitCard.vue";
import Calendar from "@/components/features/WeeklyCalendar.vue";

import axios from "axios";
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
const dateDisplayName = ref<string>("Today");

const progressData = ref<Record<string, number>>({});
const selectedDate = ref<Date>(new Date());

const filteredHabits = computed(() => {
  if (!userHabits.value.length) return [];

  return userHabits.value.filter((habit) => {
    const selectedDateStr = selectedDate.value.toISOString().slice(0, 10);
    const startDateStr = habit.startDate.slice(0, 10);
    const endDateStr = habit.endDate?.slice(0, 10) || null;
    const isAfterStart = selectedDateStr >= startDateStr;
    const isBeforeEnd = !endDateStr || selectedDateStr <= endDateStr;

    return isAfterStart && isBeforeEnd;
  });
});

const loadProgress = () => {
  const saved = localStorage.getItem("habitProgress");
  if (saved) {
    progressData.value = JSON.parse(saved);
  }
};
const saveProgress = () => {
  localStorage.setItem("habitProgress", JSON.stringify(progressData.value));
};

const getCurrentProgress = (habitId: string): number => {
  const dataKey = selectedDate.value.toISOString().slice(0, 10);
  return progressData.value[`${habitId}_${dataKey}`] || 0;
};

const updateProgress = (habitId: string, newCount: number) => {
  const dataKey = selectedDate.value.toISOString().slice(0, 10);
  const key = `${habitId}_${dataKey}`;

  progressData.value[key] = newCount;
  saveProgress();
};

async function getHabits() {
  try {
    const response = await axios.get<Habit[]>(
      "https://6994c147b081bc23e9c140ad.mockapi.io/user-habits",
    );
    console.log(response.data);
    userHabits.value = response.data;
  } catch (error) {
    console.log("Error fetching user habits: ", error);
  }
}

onMounted(() => {
  getHabits();
  loadProgress();
  selectedDate.value = new Date();
});

function resolveDateDisplay(day: Date): void {
  const targetDate = new Date(day);
  const isToday = new Date().toDateString() === targetDate.toDateString();

  if (isToday) {
    dateDisplayName.value = "Today";
  } else {
    dateDisplayName.value = targetDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  }

  selectedDate.value = targetDate;
}
</script>
