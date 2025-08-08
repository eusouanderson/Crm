<template>
  <v-responsive class="mx-auto bg-dark-zinc" :max-width="maxWidth">
    <v-text-field
      v-model="model"
      :label="label"
      :type="inputType"
      :placeholder="placeholder"
      :prepend-inner-icon="icon"
      :append-inner-icon="
        showPasswordToggle ? (visible ? 'mdi-eye-off' : 'mdi-eye') : null
      "
      :hide-details="hideDetails"
      :variant="solo"
      :density="density"
      @click:append-inner="toggleVisibleLocal"
    />
  </v-responsive>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  modelValue: [String, Number],
  label: { type: String, default: "" },
  type: { type: String, default: "text" },
  placeholder: { type: String, default: "" },
  icon: { type: String, default: null },
  maxWidth: { type: [String, Number], default: 344 },
  hideDetails: { type: String, default: "auto" },
  variant: { type: String, default: "outlined" },
  density: { type: String, default: "compact" },
  showPasswordToggle: { type: Boolean, default: false },
  toggleVisible: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue"]);

const visible = ref(false);
const model = ref(props.modelValue);

watch(
  () => props.modelValue,
  (val) => (model.value = val)
);
watch(model, (val) => emit("update:modelValue", val));

watch(
  () => props.toggleVisible,
  (val) => {
    if (val) {
      visible.value = false;
    }
  },
  { immediate: true }
);

const inputType = computed(() => {
  if (props.showPasswordToggle && props.type === "password") {
    return visible.value ? "text" : "password";
  }
  return props.type;
});

function toggleVisibleLocal() {
  if (props.showPasswordToggle) {
    visible.value = !visible.value;
  }
}
</script>
