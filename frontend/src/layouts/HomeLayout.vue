<template>
  <div class="relative min-h-screen flex flex-col">
    <HeaderTemplate />

    <div class="flex flex-1">
      <SideBarTemplate />
      <main class="flex-grow p-4">
        <h1>Olá, Página Home</h1>
      </main>
    </div>

    <FooterTemplate />
  </div>
</template>

<script setup>
import FooterTemplate from "@/components/templates/FooterTemplate.vue";
import HeaderTemplate from "@/components/templates/HeaderTemplate.vue";
</script>
