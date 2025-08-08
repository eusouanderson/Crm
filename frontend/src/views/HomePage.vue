<template>
  <div class="relative min-h-screen overflow-hidden">
    <Background />

    <div class="absolute inset-0 flex items-center justify-center z-50 p-4">
      <LoginBox class="w-full max-w-md rounded-xl shadow-lg p-6" />
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginBox from "@/components/molecules/LoginBox.vue";
import Background from "@/components/atoms/Background.vue";
import HomeLayout from "@/layouts/HomeLayout.vue";
</script>
