<template>
    <div class="w-full mb-5">
        <div class="flex justify-around w-full">
            <button @click="prevWeek">
                <AngleLeft class="size-5"/>
            </button>
            <div
                class="flex gap-2 overflow-x-hidden w-84"
                ref="weekStrip"
            >
                <div
                    v-for="day in extendedWeekDates"
                    :key="day.iso"
                    class="flex flex-col items-center gap-2 p-2 rounded-full w-10 shrink-0"
                    :class="{'bg-linear-to-r from-emerald-500 to-teal-500 text-white': isSelected(day) }"
                    @click="selectDay(day), $emit('selectedDay', day.date)"
                >
                    <div>{{ day.weekdayShortName }}</div>
                    <div>{{ day.day }}</div>
                </div>
            </div>
            <button @click="nextWeek">
                <AngleRight class="size-5"/>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import AngleLeft from '@/assets/icons/AngleLeft.vue'
import AngleRight from '@/assets/icons/AngleRight.vue'
import { ref, computed, onMounted } from 'vue'

type Day = {
  date: Date
  iso: string
  day: number
  weekdayShortName: string
}

const weekDays: string[] = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

const weekStrip = ref<HTMLElement | null>(null)
const currentWeekStart = ref<Date>(getMonday(new Date()))
const selectedDate = ref<Date>(new Date())

const dayWidth = 48

function getMonday(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  return d
}

function addDays(base: Date, amount: number): Date {
  const d = new Date(base)
  d.setDate(d.getDate() + amount)
  return d
}

function toISO(date: Date): string {
  const d = new Date(date)
  return d.toISOString().slice(0, 10)
}

const extendedWeekDates = computed<Day[]>(() => {
  const start = addDays(currentWeekStart.value, -7)
  return Array.from({ length: 28 }).map((_, index) => {
    const d = addDays(start, index)
    return {
      date: d,
      iso: toISO(d),
      day: d.getDate(),
      weekdayShortName: weekDays[d.getDay() === 0 ? 6 : d.getDay() - 1],
    }
  })
})

function selectDay(day: Day): void {
  selectedDate.value = day.date
}

function isSelected(day: Day): boolean {
  return toISO(day.date) === toISO(selectedDate.value)
}

function prevWeek(): void {
  weekStrip.value?.scrollTo({ left: 0, behavior: 'smooth' })
  setTimeout(() => {
    currentWeekStart.value = addDays(currentWeekStart.value, -7)
    weekStrip.value?.scrollTo({ left: dayWidth * 7, behavior: 'instant' })
  }, 300)
}

function nextWeek(): void {
  weekStrip.value?.scrollTo({ left: dayWidth * 14, behavior: 'smooth' })
  setTimeout(() => {
    currentWeekStart.value = addDays(currentWeekStart.value, 7)
    weekStrip.value?.scrollTo({ left: dayWidth * 7, behavior: 'instant' })
  }, 300)
}

onMounted(() => {
  weekStrip.value?.scrollTo({ left: dayWidth * 7, behavior: 'instant' })
})
</script>