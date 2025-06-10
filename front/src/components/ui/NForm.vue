<script setup>
import { provide, reactive } from 'vue';

let validationFns = reactive([]);

function registerValidationFunc(func) {
  validationFns.push(func);
}

provide('registerValidationFunc', registerValidationFunc);

const validate = async () => {
  const responses = await Promise.all(validationFns.map((f) => f()));

  return responses.every((res) => res)
}

defineExpose({
  validate
})
</script>

<template>
  <form @submit.prevent>
    <slot></slot>
  </form>
</template>