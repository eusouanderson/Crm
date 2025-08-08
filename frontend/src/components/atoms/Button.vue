<template>
  <v-btn
    :variant="variant"
    :prepend-icon="prependIcon"
    :color="color"
    :size="size"
    :disabled="disabled"
    :loading="loading"
    :stacked="stacked"
    v-bind="$attrs"
    @click="$emit('click', $event)"
  >
    <slot>{{ label }}</slot>
  </v-btn>
</template>

<script setup lang="ts">
defineProps<{
  label?: string;
  prependIcon?: string;
  color?: string;
  variant?: "flat" | "text" | "elevated" | "tonal" | "outlined" | "plain";
  size?: string;
  disabled?: boolean;
  loading?: boolean;
  stacked?: boolean;
}>();

defineEmits(["click"]);
</script>
