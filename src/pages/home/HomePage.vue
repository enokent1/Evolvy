<template>
  <div v-if="userHabits">
    <h1 class="text-2xl font-medium text-center mb-6 ">{{ dateDisplayName }}</h1>
    <Calendar 
      @selected-day="resolveDateDisplay($event)"
    />
    <div class="flex flex-col gap-3 mx-2">
      <HabitCard 
        v-for="habit in userHabits"
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
import HabitCard from '@/components/features/HabitCard.vue';
import Calendar from '@/components/features/Calendar.vue';

import axios from 'axios';
import { ref, onMounted } from 'vue';

type Habit = {
  id: string
  icon: string
  title: string
  description?: string
  group: 'Health' | 'Productivity' | 'Sport'
  color: string
  target: number
  unit: 'times' | 'steps' | 'm' | 'km' | 'ml' | 'l' | 'g' | 'mg' | 'sec' | 'min' | 'hr'
  trackingType: 'count'
}

const userHabits = ref<Habit[]>([])
const dateDisplayName = ref<string>('Today')

async function getHabits() {
  try {
    const response = await axios.get<Habit[]>('https://6994c147b081bc23e9c140ad.mockapi.io/user-habits')
    console.log(response.data)
    userHabits.value = response.data
  } catch (error) {
    console.log('Error fetching user habits: ', error)
  }
}

onMounted(() => {
  getHabits()
})

function resolveDateDisplay(day: Date): void {
  const targetDate = new Date(day)
  const isToday = new Date().toDateString() === targetDate.toDateString()

  if (isToday) {
    dateDisplayName.value = 'Today'
  } else {
    dateDisplayName.value = targetDate.toLocaleDateString('en-US', {month: 'long', day: 'numeric'})
  }
}
</script>
