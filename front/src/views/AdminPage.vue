<script setup>
import { onMounted, ref } from 'vue';
import NTextField from '@/components/ui/NTextField.vue';
import NButton from '@/components/ui/NButton.vue';
import NSelect from '@/components/ui/NSelect.vue';
import CategoryApi from '@/api/categories.js';

const name = ref('');
const description = ref('');
const category = ref(null);
const categories = ref([])

onMounted(async () => {
  categories.value = await CategoryApi.getCategories();
});

const createCategory = async () => {
  console.log(name);
  console.log(description);
  console.log(category);

  const category = {
    name: name.value,
    description: description.value,
    category: category.value[0]
  };

  console.log(category);


  // try {
  //   // Assuming you have a function to create a category
  //   await CategoryApi.createCategory(category);

  // } catch (error) {
  //   console.error('Error creating category:', error);
  // }
};
</script>

<template>
  <div>
    Create category
    {{ category }}
    <NSelect v-model="category" :items="categories"> </NSelect>
    <NTextField label="Category name"></NTextField>
    <NTextField label="Category description"></NTextField>

    Create product
    <NTextField label="Product name" v-model="name"></NTextField>
    <NTextField label="Product description" v-model="description"></NTextField>

    <NButton class="mt-4" @click="createCategory">Send</NButton>
  </div>
</template>