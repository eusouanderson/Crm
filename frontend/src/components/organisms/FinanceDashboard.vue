<template>
  <v-row>
    <v-col cols="12" md="4">
      <FinanceSummaryCard
        title="Receitas"
        :value="summary?.totalIncome || 0"
        color="green"
        icon="mdi-arrow-up"
      />
    </v-col>
    <v-col cols="12" md="4">
      <FinanceSummaryCard
        title="Despesas"
        :value="summary?.totalExpense || 0"
        color="red"
        icon="mdi-arrow-down"
      />
    </v-col>
    <v-col cols="12" md="4">
      <FinanceSummaryCard
        title="Saldo"
        :value="summary?.balance || 0"
        :color="(summary?.balance || 0) >= 0 ? 'green' : 'red'"
        icon="mdi-scale-balance"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useReportStore } from "@/store/reportStore";

const reportStore = useReportStore();
const summary = ref<any>(null);

onMounted(async () => {
  const date = new Date();
  await reportStore.fetchMonthlySummary(
    date.getFullYear(),
    date.getMonth() + 1
  );
  summary.value = reportStore.monthlySummary;
});
</script>
