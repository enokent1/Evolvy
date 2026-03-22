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

<script setup>
import AngleLeft from '@/assets/icons/AngleLeft.vue'
import AngleRight from '@/assets/icons/AngleRight.vue'
import { ref, computed, onMounted } from 'vue'

const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

const weekStrip = ref(null)
const currentWeekStart = ref(getMonday(new Date()))
const selectedDate = ref(new Date())

const dayWidth = 48 

function getMonday(date) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = (day === 0 ? -6 : 1 - day)
  d.setDate(d.getDate() + diff)
  return d
}

function addDays(base, amount) {
  const d = new Date(base)
  d.setDate(d.getDate() + amount)
  return d
}

function toISO(date) {
  const d = new Date(date)
  return d.toISOString().slice(0, 10)
}

const extendedWeekDates = computed(() => {
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

function selectDay(day) {
  selectedDate.value = day.date
}

function isSelected(day) {
  return toISO(day.date) === toISO(selectedDate.value)
}

function prevWeek() {
  weekStrip.value.scrollTo({ left: 0, behavior: 'smooth' })
  setTimeout(() => {
    currentWeekStart.value = addDays(currentWeekStart.value, -7)
    weekStrip.value.scrollTo({ left: dayWidth * 7, behavior: 'instant' })
  }, 300)
}

function nextWeek() {
  weekStrip.value.scrollTo({ left: dayWidth * 14, behavior: 'smooth' })
  setTimeout(() => {
    currentWeekStart.value = addDays(currentWeekStart.value, 7)
    weekStrip.value.scrollTo({ left: dayWidth * 7, behavior: 'instant' })
  }, 300)
}

onMounted(() => {
  weekStrip.value.scrollTo({ left: dayWidth * 7, behavior: 'instant' })
})
</script>