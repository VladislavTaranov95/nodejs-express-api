<script setup>
import { reactive } from 'vue';
import NTextField from '@/components/ui/NTextField.vue';
import { UserRoundPlus, BriefcaseBusiness, Phone } from 'lucide-vue-next';

defineEmits(["update"])

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
    <NTextField label="Country" v-model="form.country" @update:model-value="$emit('update', 'country', $event)">
      <template #prepend-icon>
        <UserRoundPlus :size="18" />
      </template>
    </NTextField>

    <NTextField label="State" v-model="form.state" @update:model-value="$emit('update', 'state', $event)">
      <template #prepend-icon>
        <UserRoundPlus :size="18" />
      </template>
    </NTextField>

    <NTextField label="City" v-model="form.city" @update:model-value="$emit('update', 'city', $event)">
      <template #prepend-icon>
        <BriefcaseBusiness :size="18" />
      </template>
    </NTextField>

    <NTextField label="Street" v-model="form.street" @update:model-value="$emit('update', 'street', $event)">
      <template #prepend-icon>
        <Phone :size="18" />
      </template>
    </NTextField>

    <NTextField label="Zip Code" v-model="form.zipCode" @update:model-value="$emit('update', 'zipCode', $event)">
      <template #prepend-icon>
        <Phone :size="18" />
      </template>
    </NTextField>
  </div>
</template>