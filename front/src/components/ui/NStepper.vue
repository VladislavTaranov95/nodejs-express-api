<script setup>
import { Steps } from '@ark-ui/vue/steps'

const props = defineProps({
  step: {
    type: Number,
    default: 0,
  },
  items: {
    type: Array,
    required: true,
  },
})
defineEmits(['update:step'])

const isLastItem = (index) => {
  return index === props.items.length - 1
}
</script>

<template>
  <Steps.Root :count="items.length">
    <Steps.List class="flex w-full">
      <Steps.Item class="flex items-center" :class="{ 'flex-grow': !isLastItem(index) }" v-for="(item, index) in items"
        :key="index" :index="index">
        <Steps.Trigger
          class="flex px-4 py-3 rounded-sm gap-x-4 items-center cursor-pointer data-[state=open]:bg-neutral-100"
          @update:step="(value) => $emit('update:step', value)">
          <Steps.Indicator
            class="data-complete:bg-primary w-10 h-10 rounded-full flex items-center justify-center data-current:bg-neutral-100 data-current:border data-current:border-primary">
            {{ index + 1 }}
          </Steps.Indicator>
          <span>{{ item.title }}</span>
        </Steps.Trigger>
        <Steps.Separator v-if="!isLastItem(index)" class="border border-x-0 border-t-0 border-neutral-200 flex-grow" />
      </Steps.Item>
    </Steps.List>

    <slot></slot>

    <Steps.CompletedContent>Steps Complete - Thank you for filling out the form!</Steps.CompletedContent>

    <div class="flex justify-between mx-4">
      <Steps.PrevTrigger asChild>
        <slot name="prev"></slot>
      </Steps.PrevTrigger>

      <Steps.NextTrigger asChild>
        <slot name="next"></slot>
      </Steps.NextTrigger>
    </div>
  </Steps.Root>
</template>