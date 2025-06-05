<script setup>
import { Steps } from '@ark-ui/vue/steps'

defineProps({
  value: {
    type: Number,
    default: 0,
  },
})
</script>

<template>
  <Steps.Content :index="value" asChild>
    <slot></slot>
  </Steps.Content>
</template>