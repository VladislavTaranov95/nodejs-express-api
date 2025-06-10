<script setup>
import { reactive, ref } from 'vue';
import NTextField from '@/components/ui/NTextField.vue';
import { Mail, KeyRound, LockKeyhole } from 'lucide-vue-next';
import { email, required, min } from '@/helpers/validations';
import NForm from '@/components/ui/NForm.vue';
import { watch } from 'vue';

const emits = defineEmits(["validate", "update"])

const formRef = ref(null)

const form = reactive({
  email: '',
  password: '',
  confirmPassword: '',
});

const rules = {
  email: [
    required('Email'),
    email,
  ],
  password: [
    required('Password'),
    min('Password', 8)
  ],
  confirmPassword: [
    required('Confirm password'),
    (value) => value === form.password || 'Passwords do not match'
  ]
};

watch(formRef, (value) => {
  emits("validate", value.validate)
})
</script>

<template>
  <NForm ref="formRef" class="grid grid-cols-2 gap-x-10 gap-y-5">
    <NTextField class="col-span-2" label="Your email" v-model="form.email"
      @update:model-value="$emit('update', 'email', $event)" :rules="rules.email" required>
      <template #prepend-icon>
        <Mail :size="18" />
      </template>
    </NTextField>

    <NTextField label="Your password" type="password" v-model="form.password"
      @update:model-value="$emit('update', 'password', $event)" :rules="rules.password" required>
      <template #prepend-icon>
        <KeyRound :size="18" />
      </template>
    </NTextField>

    <NTextField label="Confirm password" type="password" v-model="form.confirmPassword" :rules="rules.confirmPassword"
      required>
      <template #prepend-icon>
        <LockKeyhole :size="18" />
      </template>
    </NTextField>
  </NForm>
</template>