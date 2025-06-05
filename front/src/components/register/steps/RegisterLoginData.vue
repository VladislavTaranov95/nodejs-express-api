<script setup>
import { reactive } from 'vue';
import NTextField from '@/components/ui/NTextField.vue';
import { Mail, KeyRound, LockKeyhole } from 'lucide-vue-next';

const form = reactive({
  email: '',
  password: '',
  confirmPassword: '',
});
</script>

<template>
  <div class="grid grid-cols-1 gap-x-10 gap-y-5">
    <NTextField label="Your email" v-model="form.email">
      <template #prepend-icon>
        <Mail :size="18" />
      </template>
    </NTextField>

    <NTextField label="Your password" v-model="form.password">
      <template #prepend-icon>
        <KeyRound :size="18" />
      </template>
    </NTextField>

    <NTextField label="Confirm password" v-model="form.confirmPassword">
      <template #prepend-icon>
        <LockKeyhole :size="18" />
      </template>
    </NTextField>
  </div>
</template>