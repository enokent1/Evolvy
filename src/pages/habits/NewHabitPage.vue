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

<script setup lang="ts">
import HabitLink from '@/components/features/HabitLink.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue'

type HabitItem = {
    id: string
    icon: string
    title: string
}

const habitsList = ref<HabitItem[]>([])

async function fetchAndSaveData(): Promise<void> {
    try {
        const response = await axios.get<HabitItem[]>('https://6994c147b081bc23e9c140ad.mockapi.io/habits/')
        localStorage.setItem('habits', JSON.stringify(response.data))
        habitsList.value = response.data
    } catch (error) {
        console.log('Error: ', error)
        const storageData = localStorage.getItem('habits')
        if (storageData) {
            try {
                habitsList.value = JSON.parse(storageData)
            } catch (parseError) {
                console.log('Parse error: ', parseError)
                habitsList.value = []
            }
        }
    }
}

onMounted(() => {
    fetchAndSaveData()
})
</script>
