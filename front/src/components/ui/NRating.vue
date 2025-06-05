<script setup>
import { RatingGroup } from '@ark-ui/vue/rating-group'
import { StarHalf, Star } from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: ""
  },
  count: {
    type: Number,
    default: 0
  },
  size: {
    type: String,
    default: "md"
  },
  variant: {
    type: String,
    default: "primary"
  }
})

const iconSize = computed(() => {
  const sizes = {
    "sm": 20,
    "md": 24,
    "lg": 28,
  }

  return sizes[props.size]
})

const iconClass = computed(() => {
  const variants = {
    "primary": "text-primary",
  }

  return variants[props.variant]
})

const iconHighlightedClass = computed(() => {
  const variants = {
    "primary": "text-primary fill-primary",
  }

  return variants[props.variant]
})
</script>

<template>
  <RatingGroup.Root :count="5" allowHalf :model-value="count" disabled>
    <RatingGroup.Label v-if="label">Label</RatingGroup.Label>
    <RatingGroup.Control class="flex">
      <RatingGroup.Context v-slot="{ items }">
        <RatingGroup.Item v-for="item in items" :key="item" :index="item">
          <RatingGroup.ItemContext v-slot="{ highlighted, half }">
            <StarHalf v-if="half" :size="iconSize" :class="iconClass" :stroke-width="1.5" />
            <Star v-else-if="highlighted" :size="iconSize" :class="iconHighlightedClass" :stroke-width="1.5" />
            <Star v-else :size="iconSize" :class="iconClass" :stroke-width="1.5" />
          </RatingGroup.ItemContext>
        </RatingGroup.Item>
      </RatingGroup.Context>
      <RatingGroup.HiddenInput />
    </RatingGroup.Control>
  </RatingGroup.Root>
</template>
