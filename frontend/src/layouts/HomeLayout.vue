<template>
  <v-app>
    <HeaderTemplate />
    <SideBarTemplate />

    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>

    <FooterTemplate />
  </v-app>
</template>

<script setup lang="ts">
import HeaderTemplate from "@/components/templates/HeaderTemplate.vue";
import SideBarTemplate from "@/components/templates/SideBarTemplate.vue";
import FooterTemplate from "@/components/templates/FooterTemplate.vue";
</script>
