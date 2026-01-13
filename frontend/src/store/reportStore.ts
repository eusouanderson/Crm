import { defineStore } from "pinia";
import { ref } from "vue";

export const useReportStore = defineStore("report", () => {
  const monthlySummary = ref<any>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const generateReport = async (year: number, month: number) => {
    loading.value = true;
    error.value = null;

    try {
      // TODO: Implementar chamada à API
      // const response = await api.get(`/reports/${year}/${month}`)
      // monthlySummary.value = response.data

      // Mock data por enquanto
      monthlySummary.value = {
        year,
        month,
        totalIncome: 5000,
        totalExpenses: 3500,
        balance: 1500,
        categories: [],
      };
    } catch (err) {
      error.value = "Erro ao gerar relatório";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const clearReport = () => {
    monthlySummary.value = null;
    error.value = null;
  };

  return {
    monthlySummary,
    loading,
    error,
    generateReport,
    clearReport,
  };
});
