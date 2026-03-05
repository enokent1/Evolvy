<template>
    <div v-if="habit">
        <div class="flex items-center gap-2 w-fit mx-auto mb-6">
            <span class="text-3xl">{{ habit.icon }}</span>
            <h1 class="text-2xl font-medium">{{ habit.title }}</h1>
        </div>
        <div class="flex gap-6 border rounded-3xl p-4 mx-auto w-fit">
            <span class="text-5xl">{{ habit.icon }}</span>
            <div>
                <input type="text" v-model="habit.title">
                <input type="text" v-model="habit.description" placeholder="Description (Optional)">
            </div>
        </div>
    </div>
    <div v-else>
        <p class="text-center text-gray-600">Loading...</p>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const id = useRoute().params.id;
const habit = ref(null)

async function fetchHabitWithId(id) {
    try {
        const response = await axios.get(`https://6994c147b081bc23e9c140ad.mockapi.io/habits/${id}`)
        habit.value = response.data
        console.log('Fetched habit: ', habit.value)
    } catch (error) {
        console.log('Error: ', error)
        throw error
    }
}

onMounted(() => {
    fetchHabitWithId(id)
})

</script>
