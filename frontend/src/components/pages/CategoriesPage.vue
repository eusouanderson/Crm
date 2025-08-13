<template>
  <HomeLayout>
    <v-container>
      <CategoryManagement />
    </v-container>
  </HomeLayout>
</template>

<script setup lang="ts">
import HomeLayout from "@/layouts/HomeLayout.vue";
import CategoryManagement from "@/components/organisms/CategoryManagement.vue";
</script>
