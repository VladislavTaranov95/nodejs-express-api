<script setup>
import { ref, reactive } from 'vue';
import NButton from '@/components/ui/NButton.vue';
import RegisterLoginData from '@/components/register/steps/RegisterLoginData.vue';
import RegisterContactInfomation from '@/components/register/steps/RegisterContactInfomation.vue';
import RegisterAddressDetails from '@/components/register/steps/RegisterAddressDetails.vue';
import { useNotification } from "@kyvg/vue3-notification";
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const { notify } = useNotification()
const userStore = useUserStore()
const router = useRouter()

const items = [
  {
    title: 'Login Data',
    component: RegisterLoginData
  },
  {
    title: 'Contact Information',
    component: RegisterContactInfomation
  },
  {
    title: 'Address Details',
    component: RegisterAddressDetails
  },
];

let form = reactive({})

const validationFns = ref([])

const registerValidation = (fn) => {
  validationFns.value.push(fn)
}

const updateForm = (field, value) => {
  form[field] = value
}

const isFormValid = async () => {
  const responses = await Promise.all(validationFns.value.map((fn) => fn()))

  return responses.every((res) => res)
}

const register = async () => {
  const valid = await isFormValid()

  if (!valid) {
    return notify({
      type: "error",
      title: "Error",
      text: "Form is invalid",
    });
  }

  try {
    await userStore.register(form);

    notify({
      type: "success",
      title: "Success",
      text: "Hello user!",
    });

    router.push({ name: 'main' })

  } catch (err) {
    notify({
      type: "error",
      title: "Error",
      text: err.message,
    });
  }
}
</script>

<template>
  <div class="flex flex-col bg-neutral-100 p-10 rounded-sm">
    <div v-for="(item, index) in items" :key="index" class="bg-white rounded-sm p-8 flex flex-col gap-y-6">
      <div class="flex items-center gap-x-4">
        <div class=" w-12 h-12 border border-neutral-200 flex justify-center items-center rounded-full">
          <span>{{ `0${index + 1}` }}</span>
        </div>
        <div class="font-bold">{{ item.title }}</div>
      </div>

      <component @validate="registerValidation" @update="updateForm" :is="item.component" />
    </div>

    <NButton class="w-50 self-center mt-10" @click="register">Register</NButton>
  </div>
</template>