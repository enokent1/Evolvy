<template>
  <nav class="flex gap-10 fixed bottom-4 left-0 right-0 w-fit mx-auto px-8 py-4 rounded-full bg-linear-to-r from-emerald-500 to-teal-500 ">
    <RouterLink 
        v-for="link in links"
        :to="link.route"
        :key="link.name"
        class="hover:scale-110 transition-transform"
    >
        <component :is="link.icon" class="size-8 text-white"/>
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import type { Component } from 'vue';

import HomeIcon from '@/assets/icons/HomeIcon.vue';
import ListIcon from '@/assets/icons/ListIcon.vue';
import CalendarIcon from '@/assets/icons/CalendarIcon.vue';
import UserIcon from '@/assets/icons/UserIcon.vue';

type NavLink = {
  route: string
  name: string
  icon: Component
}

const links: NavLink[] = [
    {route: '/', name: 'home', icon: HomeIcon},
    {route: '/habits', name: 'habits', icon: ListIcon},
    {route: '/calendar', name: 'calendar', icon: CalendarIcon},
    {route: '/profile', name: 'profile', icon: UserIcon},
]
</script>

