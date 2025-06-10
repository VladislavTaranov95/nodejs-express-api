<script setup>
import NButton from '@/components/ui/NButton.vue';
import NRating from '@/components/ui/NRating.vue';
import { Heart } from 'lucide-vue-next';
import { useIntersectionObserver } from '@vueuse/core';
import { ref } from 'vue';
import { onBeforeMount } from 'vue';
import ProductsApi from '@/api/products';

const page = ref(1);
const limit = (10);
const products = ref([])

onBeforeMount(async () => {
  loadProducts()

})

const loadProducts = async () => {
  isLoading.value = true

  const params = {
    page: page.value,
    limit,
  }
  const response = await ProductsApi.getProducts(params)
  const data = response.data

  isLoading.value = false

  products.value = [...products.value, ...data]

  page.value++
}


const target = ref(null)
const isLoading = ref(false)

useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
    if (isIntersecting && !isLoading.value) {
      loadProducts()
    }
  },
)
</script>

<template>
  <div>
    <div class="grid grid-cols-5 gap-y-10 gap-x-6">
      <template v-for="product in products" :key="product.id">
        <div class="flex flex-col items-center gap-y-6">
          <img :src="`http://localhost:3000/uploads/${product.images[0]}`" class="h-[200px]" alt="">
          <div class="flex flex-col gap-y-2 self-start w-full">
            <div class="flex justify-between">
              <div>{{ product.price }}$</div>
              <Heart :stroke-width="1.5" />
            </div>
            <div class="flex items-center gap-x-2">
              <!-- <NRating size="sm" :count="product.rating.rate" />
              <div class="text-sm">{{ product.rating.count }}</div> -->
            </div>

            <div class="w-full overflow-ellipsis overflow-hidden whitespace-nowrap">{{ product.name }}</div>
          </div>
          <NButton class="w-full">Add to cart</NButton>
        </div>
      </template>

      <div ref="target" class="h-10"></div>

      <div v-if="isLoading" class="text-center mt-4">
        Loading more products...
      </div>
    </div>
  </div>
</template>