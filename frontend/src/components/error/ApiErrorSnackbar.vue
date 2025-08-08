<template>
  <v-snackbar
    v-model="visible"
    color="red darken-2"
    :timeout="timeout"
    location="top right"
    elevation="8"
    multi-line
  >
    <v-icon prepend>mdi-alert-circle</v-icon>
    {{ message }}
    <template #actions>
      <v-btn icon @click="visible = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: Boolean,
  message: String,
  timeout: {
    type: Number,
    default: 5000,
  },
});

const emit = defineEmits(["update:modelValue"]);

const visible = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newVal) => {
    visible.value = newVal;
  }
);

watch(visible, (newVal) => {
  emit("update:modelValue", newVal);
});
</script>
