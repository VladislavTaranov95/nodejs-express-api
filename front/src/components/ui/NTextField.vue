<script setup>
import { Field } from '@ark-ui/vue/field'
import { ref, computed, inject, onMounted } from 'vue'
import { Asterisk } from 'lucide-vue-next';
import { watch } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    default: 'text',
    validator: (value) => ['text', 'email', 'password'].includes(value)
  },
  modelValue: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  message: {
    type: String,
    default: ""
  },
  placeholder: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  rules: {
    type: Array,
    default: () => []
  },
})

const emits = defineEmits(['update:modelValue'])

const errorMessage = ref(null)
const isValid = ref(true)

const registerValidationFunc = inject('registerValidationFunc', null);

const invalid = computed(() => !isValid.value);

const inputClass = computed(() => {
  const sizes = {
    "sm": "h-8",
    "md": "h-10",
    "lg": "h-12",
  }

  return sizes[props.size]
})

onMounted(() => {
  if (registerValidationFunc) {
    registerValidationFunc(validate);
  }
});

const validate = async () => {
  isValid.value = true;

  if (props.rules.length === 0) return true;

  for (const rule of props.rules) {
    const result = await Promise.resolve(rule(props.modelValue));

    if (typeof result === 'string') {
      isValid.value = false;
      errorMessage.value = result
      return false;
    }
  }

  errorMessage.value = ''
  return true;
}

const input = async (event) => {
  emits('update:modelValue', event.target.value)

}

watch(() => props.modelValue, async () => {
  await validate();
})

const blur = async () => {
  await validate();
}
</script>

<template>
  <Field.Root class="flex flex-col gap-2 relative mb-5" :invalid="invalid">
    <div class="flex gap-1">
      <Field.Label v-if="label" class="text-gray-950 text-sm leading-5 font-medium">{{ label }}</Field.Label>
      <Asterisk v-if="required" :size="10" class="text-red-600 mt-1" />
    </div>
    <div class="relative">
      <div class="absolute top-1/2 -translate-y-1/2 left-[10px] text-zinc-500">
        <slot name="prepend-icon"></slot>
      </div>
      <Field.Input :type="type" :value="modelValue" @input="input" @blur="blur" :class="inputClass"
        :placeholder="placeholder"
        class="outline-none border border-neutral-200 border-solid min-w-10 w-full rounded-sm text-gray-950 text-base pl-10 pr-3  focus:shadow-[0_0_0_1px_rgba(235,94,65,1)] focus:border-[rgba(235,94,65,1)] duration-200 transition-shadow" />
    </div>

    <Transition>
      <Field.ErrorText class="text-sm text-red-600 absolute bottom-[-23px]">{{ errorMessage }}</Field.ErrorText>
    </Transition>
  </Field.Root>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease-out;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(-7px);
  opacity: 0;
}
</style>