<template>
  <v-form @submit.prevent="submit">
    <v-text-field v-model="form.title" label="Título" required />
    <v-text-field v-model="form.amount" label="Valor" type="number" required />
    <v-select
      v-model="form.type"
      :items="['income', 'expense']"
      label="Tipo"
      required
    />
    <v-select
      v-model="form.categoryId"
      :items="categories"
      item-title="name"
      item-value="id"
      label="Categoria"
    />
    <v-checkbox v-model="form.isRecurring" label="Recorrente?" />
    <v-textarea v-model="form.description" label="Descrição" />
    <v-btn type="submit" color="primary">Salvar</v-btn>
  </v-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCategoryStore } from "@/stores/category";

const categoryStore = useCategoryStore();
const categories = await categoryStore.fetchCategories();

const form = ref({
  title: "",
  amount: 0,
  type: "expense",
  categoryId: null,
  isRecurring: false,
  description: "",
});

const emit = defineEmits(["submit"]);

const submit = () => {
  emit("submit", form.value);
};
</script>
