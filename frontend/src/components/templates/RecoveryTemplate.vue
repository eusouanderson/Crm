<template>
  <div class="h-screen flex flex-col justify-center items-center px-4">
    <h1 class="text-3xl font-bold mb-6 text-center">Template Recovery</h1>
    <div class="flex justify-center mt-6">
      <Button
        color="primary"
        variant="outlined"
        size="md"
        @click="goHome"
        class="px-6 py-2 rounded-lg shadow-md hover:bg-primary hover:text-white transition-colors"
      >
        Go to Login
      </Button>
    </div>
    <RecoveryBox />
  </div>
</template>
<script setup>
import RecoveryBox from "@/components/molecules/RecoveryBox.vue";
import Button from "@/components/atoms/Button.vue";
import router from "@/router";
function goHome() {
  router.push("/login");
}
</script>
