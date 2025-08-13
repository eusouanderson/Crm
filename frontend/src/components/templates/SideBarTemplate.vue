<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-list>
      <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";

const drawer = ref(true);
const items = ref([
  { title: "Dashboard", icon: "mdi-view-dashboard", to: "/dashboard" },
  { title: "Transações", icon: "mdi-cash", to: "/transactions" },
  { title: "Categorias", icon: "mdi-shape", to: "/categories" },
  { title: "Relatórios", icon: "mdi-chart-bar", to: "/reports" },
]);
</script>
