<script setup>
import { reactive } from 'vue';
import NTextField from '@/components/ui/NTextField.vue';
import { UserRoundPlus, BriefcaseBusiness, Phone } from 'lucide-vue-next';

const form = reactive({
  country: '',
  state: '',
  city: '',
  street: '',
  zipCode: '',
});
</script>

<template>
  <div class="grid grid-cols-2 gap-x-10 gap-y-5">
    <NTextField label="Country" v-model="form.country">
      <template #prepend-icon>
        <UserRoundPlus :size="18" />
      </template>
    </NTextField>

    <NTextField label="State" v-model="form.state">
      <template #prepend-icon>
        <UserRoundPlus :size="18" />
      </template>
    </NTextField>

    <NTextField label="City" v-model="form.city">
      <template #prepend-icon>
        <BriefcaseBusiness :size="18" />
      </template>
    </NTextField>

    <NTextField label="Street" v-model="form.street">
      <template #prepend-icon>
        <Phone :size="18" />
      </template>
    </NTextField>

    <NTextField label="Zip Code" v-model="form.zipCode">
      <template #prepend-icon>
        <Phone :size="18" />
      </template>
    </NTextField>
  </div>
</template>