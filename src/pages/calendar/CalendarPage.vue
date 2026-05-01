<template>
  <div class="px-3">
    <h1 class="mb-6 text-center text-2xl font-medium">Calendar</h1>
    <section
      class="rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm"
    >
      <div class="flex items-center justify-between">
        <button @click="previousMonth">
          <SvgIcon name="chevron-left" class="size-4" />
        </button>
        <span class="text-xl font-semibold">
          {{ monthName }}, {{ currentYear }}
        </span>
        <button @click="nextMonth">
          <SvgIcon name="chevron-right" class="size-4" />
        </button>
      </div>
      <div>
        <div class="mt-2 grid grid-cols-7 gap-3">
          <span
            class="text-center font-medium"
            v-for="weekDay in weekDayLabelsShort"
            :key="weekDay"
          >
            {{ weekDay }}
          </span>
          <button
            v-for="calendarDay in daysArray"
            :key="calendarDay.day"
            @click="calendarDay.onClick"
            class="flex aspect-square items-center justify-center text-center"
            :class="{
              'text-gray-400': !calendarDay.isCurrentMonth,
              'rounded-full border border-orange-400':
                calendarDay.date.toDateString() === today.toDateString(),
              'rounded-full bg-blue-400 text-white':
                calendarDay.date.toDateString() === selectedDate.toDateString(),
            }"
          >
            {{ calendarDay.day }}
          </button>
        </div>
      </div>
    </section>
    <div class="mt-3 flex flex-col gap-3">
      <HabitCard
        v-for="habit in filteredHabits"
        :key="habit.id"
        :habit="habit"
        :selected-date="selectedDate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import HabitCard from "@/components/features/HabitCard.vue";
import SvgIcon from "@/assets/icons/SvgIcon.vue";
import { ref, computed, onMounted } from "vue";
import { habitsApi } from "@/api/habits";
import { Habit, CalendarDay } from "@/types";

const userHabits = ref<Habit[]>([]);

const weekDayLabelsShort: string[] = ["M", "T", "W", "T", "F", "S", "S"];

const currentDate = ref(new Date());
const selectedDate = ref(new Date());
const today = new Date();

const filteredHabits = computed<Habit[]>(() => {
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

today.setHours(0, 0, 0, 0);

const currentMonth = computed<number>(() => currentDate.value.getMonth());
const currentYear = computed<number>(() => currentDate.value.getFullYear());

const monthName = computed<string>(() => {
  const date = new Date(currentYear.value, currentMonth.value);
  return date.toLocaleString("en-US", { month: "long" });
});

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

const daysArray = computed<CalendarDay[]>(() => {
  const year = currentYear.value;
  const month = currentMonth.value;

  const totalDays = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const daysInPreviousMonth = getDaysInMonth(year, month - 1);

  const days: CalendarDay[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    const date = new Date(year, month - 1, daysInPreviousMonth - i);
    days.push({
      day: daysInPreviousMonth - i,
      isCurrentMonth: false,
      date,
      onClick: () => previousMonth(),
    });
  }

  for (let i = 1; i <= totalDays; i++) {
    const date = new Date(year, month, i);
    days.push({
      day: i,
      isCurrentMonth: true,
      date,
      onClick: () => selectDate(date),
    });
  }

  const daysInNextMonth = 42 - days.length;

  for (let i = 1; i <= daysInNextMonth; i++) {
    const date = new Date(year, month + 1, i);
    days.push({
      day: i,
      isCurrentMonth: false,
      date,
      onClick: () => nextMonth(),
    });
  }

  return days;
});

function nextMonth():void {
  currentDate.value = new Date(currentYear.value, currentMonth.value + 1, 1);
}

function previousMonth():void {
  currentDate.value = new Date(currentYear.value, currentMonth.value - 1, 1);
}

function selectDate(date: Date): void {
  selectedDate.value = new Date(date);
}

async function getHabits(): Promise<void> {
  try {
    const response = await habitsApi.getAllUserHabits();
    userHabits.value = response.data;
    console.log("Data fetched successfully: ", response);
  } catch (error) {
    console.log("Error fetching user habits: ", error);
  }
}

onMounted(() => {
  getHabits();
});
</script>
