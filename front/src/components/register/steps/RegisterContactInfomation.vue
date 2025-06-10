<script setup>
import { reactive, watch, ref } from 'vue';
import NTextField from '@/components/ui/NTextField.vue';
import { UserRoundPlus, BriefcaseBusiness, Phone } from 'lucide-vue-next';
import NForm from '@/components/ui/NForm.vue';
import { required } from '@/helpers/validations';

const emits = defineEmits(["validate", "update"])

const formRef = ref(null)

const form = reactive({
  firstName: '',
  lastName: '',
  job: '',
  phone: ''
});

const rules = {
  firstName: [required('First name'),],
  lastName: [required('Last name'),],
  phone: [required('Phone'),]
};

watch(formRef, (value) => {
  emits("validate", value.validate)
})
</script>

<template>
  <NForm ref="formRef" class="grid grid-cols-2 gap-x-10 gap-y-5">
    <NTextField label="First Name" v-model="form.firstName" @update:model-value="$emit('update', 'firstName', $event)"
      :rules="rules.firstName" required>
      <template #prepend-icon>
        <UserRoundPlus :size="18" />
      </template>
    </NTextField>

    <NTextField label="Last Name" v-model="form.lastName" @update:model-value="$emit('update', 'lastName', $event)"
      :rules="rules.lastName" required>
      <template #prepend-icon>
        <UserRoundPlus :size="18" />
      </template>
    </NTextField>

    <NTextField label="Job Title" v-model="form.job" @update:model-value="$emit('update', 'job', $event)">
      <template #prepend-icon>
        <BriefcaseBusiness :size="18" />
      </template>
    </NTextField>

    <NTextField label="Phone Number" v-model="form.phone" @update:model-value="$emit('update', 'phone', $event)"
      :rules="rules.phone" required>
      <template #prepend-icon>
        <Phone :size="18" />
      </template>
    </NTextField>
  </NForm>
</template>