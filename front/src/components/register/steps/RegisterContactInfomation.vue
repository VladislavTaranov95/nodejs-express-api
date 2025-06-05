<script setup>
import { reactive } from 'vue';
import NTextField from '@/components/ui/NTextField.vue';
import { UserRoundPlus, BriefcaseBusiness, Phone } from 'lucide-vue-next';

const form = reactive({
  email: '',
  password: '',
  confirmPassword: '',
});
</script>

<template>
  <div class="grid grid-cols-2 gap-x-10 gap-y-5">
    <NTextField label="First Name" v-model="form.email">
      <template #prepend-icon>
        <UserRoundPlus :size="18" />
      </template>
    </NTextField>

    <NTextField label="Last Name" v-model="form.password">
      <template #prepend-icon>
        <UserRoundPlus :size="18" />
      </template>
    </NTextField>

    <NTextField label="Job Title" v-model="form.confirmPassword">
      <template #prepend-icon>
        <BriefcaseBusiness :size="18" />
      </template>
    </NTextField>

    <NTextField label="Phone Number" v-model="form.confirmPassword">
      <template #prepend-icon>
        <Phone :size="18" />
      </template>
    </NTextField>
  </div>
</template>