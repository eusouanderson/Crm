<template>
  <section
    id="features"
    class="py-24 md:py-32 bg-gradient-to-br from-gray-50 to-gray-100"
  >
    <div class="container mx-auto px-6">
      <!-- Section Header -->
      <div class="text-center mb-16 animate-on-scroll">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Funcionalidades Completas
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Tudo que você precisa para gerenciar suas finanças em uma única
          plataforma
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="card-animate bg-white p-8 md:p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
        >
          <!-- 3D Icon Container -->
          <div class="relative mb-8">
            <div
              class="w-20 h-20 rounded-2xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
              :class="feature.bgColor"
            >
              <component
                :is="feature.icon"
                class="w-10 h-10"
                :class="feature.iconColor"
              />
            </div>

            <!-- Animated Background Circle -->
            <div
              class="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              :class="feature.bgColor"
              style="filter: blur(20px); transform: scale(1.5)"
            ></div>
          </div>

          <!-- Content -->
          <h3 class="text-2xl font-bold text-gray-900 mb-4">
            {{ feature.title }}
          </h3>
          <p class="text-gray-600 leading-relaxed mb-6">
            {{ feature.description }}
          </p>

          <!-- Feature Tags -->
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in feature.tags"
              :key="tag"
              class="px-4 py-2 text-xs font-semibold rounded-full"
              :class="feature.tagColor"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Hover Effect Arrow -->
          <div
            class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300"
          >
            <svg
              class="w-6 h-6"
              :class="feature.iconColor"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Additional Features List -->
      <div class="mt-16 bg-white rounded-3xl p-10 shadow-lg animate-on-scroll">
        <h3 class="text-3xl font-bold text-gray-900 mb-8 text-center">
          E muito mais...
        </h3>

        <div class="grid md:grid-cols-2 gap-6">
          <div
            v-for="(item, index) in additionalFeatures"
            :key="index"
            class="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-all duration-300"
          >
            <div
              class="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 text-primary-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 mb-1">{{ item.title }}</h4>
              <p class="text-sm text-gray-600">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { h } from "vue";
import { useScrollAnimations } from "@/composables/useAnimations";

useScrollAnimations();

// Icons
const DashboardIcon = () =>
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
        d: "M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 13a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1v-7z",
      }),
    ]
  );

const CategoryIcon = () =>
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
        d: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z",
      }),
    ]
  );

const GoalIcon = () =>
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

const CalendarIcon = () =>
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
        d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
      }),
    ]
  );

const BellIcon = () =>
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
        d: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
      }),
    ]
  );

const ChartIcon = () =>
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
        d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      }),
    ]
  );

const features = [
  {
    title: "Dashboard Financeiro",
    description:
      "Visualize todas suas finanças em tempo real com gráficos interativos e indicadores inteligentes",
    icon: DashboardIcon,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    tagColor: "bg-blue-100 text-blue-700",
    tags: ["Tempo Real", "Interativo"],
  },
  {
    title: "Controle por Categoria",
    description:
      "Organize seus gastos em categorias personalizadas e entenda seus padrões de consumo",
    icon: CategoryIcon,
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
    tagColor: "bg-purple-100 text-purple-700",
    tags: ["Personalizado", "Organizado"],
  },
  {
    title: "Metas de Economia",
    description:
      "Defina objetivos financeiros e acompanhe seu progresso com visualizações motivadoras",
    icon: GoalIcon,
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
    tagColor: "bg-green-100 text-green-700",
    tags: ["Objetivos", "Progresso"],
  },
  {
    title: "Planejamento Mensal",
    description:
      "Crie orçamentos mensais inteligentes e receba sugestões baseadas no seu histórico",
    icon: CalendarIcon,
    bgColor: "bg-orange-100",
    iconColor: "text-orange-600",
    tagColor: "bg-orange-100 text-orange-700",
    tags: ["Orçamento", "Sugestões"],
  },
  {
    title: "Alertas Inteligentes",
    description:
      "Receba notificações sobre gastos excessivos, metas atingidas e lembretes importantes",
    icon: BellIcon,
    bgColor: "bg-red-100",
    iconColor: "text-red-600",
    tagColor: "bg-red-100 text-red-700",
    tags: ["Notificações", "Lembretes"],
  },
  {
    title: "Relatórios Visuais",
    description:
      "Gere relatórios detalhados com gráficos intuitivos para análise profunda das suas finanças",
    icon: ChartIcon,
    bgColor: "bg-indigo-100",
    iconColor: "text-indigo-600",
    tagColor: "bg-indigo-100 text-indigo-700",
    tags: ["Relatórios", "Análise"],
  },
];

const additionalFeatures = [
  {
    title: "Importação de Extratos",
    description: "Importe extratos bancários automaticamente",
  },
  {
    title: "Múltiplas Contas",
    description: "Gerencie várias contas em um só lugar",
  },
  {
    title: "Modo Escuro",
    description: "Interface adaptável para uso noturno",
  },
  {
    title: "Exportação de Dados",
    description: "Exporte seus dados em diversos formatos",
  },
  {
    title: "Sincronização em Nuvem",
    description: "Acesse de qualquer dispositivo",
  },
  {
    title: "Gráficos Comparativos",
    description: "Compare períodos diferentes facilmente",
  },
];
</script>

<style scoped>
.container {
  max-width: 1280px;
}
</style>
