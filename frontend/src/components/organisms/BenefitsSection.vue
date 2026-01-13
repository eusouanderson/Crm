<template>
  <section class="py-24 md:py-32 bg-white">
    <div class="container mx-auto px-6">
      <!-- Section Header -->
      <div class="text-center mb-16 animate-on-scroll">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Por que escolher nossa plataforma?
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Transforme sua relação com o dinheiro e alcance seus objetivos
          financeiros
        </p>
      </div>

      <!-- Benefits Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="(benefit, index) in benefits"
          :key="index"
          class="card-animate bg-gradient-to-br p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
          :class="benefit.gradient"
          @mouseenter="onCardHover($event)"
          @mouseleave="onCardLeave($event)"
        >
          <!-- Icon -->
          <div
            class="w-16 h-16 rounded-full flex items-center justify-center mb-6"
            :class="benefit.iconBg"
          >
            <component
              :is="benefit.icon"
              class="w-8 h-8"
              :class="benefit.iconColor"
            />
          </div>

          <!-- Content -->
          <h3 class="text-2xl font-bold text-gray-900 mb-4">
            {{ benefit.title }}
          </h3>
          <p class="text-gray-600 leading-relaxed">
            {{ benefit.description }}
          </p>
        </div>
      </div>

      <!-- Stats Section -->
      <div
        class="mt-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-12"
      >
        <div class="grid md:grid-cols-3 gap-8 text-center text-white">
          <div class="animate-on-scroll">
            <div class="text-5xl font-bold mb-2">10k+</div>
            <div class="text-xl opacity-90">Usuários Ativos</div>
          </div>
          <div class="animate-on-scroll">
            <div class="text-5xl font-bold mb-2">R$ 5M+</div>
            <div class="text-xl opacity-90">Economizados</div>
          </div>
          <div class="animate-on-scroll">
            <div class="text-5xl font-bold mb-2">98%</div>
            <div class="text-xl opacity-90">Satisfação</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { h } from "vue";
import { useScrollAnimations } from "@/composables/useAnimations";
import { gsap } from "gsap";

// Initialize scroll animations
useScrollAnimations();

// Icon components (using SVG)
const ChartIcon = () =>
  h(
    "svg",
    {
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
    },
    [
      h("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "stroke-width": "2",
        d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      }),
    ]
  );

const WalletIcon = () =>
  h(
    "svg",
    {
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
    },
    [
      h("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "stroke-width": "2",
        d: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
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
      xmlns: "http://www.w3.org/2000/svg",
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

const EyeIcon = () =>
  h(
    "svg",
    {
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
    },
    [
      h("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "stroke-width": "2",
        d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z",
      }),
      h("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "stroke-width": "2",
        d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
      }),
    ]
  );

const benefits = [
  {
    title: "Controle Total",
    description:
      "Acompanhe todas suas receitas e despesas em tempo real com dashboards intuitivos",
    icon: ChartIcon,
    gradient: "from-green-50 to-green-100",
    iconBg: "bg-green-200",
    iconColor: "text-green-700",
  },
  {
    title: "Planejamento Simples",
    description:
      "Crie orçamentos mensais e organize suas finanças de forma prática e eficiente",
    icon: WalletIcon,
    gradient: "from-blue-50 to-blue-100",
    iconBg: "bg-blue-200",
    iconColor: "text-blue-700",
  },
  {
    title: "Economia Automática",
    description:
      "Defina metas de economia e acompanhe seu progresso automaticamente",
    icon: TargetIcon,
    gradient: "from-purple-50 to-purple-100",
    iconBg: "bg-purple-200",
    iconColor: "text-purple-700",
  },
  {
    title: "Visualização Clara",
    description:
      "Gráficos e relatórios visuais para entender para onde vai seu dinheiro",
    icon: EyeIcon,
    gradient: "from-orange-50 to-orange-100",
    iconBg: "bg-orange-200",
    iconColor: "text-orange-700",
  },
];

const onCardHover = (event: Event) => {
  const target = event.currentTarget as HTMLElement;
  gsap.to(target, {
    y: -10,
    duration: 0.3,
    ease: "power2.out",
  });
};

const onCardLeave = (event: Event) => {
  const target = event.currentTarget as HTMLElement;
  gsap.to(target, {
    y: 0,
    duration: 0.3,
    ease: "power2.out",
  });
};
</script>

<style scoped>
.container {
  max-width: 1280px;
}
</style>
