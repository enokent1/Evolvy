<template>
    <div>
        <h1 class="w-fit mx-auto font-medium text-2xl">New Habit</h1>
        <div class="p-4">
            <ul class="flex flex-col gap-2">
                <li v-for="habit in habitsList" :key="habit.id">
                    <HabitLink :habit="habit" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import HabitLink from '@/components/features/HabitLink.vue';
import axios from 'axios';

async function fetchAndSaveData() {
    try {
        const response = await axios.get('https://6994c147b081bc23e9c140ad.mockapi.io/habits/')
        localStorage.setItem('habits', JSON.stringify(response.data))
        return response.data
    } catch (error) {
        console.log('Error: ', error)
        throw error
    }
}

fetchAndSaveData()

const habitsList = JSON.parse(localStorage.getItem('habits'))
console.log(habitsList)
</script>
