<template>
  <v-app>
    <v-main class="main-wrapper">
      <div class="relative min-h-screen overflow-hidden">
        <Background class="background-layer" />
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<style lang="css" scoped>
.main-wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
}

.background-layer {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
}

.content-layer {
  position: relative;
  z-index: 1;
}

.relative {
  min-height: 100vh;
}
</style>
