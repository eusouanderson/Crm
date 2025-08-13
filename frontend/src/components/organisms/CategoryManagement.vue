<template>
  <v-card>
    <v-card-title class="d-flex justify-space-between align-center">
      Gerenciamento de Categorias
      <v-btn color="primary" @click="openCreateForm"> Nova Categoria </v-btn>
    </v-card-title>

    <v-card-text>
      <CategoryList
        :categories="categoryStore.categories"
        :loading="categoryStore.loading"
        @edit="openEditForm"
      />
    </v-card-text>

    <v-dialog v-model="showForm" max-width="600">
      <CategoryForm
        :category="categoryStore.currentCategory"
        @submit="handleSubmit"
        @cancel="closeForm"
      />
    </v-dialog>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useCategoryStore } from "@/store/categoryStore";
import CategoryList from "@/components/molecules/CategoryList.vue";
import CategoryForm from "@/components/molecules/CategoryForm.vue";

const categoryStore = useCategoryStore();
const showForm = ref(false);

onMounted(() => {
  categoryStore.fetchCategories();
});

const openCreateForm = () => {
  categoryStore.setCurrentCategory(null);
  showForm.value = true;
};

const openEditForm = (category: any) => {
  categoryStore.setCurrentCategory(category);
  showForm.value = true;
};

const closeForm = () => {
  showForm.value = false;
};

const handleSubmit = async (formData: any) => {
  if (categoryStore.currentCategory) {
    await categoryStore.updateCategory(
      categoryStore.currentCategory.id,
      formData
    );
  } else {
    await categoryStore.createCategory(formData);
  }
  await categoryStore.fetchCategories();
  closeForm();
};
</script>
