<script setup>
import RegisterLoginData from '@/components/register/steps/RegisterLoginData.vue';
import RegisterContactInfomation from '@/components/register/steps/RegisterContactInfomation.vue';
import RegisterAddressDetails from '@/components/register/steps/RegisterAddressDetails.vue';

const items = [
  {
    title: 'Login Data',
    description: 'Description for Step 1',
  },
  {
    title: 'Contact Information',
    description: 'Description for Step 2',
  },
  {
    title: 'Address Details',
    description: 'Description for Step 3',
  },
  {
    title: 'Complete Registration',
    description: 'Description for Step 3',
  },
];
</script>

<template>
  <div class="flex flex-col bg-neutral-100 p-10 rounded-sm">
    <div class="bg-white rounded-sm">
      <div class="flex items-center gap-x-4">
        <div class=" w-12 h-12 border border-neutral-200 flex justify-center items-center rounded-full">
          <span>01</span>
        </div>
        <div class="font-bold">Login Data</div>
      </div>
      <RegisterLoginData />
    </div>

    <div class="bg-white rounded-sm">
      <RegisterContactInfomation />
    </div>

    <div class="bg-white rounded-sm">
      <RegisterAddressDetails />
    </div>
  </div>
</template>