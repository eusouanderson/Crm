<template>
  <section class="py-24 md:py-32 bg-white">
    <div class="container mx-auto px-6">
      <!-- Section Header -->
      <div class="text-center mb-16 animate-on-scroll">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Como Funciona?
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Comece a controlar suas finanças em 4 passos simples
        </p>
      </div>

      <!-- Steps Container -->
      <div class="relative max-w-5xl mx-auto">
        <!-- Connection Line (Desktop) -->
        <div
          class="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 transform -translate-y-1/2"
          style="z-index: 0"
        ></div>

        <!-- Steps Grid -->
        <div class="grid lg:grid-cols-4 gap-8 relative z-10">
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="card-animate flex flex-col items-center text-center"
          >
            <!-- Step Number Circle -->
            <div
              class="relative w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-lg transform transition-all duration-300 hover:scale-110"
              :class="step.bgColor"
            >
              <span class="text-3xl font-bold" :class="step.textColor">{{
                index + 1
              }}</span>

              <!-- Pulse Effect -->
              <div
                class="absolute inset-0 rounded-full animate-ping opacity-20"
                :class="step.bgColor"
                style="animation-duration: 2s"
              ></div>
            </div>

            <!-- Icon -->
            <div class="mb-4">
              <component
                :is="step.icon"
                class="w-16 h-16"
                :class="step.iconColor"
              />
            </div>

            <!-- Content -->
            <h3 class="text-2xl font-bold text-gray-900 mb-3">
              {{ step.title }}
            </h3>
            <p class="text-gray-600 leading-relaxed">
              {{ step.description }}
            </p>

            <!-- Arrow for Mobile -->
            <div v-if="index < steps.length - 1" class="lg:hidden mt-8">
              <svg
                class="w-8 h-8 text-primary-500 animate-bounce"
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
          </div>
        </div>
      </div>

      <!-- Interactive Demo Section -->
      <div
        class="mt-20 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl p-10 animate-on-scroll"
      >
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left - Visual -->
          <div class="relative">
            <div
              ref="demoContainer"
              class="w-full h-80 bg-white rounded-2xl shadow-xl overflow-hidden"
            ></div>

            <!-- Floating Action Cards -->
            <div
              class="absolute -right-4 top-10 bg-white rounded-lg shadow-xl p-4 animate-float"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <div class="text-left">
                  <p class="text-xs text-gray-500">Nova Receita</p>
                  <p class="text-sm font-bold text-green-600">+R$ 5.000</p>
                </div>
              </div>
            </div>

            <div
              class="absolute -left-4 bottom-10 bg-white rounded-lg shadow-xl p-4 animate-float"
              style="animation-delay: 0.5s"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20 12H4"
                    />
                  </svg>
                </div>
                <div class="text-left">
                  <p class="text-xs text-gray-500">Despesa</p>
                  <p class="text-sm font-bold text-red-600">-R$ 150</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right - Content -->
          <div>
            <h3 class="text-3xl font-bold text-gray-900 mb-6">
              Pronto para começar?
            </h3>
            <p class="text-lg text-gray-600 mb-8 leading-relaxed">
              Junte-se a milhares de usuários que já estão transformando suas
              vidas financeiras. É rápido, fácil e totalmente gratuito!
            </p>

            <!-- Features List -->
            <div class="space-y-4 mb-8">
              <div class="flex items-center gap-3">
                <svg
                  class="w-6 h-6 text-primary-500 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="text-gray-700">Cadastro em menos de 1 minuto</span>
              </div>
              <div class="flex items-center gap-3">
                <svg
                  class="w-6 h-6 text-primary-500 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="text-gray-700"
                  >Sem necessidade de cartão de crédito</span
                >
              </div>
              <div class="flex items-center gap-3">
                <svg
                  class="w-6 h-6 text-primary-500 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="text-gray-700"
                  >Acesso a todas as funcionalidades</span
                >
              </div>
            </div>

            <button
              @click="handleStartNow"
              class="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Criar Conta Gratuita
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, h } from "vue";
import { useRouter } from "vue-router";
import { useScrollAnimations } from "@/composables/useAnimations";
import { useThreeJS, useFloatingCoins } from "@/composables/useThreeJS";

const router = useRouter();
const demoContainer = ref<HTMLElement | null>(null);

useScrollAnimations();

// Icons
const UserIcon = () =>
  h(
    "svg",
    {
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24",
    },
    [
      h("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "stroke-width": "2",
        d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
      }),
    ]
  );

const PlusIcon = () =>
  h(
    "svg",
    {
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24",
    },
    [
      h("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "stroke-width": "2",
        d: "M12 4v16m8-8H4",
      }),
    ]
  );

const TargetIcon = () =>
  h(
    "svg",
    {
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24",
    },
    [
      h("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "stroke-width": "2",
        d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      }),
    ]
  );

const TrophyIcon = () =>
  h(
    "svg",
    {
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24",
    },
    [
      h("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "stroke-width": "2",
        d: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
      }),
    ]
  );

const steps = [
  {
    title: "Cadastre-se",
    description:
      "Crie sua conta gratuita em menos de 1 minuto. Sem complicação, sem taxas.",
    icon: UserIcon,
    bgColor: "bg-primary-500",
    textColor: "text-white",
    iconColor: "text-primary-500",
  },
  {
    title: "Adicione Transações",
    description:
      "Registre suas receitas e despesas de forma rápida e intuitiva.",
    icon: PlusIcon,
    bgColor: "bg-secondary-500",
    textColor: "text-white",
    iconColor: "text-secondary-500",
  },
  {
    title: "Defina Metas",
    description:
      "Estabeleça objetivos financeiros e acompanhe seu progresso em tempo real.",
    icon: TargetIcon,
    bgColor: "bg-purple-500",
    textColor: "text-white",
    iconColor: "text-purple-500",
  },
  {
    title: "Economize",
    description:
      "Visualize seus gastos, identifique oportunidades e alcance suas metas.",
    icon: TrophyIcon,
    bgColor: "bg-green-500",
    textColor: "text-white",
    iconColor: "text-green-500",
  },
];

// Initialize 3D demo
const demoThree = useThreeJS(demoContainer);
let coinsAnimation: ReturnType<typeof useFloatingCoins> | null = null;

onMounted(() => {
  demoThree.initScene();
  if (demoThree.scene.value) {
    coinsAnimation = useFloatingCoins(demoThree.scene.value, 10);
    coinsAnimation.createCoins();

    demoThree.animate(() => {
      if (coinsAnimation) {
        coinsAnimation.animateCoins();
      }
    });
  }
});

onUnmounted(() => {
  demoThree.destroy();
});

const handleStartNow = () => {
  router.push("/register");
};
</script>

<style scoped>
.container {
  max-width: 1280px;
}
</style>
