<template>
  <div
    class="fixed inset-0 flex items-center justify-center"
    @click="$emit('closeModal')"
  >
    <div
      v-if="type === 'success'"
      class="flex flex-col items-center rounded-3xl border-2 border-green-400 bg-green-300/30 p-6 backdrop-blur-md"
    >
      <h2 class="text-xl font-medium">{{ message }}</h2>
      <button
        class="mt-4 rounded-full bg-white px-5 py-3"
        @click="$emit('routerBack')"
      >
        Go back to habits
      </button>
    </div>
    <div
      v-else
      class="flex flex-col items-center rounded-3xl border-2 border-red-400 bg-red-300/30 p-6 backdrop-blur-md"
    >
      <h2 class="text-xl font-medium">{{ message }}</h2>
      <button
        class="mt-4 rounded-full bg-white px-5 py-3"
        @click="$emit('closeModal')"
      >
        Try again
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});
</script>
