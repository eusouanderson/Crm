<template>
  <div class="relative w-full h-screen">
    <v-img
      class="absolute top-0 left-0 w-full h-full -z-10"
      src="/src/assets/images/background.jpg"
      cover
    >
      <template #placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular color="grey-lighten-4" indeterminate />
        </div>
      </template>
    </v-img>

    <div class="relative z-10">
      <h1 class="text-white text-center mt-20">Conteúdo da Página</h1>
    </div>
  </div>
</template>
