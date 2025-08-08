<template>
  <div
    class="flex items-center justify-center my-10 group cursor-pointer bg-zinc-50/10 rounded-2xl transition-all duration-300 hover:scale-105"
  >
    <div
      class="relative h-16 w-16 mr-4 animate-bounce group-hover:animate-spin"
    >
      <img
        :src="logo"
        alt="Financy Logo"
        class="h-full w-full object-contain drop-shadow-lg transition-all duration-500 group-hover:rotate-12"
      />
      <div
        class="absolute inset-0 rounded-full bg-blue-100 opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-300"
      ></div>
    </div>

    <h1 class="text-4xl font-extrabold tracking-tight">
      <span
        class="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400"
      >
        Financy
      </span>
      <span
        class="ml-2 text-xs font-medium bg-blue-100 text-blue-600 px-2 py-1 rounded-full align-super"
      >
        PRO
      </span>
    </h1>
  </div>
</template>

<script setup>
import logo from "@/assets/logo.png";
</script>

<style>
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}
.animate-bounce {
  animation: bounce 2s infinite ease-in-out;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.group:hover .animate-spin {
  animation: spin 1s linear infinite;
}
</style>
