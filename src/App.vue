<template>
  <div class="min-h-screen bg-gray-50">
    <main class="container mx-auto">
      <RouterView />
    </main>
    <NavigationBar />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import NavigationBar from '@/components/layouts/NavigationBar.vue';
</script>
