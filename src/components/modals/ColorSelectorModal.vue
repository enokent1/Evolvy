<template>
  <modal-wrapper>
    <div class="grid grid-cols-5 gap-4">
      <button
        v-for="colorKey in colorKeys"
        :key="colorKey"
        class="h-10 w-10 rounded-full"
        :class="colorMap[colorKey].bgClass"
        @click="$emit('selectedColor', colorKey)"
      ></button>
    </div>
  </modal-wrapper>
</template>

<script setup>
import ModalWrapper from "@/components/wrappers/ModalWrapper.vue";
import { computed } from "vue";
import colorMap from "@/utils/colors/colorMap";

const colorKeys = computed(() => Object.keys(colorMap));
</script>

<style scoped></style>
