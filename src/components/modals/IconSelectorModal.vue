<template>
  <modal-wrapper>
    <div class="grid grid-cols-5 gap-5">
      <button
        v-for="iconKey in iconKeys"
        :key="iconKey"
        @click="$emit('selectedIcon', getIcon(iconKey))"
        class="hover:cursor-pointer"
      >
        <span class="text-2xl">
          {{ getIcon(iconKey) }}
        </span>
      </button>
    </div>
  </modal-wrapper>
</template>

<script setup>
import { computed } from "vue";
import ModalWrapper from "../wrappers/ModalWrapper.vue";
import { getAllIconKeys, getIcon } from "@/utils/icons/iconHelpers";

const iconKeys = getAllIconKeys();
</script>
