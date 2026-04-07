import { createWebHistory, createRouter } from "vue-router";

import HomePage from "@/pages/home/HomePage.vue";
import HabitsPage from "@/pages/habits/HabitsPage.vue";
import CalendarPage from "@/pages/calendar/CalendarPage.vue";
import ProfilePage from "@/pages/profile/ProfilePage.vue";

const routes = [
  {path: '/', component: HomePage},
  {path: '/habits', component: HabitsPage},
  {path: '/calendar', component: CalendarPage},
  {path: '/profile', component: ProfilePage},
  {path: '/habits/new', component: () => import('@/pages/habits/NewHabitPage.vue')},
  {path: '/habits/:id', component: () => import('@/pages/habits/HabitPage.vue'), meta: {hideNavigationBar: true}},
]

export default createRouter({
  history: createWebHistory(),
  routes
})