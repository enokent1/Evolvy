<template>
  <div class="min-h-screen bg-gray-50">
    <main class="container mx-auto">
      <RouterView />
    </main>
    <NavigationBar v-if="!hideNavigationBar"/>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { RouterView, useRoute } from "vue-router";
import NavigationBar from "@/components/layouts/NavigationBar.vue";

const route = useRoute();
const hideNavigationBar = computed(() => {
  return route.meta.hideNavigationBar === true;
});
</script>
