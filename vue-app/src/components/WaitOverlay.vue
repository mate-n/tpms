<script setup lang="ts">
defineProps({
  zIndex: { type: Number, default: 1100 },
  fixed: { type: Boolean, default: true },
  title: { type: String, default: 'Please wait…' }
})
</script>

<template>
  <div
    class="top-0 left-0 d-flex justify-center align-center w-100 h-screen text-white"
    :class="[fixed ? 'position-fixed' : 'position-absolute']"
    :style="`z-index: ${zIndex}; background: rgba(0, 0, 0, 0.3);backdrop-filter: blur(2px);`"
  >
    <p class="text-h5 font-weight-bold">{{ title }}</p>
  </div>
</template>
