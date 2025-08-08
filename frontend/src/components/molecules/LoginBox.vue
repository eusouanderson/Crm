<template>
  <div class="min-h-screen">
    <v-img
      class="mx-auto my-6 animate-bounce"
      max-width="228"
      src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
    ></v-img>

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
      <div class="text-subtitle-1 text-deep-purple-darken-4 mb-2 font-comic">
        Account
      </div>
      <div class="text-caption text-decoration-none mb-2">
        <Input
          v-model="Email"
          label="Email"
          placeholder="Your email address"
          icon="mdi-email-outline"
          class="font-comic"
          style="background-color: #2b76d9; border-radius: 20px"
        />
      </div>

      <div
        class="text-subtitle-1 text-deep-purple-darken-4 d-flex align-center justify-space-between mt-2 font-comic"
      >
        Password

        <a
          class="text-caption text-decoration-none text-blue-darken-4 mb-2 font-comic hover:underline hover:text-red-500"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Forgot login password?
        </a>
      </div>
      <div class="text-caption text-decoration-none mb-2">
        <Input
          v-model="Password"
          label="Password"
          placeholder="Your Password"
          type="password"
          icon="mdi-lock-outline"
          showPasswordToggle="true"
          class="font-comic"
          style="background-color: #2b76d9; border-radius: 20px"
          @click:append-inner="toggleVisible()"
        />
      </div>

      <v-card
        class="mb-12 mt-1"
        color="orange-lighten-4"
        variant="tonal"
        style="border: 2px dashed #ff5722; border-radius: 15px"
      >
        <v-card-text class="text-deep-orange-darken-4 text-caption font-comic">
          ⚠️ Warning: After 3 consecutive failed login attempts, your account
          will be temporarily locked for three hours. If you must login now, you
          can also click "Forgot login password?" below to reset the login
          password.
        </v-card-text>
      </v-card>

      <div class="flex justify-center w-full">
        <Button
          class="w-full max-w-sm font-comic"
          label="Enviar"
          color="primary"
          variant="elevated"
          prepend-icon="mdi-content-save"
          :loading="isSaving"
          :disabled="isDisabled"
          style="
            background: linear-gradient(45deg, #ff5722, #ff9800);
            border-radius: 25px;
            font-weight: bold;
            transform: scale(1);
            transition: all 0.3s;
          "
          @mouseover="this.style.transform = 'scale(1.05)'"
          @mouseout="this.style.transform = 'scale(1)'"
          @click="handleSend"
        />
      </div>

      <v-card-text class="text-center">
        <a
          class="text-blue-darken-4 text-decoration-none font-comic hover:text-red-500 hover:underline"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Sign up now
          <v-icon icon="mdi-chevron-right" class="animate-pulse"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import Input from "@/components/atoms/Input.vue";
import Button from "@/components/atoms/Button.vue";

function toggleVisible(forceHide = false) {
  if (props.showPasswordToggle) {
    visible.value = forceHide ? false : !visible.value;
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap");

.font-comic {
  font-family: "Comic Neue", cursive;
}

.v-card {
  transition: all 0.3s ease;
}

.v-card:hover {
  transform: translateY(-5px);
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(2.05);
  }
  100% {
    transform: scale(1);
  }
}

.animate-pulse {
  animation: pulse 2s infinite;
}

/* Adicionando sombras exageradas */
.v-btn--elevated {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19);
}
</style>
