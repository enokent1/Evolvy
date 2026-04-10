<template>
  <modal-wrapper>
    <FullCalendar
      :default-date="props.dateSelectorParams.value || new Date()"
      :mode="props.dateSelectorParams.mode"
    />
  </modal-wrapper>
</template>

<script setup lang="ts">
import ModalWrapper from "../wrappers/ModalWrapper.vue";
import FullCalendar from "../features/FullCalendar.vue";

const props = defineProps<{
  dateSelectorParams: {
    mode: "start" | "end";
    value: Date | null;
  };
}>();
</script>
