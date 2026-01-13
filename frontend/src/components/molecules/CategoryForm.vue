<template>
  <v-form @submit.prevent="handleSubmit">
    <v-text-field
      v-model="name"
      label="Nome da Categoria"
      :rules="[rules.required]"
      required
    />

    <v-text-field v-model="description" label="Descrição" />

    <v-select
      v-model="type"
      :items="typeOptions"
      label="Tipo"
      :rules="[rules.required]"
      required
    />

    <v-btn type="submit" color="primary" class="mt-4">
      {{ submitText }}
    </v-btn>
  </v-form>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
  initialData?: {
    name?: string;
    description?: string;
    type?: string;
  };
  submitText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  submitText: "Salvar",
});

const emit = defineEmits<{
  submit: [data: { name: string; description: string; type: string }];
}>();

const name = ref(props.initialData?.name || "");
const description = ref(props.initialData?.description || "");
const type = ref(props.initialData?.type || "expense");

const typeOptions = [
  { title: "Despesa", value: "expense" },
  { title: "Receita", value: "income" },
];

const rules = {
  required: (v: string) => !!v || "Campo obrigatório",
};

const handleSubmit = () => {
  emit("submit", {
    name: name.value,
    description: description.value,
    type: type.value,
  });
};
</script>
