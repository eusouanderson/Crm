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
      <form @submit.prevent="handleRegister">
        <div class="text-subtitle-1 text-deep-purple-darken-4 mb-2 font-comic">
          Register
        </div>
        <div class="text-caption text-decoration-none mb-2">
          <Input
            v-model="firstName"
            label="First Name"
            placeholder="Your first name"
            icon="mdi-account-outline"
            class="font-comic"
            style="
              background-color: #2b76d9;
              border-radius: 20px;
              padding: auto;
              width: 344px;
            "
          />
        </div>

        <!-- Last Name -->
        <div class="mb-2">
          <Input
            v-model="lastName"
            label="Last Name"
            placeholder="Your last name"
            icon="mdi-account-outline"
            class="font-comic"
            style="background-color: #2b76d9; border-radius: 20px"
          />
        </div>

        <!-- Email -->
        <div class="mb-2">
          <Input
            v-model="email"
            label="Email"
            placeholder="Your email address"
            icon="mdi-email-outline"
            class="font-comic"
            style="background-color: #2b76d9; border-radius: 20px"
          />
        </div>

        <!-- Password -->
        <div class="mb-2">
          <Input
            v-model="password"
            label="Password"
            placeholder="Your password"
            type="password"
            icon="mdi-lock-outline"
            showPasswordToggle="true"
            class="font-comic"
            style="background-color: #2b76d9; border-radius: 20px"
          />
        </div>

        <!-- Confirm Password -->
        <div class="mb-2">
          <Input
            v-model="confirmPassword"
            label="Confirm Password"
            placeholder="Repeat your password"
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

        <!-- Register Button -->
        <div class="flex justify-center w-full">
          <Button
            class="w-full max-w-sm font-comic"
            label="Register"
            color="primary"
            variant="elevated"
            prepend-icon="mdi-account-plus"
            :loading="isSaving"
            :disabled="isDisabled || passwordMismatch"
            style="
              background: linear-gradient(45deg, #ff5722, #ff9800);
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
import { ref, computed } from "vue";
import Input from "@/components/atoms/Input.vue";
import Button from "@/components/atoms/Button.vue";
import Logo from "@/components/atoms/Logo.vue";
import { api } from "@/services/api";

import ApiErrorSnackbar from "@/components/error/ApiErrorSnackbar.vue";

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const isSaving = ref(false);
const showError = ref(false);
const errorMsg = ref("");

const passwordMismatch = computed(
  () =>
    password.value !== confirmPassword.value && confirmPassword.value.length > 0
);

const isDisabled = computed(() => {
  return (
    !firstName.value ||
    !lastName.value ||
    !email.value ||
    !password.value ||
    !confirmPassword.value
  );
});

async function handleRegister() {
  if (passwordMismatch.value) return;

  isSaving.value = true;
  try {
    const response = await api.post("/auth/register", {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
    });

    if (!response.data.success) {
      if (Array.isArray(response.data.errors)) {
        errorMsg.value = response.data.errors

          .map((err) => `${err.field}: ${err.message}`)
          .join("\n");
      } else {
        errorMsg.value = response.data.message || response.data.error;
      }
      showError.value = true;
    } else {
      alert("Register realizado com sucesso!");
    }
  } catch (err) {
    if (Array.isArray(err.response?.data?.errors)) {
      errorMsg.value = err.response.data.errors
        .map((e) => `${e.field}: ${e.message}`)
        .join("\n");
    } else {
      errorMsg.value =
        err.response?.data?.message || "Falha na conexão com o servidor";
    }
    showError.value = true;
  } finally {
    isSaving.value = false;
  }
}
</script>
