<template>
  <div class="flex items-center gap-1">
    <input
      type="number"
      class="w-20 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-1 text-sm transition"
      :class="{ 'bg-red-200 ring-2 ring-red-500': isNegativeValue }"
      v-model="inputValue"
      :max="maxValue"
    />
    <button
      @click="handleClick"
      class="hover:cursor-pointer"
      :disabled="isNegativeValue"
    >
      <SvgIcon name="plus-circle" class="size-5" />
    </button>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from "@/assets/icons/SvgIcon.vue";
import { ref, watch } from "vue";

const props = defineProps<{
  maxValue: number;
}>();

const emit = defineEmits<{
  (emit: "addCount", amount: number): void;
}>();

const inputValue = ref<number>(0);
const isNegativeValue = ref(false);

watch(inputValue, (newValue) => {
  const numValue = Number(newValue);
  isNegativeValue.value = !isNaN(numValue) && numValue < 0;
});

function handleClick() {
  const value = Number(inputValue.value);

  if (isNaN(value)) {
    return;
  }

  if (value < 0) {
    return;
  }

  emit("addCount", value);
  inputValue.value = 0;
}
</script>
