<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts"></script>
<style lang="css">
html,
body,
#app,
.v-application {
  height: 100%;
  margin: 0;
  padding: 0;
}

/* Para garantir que o v-main ocupe toda a área disponível */
.v-main {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}
</style>
