<template>
  <footer class="bg-gray-900 text-gray-300 py-12">
    <div class="container mx-auto px-6">
      <div class="grid md:grid-cols-4 gap-8 mb-8">
        <!-- Brand Column -->
        <div>
          <div class="flex items-center gap-2 mb-4">
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
            <span class="text-2xl font-bold text-white">FinancyApp</span>
          </div>
          <p class="text-sm leading-relaxed">
            Controle suas finanças de forma simples e eficiente. Economia
            inteligente ao seu alcance.
          </p>
        </div>

        <!-- Product Column -->
        <div>
          <h3 class="text-white font-bold mb-4">Produto</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <a
                href="#features"
                class="hover:text-primary-400 transition-colors"
                >Funcionalidades</a
              >
            </li>
            <li>
              <a href="#" class="hover:text-primary-400 transition-colors"
                >Preços</a
              >
            </li>
            <li>
              <a href="#" class="hover:text-primary-400 transition-colors"
                >Atualizações</a
              >
            </li>
            <li>
              <a href="#" class="hover:text-primary-400 transition-colors"
                >Roadmap</a
              >
            </li>
          </ul>
        </div>

        <!-- Company Column -->
        <div>
          <h3 class="text-white font-bold mb-4">Empresa</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <a href="#" class="hover:text-primary-400 transition-colors"
                >Sobre Nós</a
              >
            </li>
            <li>
              <a href="#" class="hover:text-primary-400 transition-colors"
                >Blog</a
              >
            </li>
            <li>
              <a href="#" class="hover:text-primary-400 transition-colors"
                >Carreiras</a
              >
            </li>
            <li>
              <a href="#" class="hover:text-primary-400 transition-colors"
                >Contato</a
              >
            </li>
          </ul>
        </div>

        <!-- Support Column -->
        <div>
          <h3 class="text-white font-bold mb-4">Suporte</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <a href="#" class="hover:text-primary-400 transition-colors"
                >Central de Ajuda</a
              >
            </li>
            <li>
              <a href="#" class="hover:text-primary-400 transition-colors"
                >FAQ</a
              >
            </li>
            <li>
              <a href="#" class="hover:text-primary-400 transition-colors"
                >Tutoriais</a
              >
            </li>
            <li>
              <a href="#" class="hover:text-primary-400 transition-colors"
                >API</a
              >
            </li>
          </ul>
        </div>
      </div>

      <!-- Social Links -->
      <div class="border-t border-gray-800 pt-8 mt-8">
        <div
          class="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <!-- Copyright -->
          <div class="text-sm text-gray-400">
            © {{ currentYear }} FinancyApp. Todos os direitos reservados.
          </div>

          <!-- Social Icons -->
          <div class="flex gap-4">
            <a
              href="#"
              class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
              </svg>
            </a>
            <a
              href="#"
              class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                />
              </svg>
            </a>
            <a
              href="#"
              class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.717-.962 5.107-1.358 6.778-.168.708-.5.945-.822 .968-.696.064-1.226-.46-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.015-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.751-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.333-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.121.099.154.232.17.326.016.094.037.308.021.475z"
                />
              </svg>
            </a>
            <a
              href="#"
              class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                />
              </svg>
            </a>
          </div>

          <!-- Legal Links -->
          <div class="flex gap-6 text-sm text-gray-400">
            <a href="#" class="hover:text-primary-400 transition-colors"
              >Privacidade</a
            >
            <a href="#" class="hover:text-primary-400 transition-colors"
              >Termos</a
            >
            <a href="#" class="hover:text-primary-400 transition-colors"
              >Cookies</a
            >
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from "vue";

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
.container {
  max-width: 1280px;
}
</style>
