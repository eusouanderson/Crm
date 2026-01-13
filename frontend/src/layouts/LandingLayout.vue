<template>
  <div class="landing-layout">
    <!-- Header/Navbar -->
    <header
      class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm"
    >
      <nav class="container mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <div class="flex items-center gap-2">
            <svg
              class="w-8 h-8 text-primary-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"
              />
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-2xl font-bold text-gray-900">FinancyApp</span>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center gap-8">
            <a
              href="#features"
              class="text-gray-700 hover:text-primary-500 transition-colors font-medium"
            >
              Funcionalidades
            </a>
            <a
              href="#"
              class="text-gray-700 hover:text-primary-500 transition-colors font-medium"
            >
              Preços
            </a>
            <a
              href="#"
              class="text-gray-700 hover:text-primary-500 transition-colors font-medium"
            >
              Sobre
            </a>
            <router-link
              to="/login"
              class="text-gray-700 hover:text-primary-500 transition-colors font-medium"
            >
              Entrar
            </router-link>
            <router-link
              to="/register"
              class="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Começar Grátis
            </router-link>
          </div>

          <!-- Mobile Menu Button -->
          <button
            @click="toggleMenu"
            class="md:hidden p-2 text-gray-700 hover:text-primary-500"
          >
            <svg
              v-if="!menuOpen"
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              v-else
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Mobile Menu -->
        <transition name="mobile-menu">
          <div
            v-if="menuOpen"
            class="md:hidden mt-4 py-4 border-t border-gray-200"
          >
            <div class="flex flex-col gap-4">
              <a
                href="#features"
                @click="closeMenu"
                class="text-gray-700 hover:text-primary-500 transition-colors font-medium"
              >
                Funcionalidades
              </a>
              <a
                href="#"
                @click="closeMenu"
                class="text-gray-700 hover:text-primary-500 transition-colors font-medium"
              >
                Preços
              </a>
              <a
                href="#"
                @click="closeMenu"
                class="text-gray-700 hover:text-primary-500 transition-colors font-medium"
              >
                Sobre
              </a>
              <router-link
                to="/login"
                @click="closeMenu"
                class="text-gray-700 hover:text-primary-500 transition-colors font-medium"
              >
                Entrar
              </router-link>
              <router-link
                to="/register"
                @click="closeMenu"
                class="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg text-center transition-all duration-300"
              >
                Começar Grátis
              </router-link>
            </div>
          </div>
        </transition>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="pt-20">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const closeMenu = () => {
  menuOpen.value = false;
};
</script>

<style scoped>
.container {
  max-width: 1280px;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
