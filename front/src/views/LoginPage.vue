<script setup>
import { UserRoundPlus, BaggageClaim, MonitorCog, Star, UserCheck, Mail, KeyRound } from 'lucide-vue-next';
import NTextField from '@/components/ui/NTextField.vue';
import NButton from '@/components/ui/NButton.vue';
import { ref } from 'vue';
import { useNotification } from "@kyvg/vue3-notification";
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { useFetch } from '@vueuse/core';
import user from '@/api/user';

const email = ref('');
const password = ref('');

const { notify } = useNotification()

const userStore = useUserStore()
const router = useRouter()

const login = async () => {
  try {
    await userStore.login({
      email: email.value,
      password: password.value,
    });

    notify({
      type: "success",
      title: "Success",
      text: "Hello user!",
    });

    router.push({ name: 'main' })

  } catch (error) {
    notify({
      type: "error",
      title: "Error",
      text: error.message,
    });
  }
}
</script>

<template>
  <div class="grid grid-cols-2 gap-x-12">
    <div class="bg-neutral-100 p-12 flex flex-col gap-y-6 rounded-sm">
      <div class="flex items-center gap-x-3">
        <UserRoundPlus :stroke-width="3" />
        <div class="text-2xl font-bold">I’m a new customer</div>
      </div>

      <div class="text-sm text-neutral-500">
        Not a customer yet? Please complete the registration form. Kindly note that we exclusively serve
        commercial customers. If you have forgotten your password, click on "Forgot your password?".
      </div>

      <div class="bg-white p-12 flex flex-col gap-y-6 rounded-sm">
        <div class="flex items-center gap-x-10">
          <div class="border border-neutral-300 rounded-full p-4">
            <BaggageClaim />
          </div>
          <div class="flex flex-col gap-y-2">
            <div class="text-md font-bold">Expert Technical Support</div>
            <div class="text-sm text-neutral-500">
              Our team of experts is here to assist you with any inquiries. We'll help you find the right products and
              provide expert advice along the way.
            </div>
          </div>
        </div>

        <div class="flex items-center gap-x-10">
          <div class="border border-neutral-300 rounded-full p-4">
            <MonitorCog />
          </div>
          <div class="flex flex-col gap-y-2">
            <div class="text-md font-bold">Uncompromising Quality</div>
            <div class="text-sm text-neutral-500">
              At CG Hardware, we maintain the highest standards in processing and technology. We continuously monitor
              the quality of all our products because your trust is important to us.
            </div>
          </div>
        </div>

        <div class="flex items-center gap-x-10">
          <div class="border border-neutral-300 rounded-full p-4">
            <Star />
          </div>
          <div class="flex flex-col gap-y-2">
            <div class="text-md font-bold">All-in-One Solution</div>
            <div class="text-sm text-neutral-500">
              At CG Hardware, we have the perfect solution for any challenge. With over 2,000 products available in
              our store, you can find everything you need for your work.
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-y-6">
        <div class="border-s-4 border-solid border-red-400 text-sm text-neutral-500 pl-4">
          We only accept business customers, and our New Customer Team will verify your information before approving
          your
          account.
        </div>

        <NButton class="w-50 self-center" @click="$router.push({ name: 'register' })">Register</NButton>
      </div>
    </div>

    <div>
      <div class="bg-neutral-100 p-12 flex flex-col gap-y-6 rounded-sm">
        <div class="flex items-center gap-x-3">
          <UserCheck :stroke-width="3" />
          <div class="text-2xl font-bold">I’m already a customer</div>
        </div>

        <div class="text-sm text-neutral-500">
          Log in with your email address and password
        </div>

        <div class="bg-white p-12 flex flex-col gap-y-4 rounded-sm">
          <NTextField label="Your email" placeholder="example@email.com" v-model="email">
            <template #prepend-icon>
              <Mail :size="18" />
            </template>
          </NTextField>

          <NTextField label="Your password" placeholder="Password" v-model="password">
            <template #prepend-icon>
              <KeyRound :size="18" />
            </template>
          </NTextField>

          <a href="" class="text-sm font-bold text-red-400">Forgot your password?</a>
        </div>

        <NButton class="w-50 self-center" @click="login">Log In</NButton>
      </div>
    </div>
  </div>
</template>