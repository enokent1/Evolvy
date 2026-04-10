<template>
  <div class="m-2 rounded-2xl px-5 py-3">
    <div class="flex items-center justify-between">
      <button @click.stop="previousMonth">
        <AngleLeft class="size-4 hover:cursor-pointer" />
      </button>
      <span class="text-xl font-semibold">
        {{ monthName }}, {{ currentYear }}
      </span>
      <button @click.stop="nextMonth">
        <AngleRight class="size-4 hover:cursor-pointer" />
      </button>
    </div>
    <div>
      <div class="mt-2 grid grid-cols-7 gap-3">
        <span
          class="aspect-square text-center font-medium hover:cursor-default"
          v-for="dayOfWeek in daysOfWeek"
          :key="dayOfWeek"
        >
          {{ dayOfWeek }}
        </span>
        <span
          v-for="(item, i) in daysArray"
          :key="i"
          @click.stop="item.method"
          class="aspect-square text-center transition-transform hover:scale-110 hover:cursor-pointer"
          :class="{
            'text-gray-400': !item.isCurrentMonth,
            'rounded-full bg-blue-500 text-white':
              item.date.toDateString() === selectedDate.toDateString(),
          }"
        >
          {{ item.day }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AngleLeft from "@/assets/icons/AngleLeft.vue";
import AngleRight from "@/assets/icons/AngleRight.vue";
import { ref, computed, inject, watch } from "vue";

const props = defineProps<{
  defaultDate: Date;
  mode: "start" | "end";
}>();

const emit = defineEmits<{
  "selected-date": [date: Date];
}>();

type CalendarDay = {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  method: () => void;
};

const daysOfWeek: string[] = ["M", "T", "W", "T", "F", "S", "S"];

const selectedDate = ref(new Date(props.defaultDate));
const currentMonth = ref(props.defaultDate.getMonth());
const currentYear = ref(props.defaultDate.getFullYear());

watch(
  () => props.defaultDate,
  (newDate) => {
    selectedDate.value = new Date(newDate);
    currentMonth.value = newDate.getMonth();
    currentYear.value = newDate.getFullYear();
  },
);

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
      method: () => previousMonth(),
    });
  }

  for (let i = 1; i <= totalDays; i++) {
    const date = new Date(year, month, i);
    days.push({
      day: i,
      isCurrentMonth: true,
      date,
      method: () => selectDate(date),
    });
  }

  const remainingDays = 42 - days.length;

  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(year, month + 1, i);
    days.push({
      day: i,
      isCurrentMonth: false,
      date,
      method: () => nextMonth(),
    });
  }

  return days;
});

function nextMonth(): void {
  currentMonth.value = (currentMonth.value + 1) % 12;
  if (currentMonth.value === 0) {
    currentYear.value++;
  }
}

function previousMonth(): void {
  currentMonth.value = (currentMonth.value - 1 + 12) % 12;
  if (currentMonth.value === 11) {
    currentYear.value--;
  }
}

const selectDateInjected =
  inject<(date: Date | "No End Date" | null, mode: "start" | "end") => void>(
    "selected-date",
  );

function selectDate(date: Date): void {
  selectedDate.value = new Date(date);
  currentMonth.value = date.getMonth();
  currentYear.value = date.getFullYear();
  if (selectDateInjected) {
    selectDateInjected(date, props.mode);
  }
}
</script>
