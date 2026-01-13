<template>
  <section
    class="py-24 md:py-32 bg-gradient-to-br from-primary-500 to-secondary-500 relative overflow-hidden"
  >
    <!-- Animated Background -->
    <div ref="bgContainer" class="absolute inset-0 opacity-20"></div>

    <!-- Content -->
    <div class="container mx-auto px-6 relative z-10">
      <div class="max-w-4xl mx-auto text-center text-white">
        <h2 class="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
          Comece a Economizar Hoje
        </h2>
        <p class="text-xl md:text-2xl mb-10 opacity-95 leading-relaxed">
          Junte-se a milhares de pessoas que já estão transformando suas vidas
          financeiras. 100% gratuito, para sempre.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            @click="handleRegister"
            class="px-10 py-5 bg-white text-primary-600 text-lg font-bold rounded-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
          >
            Criar Conta Gratuita
          </button>
          <button
            @click="handleLogin"
            class="px-10 py-5 bg-transparent border-2 border-white text-white text-lg font-bold rounded-lg hover:bg-white hover:text-primary-600 transition-all duration-300"
          >
            Já Tenho Conta
          </button>
        </div>

        <!-- Trust Badges -->
        <div class="flex flex-wrap justify-center gap-8 text-white/90">
          <div class="flex items-center gap-2">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="font-semibold">Dados 100% Seguros</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"
              />
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="font-semibold">100% Gratuito</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="font-semibold">Sem Cartão</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Decorative Elements -->
    <div
      class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"
    ></div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useThreeJS, useFloatingCoins } from "@/composables/useThreeJS";

const router = useRouter();
const bgContainer = ref<HTMLElement | null>(null);

const bgThree = useThreeJS(bgContainer);
let coinsAnimation: ReturnType<typeof useFloatingCoins> | null = null;

onMounted(() => {
  bgThree.initScene();
  if (bgThree.scene.value) {
    coinsAnimation = useFloatingCoins(bgThree.scene.value, 30);
    coinsAnimation.createCoins();

    bgThree.animate(() => {
      if (coinsAnimation) {
        coinsAnimation.animateCoins();
      }
    });
  }
});

onUnmounted(() => {
  bgThree.destroy();
});

const handleRegister = () => {
  router.push("/register");
};

const handleLogin = () => {
  router.push("/login");
};
</script>

<style scoped>
.container {
  max-width: 1280px;
}
</style>
