<template>
  <div class="min-h-screen">
    <Logo />
    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="24"
      max-width="448"
      rounded="xl"
      style="
        background-color: #2b76d9;
        border: 4px solid #04c4d9;
        box-shadow: 8px 8px 0px #f2cb05;
      "
    >
      <form @submit.prevent="handleRecovery">
        <div class="text-subtitle-1 text-deep-purple-darken-4 mb-2 font-comic">
          Recovery
        </div>

        <div class="text-caption text-decoration-none mb-2">
          <Input
            v-model="email"
            label="Email"
            placeholder="Your email address"
            icon="mdi-email-outline"
            class="font-comic"
            style="background-color: #2b76d9; border-radius: 20px; width: 344px"
          />
        </div>

        <!-- Nova Senha -->
        <div class="mb-4">
          <Input
            v-model="newPassword"
            label="New Password"
            placeholder="Enter new password"
            type="password"
            icon="mdi-lock-outline"
            showPasswordToggle="true"
            class="font-comic"
            style="background-color: #2b76d9; border-radius: 20px"
          />
        </div>

        <div class="mb-4">
          <Input
            v-model="confirmPassword"
            label="Confirm New Password"
            placeholder="Repeat new password"
            type="password"
            icon="mdi-lock-check-outline"
            showPasswordToggle="true"
            class="font-comic"
            style="background-color: #2b76d9; border-radius: 20px"
          />
        </div>

        <div v-if="passwordMismatch" class="text-red-600 text-caption mb-2">
          ⚠️ Passwords do not match.
        </div>

        <!-- Botão -->
        <div class="flex justify-center w-full">
          <Button
            class="w-full max-w-sm font-comic"
            label="Recover Password"
            color="primary"
            variant="elevated"
            prepend-icon="mdi-lock-reset"
            :loading="isSaving"
            :disabled="isDisabled || passwordMismatch"
            style="
              background: linear-gradient(45deg, #4caf50, #8bc34a);
              border-radius: 25px;
              font-weight: bold;
            "
            type="submit"
          />
        </div>
      </form>
    </v-card>
  </div>

  <ApiErrorSnackbar v-model="showError" :message="errorMsg" />
</template>
<script setup>
import Input from "@/components/atoms/Input.vue";
import Logo from "@/components/atoms/Logo.vue";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { api } from "@/services/api";
import ApiErrorSnackbar from "@/components/error/ApiErrorSnackbar.vue";

const router = useRouter();

const email = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const isSaving = ref(false);
const showError = ref(false);
const errorMsg = ref("");

const passwordMismatch = computed(
  () =>
    newPassword.value !== confirmPassword.value &&
    confirmPassword.value.length > 0
);

const isDisabled = computed(() => {
  return !email.value || !newPassword.value || !confirmPassword.value;
});

async function handleRecovery() {
  if (passwordMismatch.value) return;

  isSaving.value = true;
  try {
    const response = await api.post("/auth/recovery", {
      email: email.value,
      newPassword: newPassword.value,
    });

    if (!response.data.success) {
      errorMsg.value = response.data.message || "Erro na recuperação";
      showError.value = true;
    } else {
      alert("Password successfully updated!");
      router.push("/login");
    }
  } catch (err) {
    errorMsg.value =
      err.response?.data?.message || "Connection with server failed";
    showError.value = true;
  } finally {
    isSaving.value = false;
  }
}
</script>
