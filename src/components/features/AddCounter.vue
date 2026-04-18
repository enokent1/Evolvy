<template>
  <div class="flex items-center gap-1">
    <input
      type="number"
      class="w-20 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-1 text-sm"
      v-model="inputValue"
    />
    <button @click.stop="($emit('addCount', inputValue), (inputValue = 0))">
      <Add class="size-5" />
    </button>
  </div>
</template>

<script setup lang="ts">
import Add from "@/assets/icons/Add.vue";
import { ref } from "vue";

const props = defineProps({
  target: Number,
});
const inputValue = ref<number>(0);
</script>
