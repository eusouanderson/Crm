<template>
  <HomeLayout>
    <v-container>
      <TransactionManagement />
    </v-container>
  </HomeLayout>
</template>

<script setup lang="ts">
import HomeLayout from "@/layouts/HomeLayout.vue";
import TransactionManagement from "@/components/organisms/TransactionManagement.vue";
</script>
