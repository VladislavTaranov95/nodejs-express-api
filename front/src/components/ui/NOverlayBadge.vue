<script setup>
defineProps({
  content: {
    type: [String, Number],
    required: false,
    default: '',
  },
})
</script>

<template>
  <div class="relative inline-block">
    <slot />

    <span v-if="content"
      class="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full text-xs text-white bg-red-500">
      {{ content }}
    </span>
  </div>
</template>