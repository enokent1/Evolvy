<template>
  <nav class="flex gap-10 fixed bottom-4 left-0 right-0 w-fit mx-auto px-8 py-4 rounded-full bg-linear-to-r from-emerald-500 to-teal-500 ">
    <RouterLink 
        v-for="link in links"
        :to="link.route"
        :key="link.name"
        class="hover:scale-110 transition-transform"
    >
        <img :src="link.icon" :alt="link.name" class="size-10">
    </RouterLink>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router';

const links = [
    {route: '/', name: 'home', icon: './src/assets/icons/home.svg'},
    {route: '/habits', name: 'habits', icon: './src/assets/icons/habits.svg'},
    {route: '/calendar', name: 'calendar', icon: './src/assets/icons/calendar.svg'},
    {route: '/profile', name: 'profile', icon: './src/assets/icons/user.svg'},
]
</script>

