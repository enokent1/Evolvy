<template>
  <modal-wrapper>
    <FullCalendar
      :default-date="props.datePickerConfig.value || new Date()"
      :mode="props.datePickerConfig.mode"
    />
  </modal-wrapper>
</template>

<script setup lang="ts">
import ModalWrapper from "../wrappers/ModalWrapper.vue";
import FullCalendar from "../features/FullCalendar.vue";

const props = defineProps<{
  datePickerConfig: {
    mode: "startDate" | "endDate";
    value: Date | null;
  };
}>();
</script>
