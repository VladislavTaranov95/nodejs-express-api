<script setup>
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: "md"
  },
  icon: {
    type: Boolean,
    default: false
  }
})

const buttonClass = computed(() => {
  const variants = {
    "primary": "bg-primary hover:bg-hover-primary",
    "ghost": "bg-ghost hover:bg-hover-ghost"
  }

  const sizes = {
    "sm": "h-8",
    "md": "h-10",
    "lg": "h-12",
  }

  const iconSizes = {
    "sm": "h-8 w-8",
    "md": "h-10 w-10",
    "lg": "h-12 w-12",
  }

  const icon = props.icon ? `${iconSizes[props.size]} rounded-full p-[10px]` : "rounded-sm px-4 py-2"


  return `${variants[props.variant]} ${sizes[props.size]} ${icon}`
})
</script>

<template>
  <button :type="type" :disabled="disabled" :class="buttonClass"
    class=" flex items-center text-sm justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer">
    <slot />
  </button>
</template>