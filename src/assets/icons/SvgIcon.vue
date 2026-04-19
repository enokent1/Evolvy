<template>
  <svg v-bind="$attrs">
    <use :xlink:href="`/sprite.svg#${name}`" />
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
}>();

defineOptions({
  inheritAttrs: true,
});
</script>

<style scoped>
svg {
  display: inline-block;
  vertical-align: middle;
  fill: currentColor;
}
</style>
