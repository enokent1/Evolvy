<template>
  <modal-wrapper>
    <FullCalendar :default-date="defaultDate" />
  </modal-wrapper>
</template>

<script setup lang="ts">
import ModalWrapper from "../wrappers/ModalWrapper.vue";
import FullCalendar from "../features/FullCalendar.vue";

const props = defineProps<{
  defaultDate: Date;
}>();
</script>
