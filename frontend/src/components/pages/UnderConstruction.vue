<template>
  <div
    class="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 h-screen flex items-center justify-center overflow-hidden font-sans"
  >
    <div class="text-center text-white px-5">
      <!-- Icon / illustration -->
      <div class="mb-8">
        <svg
          class="w-24 h-24 mx-auto bounce-slow"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <!-- Main heading -->
      <h1
        class="text-6xl md:text-8xl font-extrabold tracking-tight mb-4 drop-shadow-lg"
      >
        Under Construction
      </h1>

      <!-- Subheading -->
      <p class="text-xl md:text-2xl mb-6 drop-shadow-md">
        We're working hard to bring something amazing!
      </p>

      <!-- Animated loader dots -->
      <div class="flex justify-center space-x-2 mt-6">
        <span
          class="block w-3 h-3 bg-white rounded-full animate-bounce delay-75"
        ></span>
        <span
          class="block w-3 h-3 bg-white rounded-full animate-bounce delay-150"
        ></span>
        <span
          class="block w-3 h-3 bg-white rounded-full animate-bounce delay-300"
        ></span>
      </div>

      <!-- Optional button -->
      <router-link
        to="/"
        class="mt-8 inline-block px-6 py-3 bg-white text-purple-600 font-bold rounded-lg shadow-lg hover:bg-purple-50 transition"
      >
        Go Back Home
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// Nenhuma lógica complexa é necessária aqui
</script>

<style scoped>
@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}
.bounce-slow {
  animation: bounce-slow 2s infinite;
}
</style>
