<template>
  <h1 class="mb-6 text-center text-2xl font-medium">Profile</h1>
  <div class="profile-page mx-auto max-w-xl px-4 py-8">
    <div
      class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div class="mb-6 flex flex-col items-center gap-4">
        <div
          class="flex h-32 w-32 items-center justify-center rounded-full border border-slate-200 bg-slate-100"
        >
          <span class="text-4xl text-slate-400">👤</span>
        </div>
      </div>
      <div class="profile-field flex flex-col gap-2">
        <label class="text-sm font-medium text-slate-600" for="profile-name"
          >Name</label
        >
        <input
          id="profile-name"
          v-model="profileName"
          type="text"
          class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 transition outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          placeholder="Enter your name"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const profileName = ref("Your Name");
const profilePhoto = ref<string | null>(null);
</script>
