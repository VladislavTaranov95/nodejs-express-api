<script setup>
import { Field } from '@ark-ui/vue/field'
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: false,
  },
  modelValue: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: 'md'
  },
  message: {
    type: String,
    default: ""
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const inputClass = computed(() => {
  const sizes = {
    "sm": "h-8",
    "md": "h-10",
    "lg": "h-12",
  }

  return sizes[props.size]
})
</script>

<template>
  <Field.Root class="flex flex-col gap-2">
    <Field.Label v-if="label" class="text-gray-950 text-sm leading-5 font-medium">{{ label }}</Field.Label>
    <div class="relative">
      <div class="absolute top-1/2 -translate-y-1/2 left-[10px] text-zinc-500">
        <slot name="prepend-icon"></slot>
      </div>
      <Field.Input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :class="inputClass"
        :placeholder="placeholder"
        class="outline-none border border-neutral-200 border-solid min-w-10 w-full rounded-sm text-gray-950 text-base pl-10 pr-3  focus:shadow-[0_0_0_1px_rgba(235,94,65,1)] focus:border-[rgba(235,94,65,1)] duration-200 transition-shadow" />
    </div>
    <Field.HelperText class="text-sm leading-5 text-zinc-600">{{ message }}</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
</template>