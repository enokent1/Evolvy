<template>
  <div
    class="fixed inset-0 flex items-center justify-center"
    @click="$emit('closeModal')"
  >
    <div
      class="rounded-3xl border border-amber-50 bg-amber-50/20 p-4 backdrop-blur-md"
    >
      <slot></slot>
    </div>
  </div>
</template>