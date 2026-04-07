<template>
  <modal-wrapper>
    <div class="grid grid-cols-5 gap-5">
      <button
        v-for="iconKey in iconStore.availableIcons"
        :key="iconKey"
        @click="$emit('selectedIcon', iconStore.iconMap[iconKey].icon)"
      >
        <span class="text-2xl">
          {{ iconStore.iconMap[iconKey].icon }}
        </span>
      </button>
    </div>
  </modal-wrapper>
</template>

<script setup>
import ModalWrapper from "../wrappers/ModalWrapper.vue";
import { useIconStore } from "@/stores/iconStore";

const iconStore = useIconStore();
</script>
