<script setup>
import NTextField from '@/components/ui/NTextField.vue';
import NOverlayBadge from '@/components/ui/NOverlayBadge.vue';
import NDivider from '@/components/ui/NDivider.vue';
import NButton from '@/components/ui/NButton.vue';
import { Menu } from '@ark-ui/vue/menu'
import logo from '@/assets/logo2.svg?url'
import { Search, ShoppingBasket, Heart, LogIn, User } from 'lucide-vue-next';
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
import { UserIcon, CreditCardIcon, SettingsIcon, UserPlusIcon, LogOutIcon } from 'lucide-vue-next';
import { useRouter } from 'vue-router';

const router = useRouter()
const userStore = useUserStore()
const isOpen = ref(false)

const logout = async () => {
  try {
    await userStore.logout()
    router.push({ name: 'login' })
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="max-w-7xl m-auto">
    <div class="h-[100px] py-4 flex justify-between gap-x-10">
      <img :src="logo" class="h-full object-cover" alt="">

      <NTextField class="flex-grow" size="lg" placeholder="Search">
        <template #prepend-icon>
          <Search />
        </template>
      </NTextField>

      <div>
        <div class="text-md text-lg font-medium">+9 999 999 99 99</div>
        <div class="flex items-center gap-x-2 text-sm">
          <div class="w-2 h-2 bg-green-500 rounded-full"></div>
          We are online now
        </div>
      </div>

      <div class="flex items-center h-[48px] gap-x-1 self-center">
        <NOverlayBadge :content="3">
          <NButton icon variant="ghost">
            <Heart color="#000" />
          </NButton>
        </NOverlayBadge>

        <NOverlayBadge :content="4">
          <NButton icon variant="ghost">
            <ShoppingBasket color="#000" />
          </NButton>
        </NOverlayBadge>

        <template v-if="userStore.isAuthenticated">
          <Menu.Root v-model:open="isOpen">
            <Menu.Trigger asChild>
              <NButton icon variant="ghost">
                <User color="#000" />
              </NButton>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content class="bg-white p-1 w-50 shadow-lg rounded-sm border border-solid border-neutral-200">
                <Menu.ItemGroup>
                  <Menu.ItemGroupLabel class="p-3 text-base font-medium">My Account</Menu.ItemGroupLabel>
                  <Menu.Separator class="text-neutral-200" />
                  <Menu.Item
                    class="mt-1 px-4 py-3 text-sm flex items-center gap-x-4 hover:bg-neutral-200 cursor-pointer rounded-sm transition-[background] duration-150"
                    value="react">
                    <UserIcon :size="18" />
                    Profile
                  </Menu.Item>
                  <Menu.Item
                    class="px-4 py-3 text-sm flex items-center gap-x-4 hover:bg-neutral-200 cursor-pointer rounded-sm transition-[background] duration-150"
                    value="solid">
                    <CreditCardIcon :size="18" />
                    Billing
                  </Menu.Item>
                  <Menu.Item
                    class="px-4 py-3 text-sm flex items-center gap-x-4 hover:bg-neutral-200 cursor-pointer rounded-sm transition-[background] duration-150"
                    value="solid">
                    <SettingsIcon :size="18" />
                    Settings
                  </Menu.Item>
                  <Menu.Item
                    class="px-4 py-3 text-sm flex items-center gap-x-4 hover:bg-neutral-200 cursor-pointer rounded-sm transition-[background] duration-150"
                    value="solid">
                    <UserPlusIcon :size="18" />
                    Invite member
                  </Menu.Item>
                  <Menu.Separator class="text-neutral-200" />
                  <Menu.Item @click="logout"
                    class="mt-1 px-4 py-3 text-sm flex items-center gap-x-4 hover:bg-neutral-200 cursor-pointer rounded-sm transition-[background] duration-150"
                    value="vue">
                    <LogOutIcon :size="18" />
                    Log out
                  </Menu.Item>
                </Menu.ItemGroup>
              </Menu.Content>
            </Menu.Positioner>
          </Menu.Root>
        </template>

        <template v-else>
          <NButton icon variant="ghost" @click="router.push({ name: 'login' })">
            <LogIn color="#000" />
          </NButton>
        </template>


      </div>
    </div>

    <NDivider />

    <div class="py-12">
      <RouterView></RouterView>
    </div>
  </div>

  <notifications position="bottom right" />
</template>

<style scoped></style>
