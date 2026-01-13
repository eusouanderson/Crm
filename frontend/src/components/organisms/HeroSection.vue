<template>
  <section
    class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50"
  >
    <!-- Background 3D Canvas -->
    <div ref="canvasContainer" class="absolute inset-0 z-0 opacity-30"></div>

    <!-- Content -->
    <div class="container mx-auto px-6 py-20 z-10">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Left Side - Text Content -->
        <div class="text-left animate-slide-in-left">
          <h1
            class="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Controle suas
            <span class="text-primary-500 block">Finanças</span>
            de forma simples
          </h1>

          <p class="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            Organize receitas, despesas e metas financeiras em um só lugar.
            Economia inteligente ao seu alcance.
          </p>

          <div class="flex flex-col sm:flex-row gap-4">
            <button
              @click="handleCTA"
              @mouseenter="onHover"
              @mouseleave="onLeave"
              ref="ctaButton"
              class="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Começar Agora Grátis
            </button>

            <button
              @click="scrollToFeatures"
              class="px-8 py-4 bg-white hover:bg-gray-50 text-primary-500 text-lg font-semibold rounded-lg border-2 border-primary-500 transition-all duration-300"
            >
              Ver Funcionalidades
            </button>
          </div>

          <!-- Trust Indicators -->
          <div class="mt-12 flex items-center gap-8 text-sm text-gray-500">
            <div class="flex items-center gap-2">
              <svg
                class="w-5 h-5 text-primary-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>100% Gratuito</span>
            </div>
            <div class="flex items-center gap-2">
              <svg
                class="w-5 h-5 text-primary-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>Dados Seguros</span>
            </div>
            <div class="flex items-center gap-2">
              <svg
                class="w-5 h-5 text-primary-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>Sem Cartão</span>
            </div>
          </div>
        </div>

        <!-- Right Side - 3D Animated Dashboard -->
        <div class="relative animate-slide-in-right">
          <div
            ref="dashboardContainer"
            class="w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl"
          ></div>

          <!-- Floating Stats Cards -->
          <div
            class="absolute -left-4 top-20 bg-white rounded-lg shadow-xl p-4 animate-float"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div>
                <p class="text-xs text-gray-500">Economia</p>
                <p class="text-lg font-bold text-green-600">+R$ 2.400</p>
              </div>
            </div>
          </div>

          <div
            class="absolute -right-4 bottom-20 bg-white rounded-lg shadow-xl p-4 animate-float"
            style="animation-delay: 0.5s"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div>
                <p class="text-xs text-gray-500">Meta Atingida</p>
                <p class="text-lg font-bold text-blue-600">87%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div
      class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
    >
      <svg
        class="w-6 h-6 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useThreeJS, useAnimatedChart } from "@/composables/useThreeJS";
import { gsap } from "gsap";

const router = useRouter();
const canvasContainer = ref<HTMLElement | null>(null);
const dashboardContainer = ref<HTMLElement | null>(null);
const ctaButton = ref<HTMLElement | null>(null);

// Initialize Three.js for background
const backgroundThree = useThreeJS(canvasContainer);

// Initialize Three.js for dashboard
const dashboardThree = useThreeJS(dashboardContainer);
let chartAnimation: ReturnType<typeof useAnimatedChart> | null = null;

onMounted(() => {
  // Background coins animation
  backgroundThree.initScene();
  if (backgroundThree.scene.value) {
    const { useFloatingCoins } = require("@/composables/useThreeJS");
    const { createCoins, animateCoins } = useFloatingCoins(
      backgroundThree.scene.value,
      20
    );
    createCoins();

    backgroundThree.animate(() => {
      animateCoins();
    });
  }

  // Dashboard chart animation
  dashboardThree.initScene();
  if (dashboardThree.scene.value) {
    chartAnimation = useAnimatedChart(dashboardThree.scene.value);
    chartAnimation.createChart();

    dashboardThree.animate(() => {
      if (chartAnimation) {
        chartAnimation.animateChart();
      }
    });
  }
});

onUnmounted(() => {
  backgroundThree.destroy();
  dashboardThree.destroy();
});

const handleCTA = () => {
  router.push("/register");
};

const scrollToFeatures = () => {
  const featuresSection = document.getElementById("features");
  if (featuresSection) {
    featuresSection.scrollIntoView({ behavior: "smooth" });
  }
};

const onHover = (event: Event) => {
  const target = event.target as HTMLElement;
  gsap.to(target, {
    scale: 1.05,
    duration: 0.3,
    ease: "power2.out",
  });
};

const onLeave = (event: Event) => {
  const target = event.target as HTMLElement;
  gsap.to(target, {
    scale: 1,
    duration: 0.3,
    ease: "power2.out",
  });
};
</script>

<style scoped>
.container {
  max-width: 1280px;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }

  p {
    font-size: 1.125rem;
  }
}
</style>
