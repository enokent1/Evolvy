<template>
  <div>
    <h1 class="mb-6 text-center text-2xl font-medium">Calendar</h1>
    <div class="m-2 rounded-2xl bg-gray-200 px-5 py-3">
      <div class="flex items-center justify-between">
        <button @click="previousMonth"><AngleLeft class="size-4" /></button>
        <span class="text-xl font-semibold">
          {{ monthName }}, {{ currentYear }}
        </span>
        <button @click="nextMonth"><AngleRight class="size-4" /></button>
      </div>
      <div>
        <div class="mt-2 grid grid-cols-7 gap-3">
          <span
            class="text-center font-medium"
            v-for="dayOfWeek in daysOfWeek"
            :key="dayOfWeek"
          >
            {{ dayOfWeek }}
          </span>
          <span
            v-for="(item, i) in daysArray"
            :key="i"
            class="text-center"
            :class="{
              'text-gray-400': !item.isCurrentMonth,
              'rounded-full bg-blue-500 text-white':
                item.date.toDateString() === today.toDateString(),
            }"
          >
            {{ item.day }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AngleLeft from "@/assets/icons/AngleLeft.vue";
import AngleRight from "@/assets/icons/AngleRight.vue";
import { ref, computed } from "vue";

type CalendarDay = {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
};

const daysOfWeek: string[] = ["M", "T", "W", "T", "F", "S", "S"];

const currentDate = ref(new Date());
const today = new Date();

today.setHours(0, 0, 0, 0);

const currentMonth = computed(() => currentDate.value.getMonth());
const currentYear = computed(() => currentDate.value.getFullYear());

const monthName = computed<string>(() => {
  const date = new Date(currentYear.value, currentMonth.value);
  return date.toLocaleString("en-US", { month: "long" });
});

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const daysArray = computed<CalendarDay[]>(() => {
  const year = currentYear.value;
  const month = currentMonth.value;

  const totalDays = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const previousMonthDays = getDaysInMonth(year, month - 1);

  const days: CalendarDay[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    const date = new Date(year, month - 1, previousMonthDays - i);
    days.push({
      day: previousMonthDays - i,
      isCurrentMonth: false,
      date,
    });
  }

  for (let i = 1; i <= totalDays; i++) {
    const date = new Date(year, month, i);
    days.push({
      day: i,
      isCurrentMonth: true,
      date,
    });
  }

  const remainingDays = 42 - days.length;

  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(year, month + 1, i);
    days.push({
      day: i,
      isCurrentMonth: false,
      date,
    });
  }

  return days;
});

function nextMonth() {
  currentDate.value = new Date(currentYear.value, currentMonth.value + 1, 1);
}

function previousMonth() {
  currentDate.value = new Date(currentYear.value, currentMonth.value - 1, 1);
}
</script>
