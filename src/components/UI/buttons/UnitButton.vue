<template>
  <button class="rounded-xl border border-gray-400 bg-gray-200 p-3 text-sm">
    {{ unit }}
  </button>
</template>

<script setup>
const props = defineProps({
  unit: {
    type: String,
    default: "times",
  },
});
</script>

<script>
export default {
  name: "unit-button",
};
</script>
