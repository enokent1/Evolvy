<template>
  <nav
    class="fixed right-0 bottom-4 left-0 mx-auto flex w-fit gap-10 rounded-full bg-linear-to-r from-emerald-500 to-teal-500 px-8 py-4"
  >
    <RouterLink
      v-for="link in navLinks"
      :to="link.route"
      :key="link.name"
      class="transition-transform hover:scale-110"
    >
      <SvgIcon :name="link.icon" class="size-8 text-white" />
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import SvgIcon from "@/assets/icons/SvgIcon.vue";
import { NavLink } from "@/types";

const navLinks: NavLink[] = [
  { route: "/", name: "home", icon: "home" },
  { route: "/habits", name: "habits", icon: "list" },
  { route: "/calendar", name: "calendar", icon: "calendar" },
  { route: "/profile", name: "profile", icon: "user" },
];
</script>
