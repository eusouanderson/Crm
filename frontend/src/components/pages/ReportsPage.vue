<template>
  <HomeLayout>
    <v-container>
      <v-card>
        <v-card-title>Relatórios Financeiros</v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-select v-model="year" :items="yearOptions" label="Ano" />
            </v-col>
            <v-col cols="12" md="6">
              <v-select v-model="month" :items="monthOptions" label="Mês" />
            </v-col>
          </v-row>

          <v-btn color="primary" @click="generateReport">
            Gerar Relatório
          </v-btn>

          <FinanceDashboard v-if="reportStore.monthlySummary" class="mt-6" />
        </v-card-text>
      </v-card>
    </v-container>
  </HomeLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useReportStore } from "@/store/reportStore";
import HomeLayout from "@/layouts/HomeLayout.vue";
import FinanceDashboard from "@/components/organisms/FinanceDashboard.vue";

const reportStore = useReportStore();

const year = ref(new Date().getFullYear());
const month = ref(new Date().getMonth() + 1);

const yearOptions = Array.from({ length: 10 }, (_, i) => year.value - 5 + i);
const monthOptions = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
  title: new Date(2000, i, 1).toLocaleDateString("pt-BR", { month: "long" }),
}));

const generateReport = async () => {
  await reportStore.fetchMonthlySummary(year.value, month.value);
};
</script>
