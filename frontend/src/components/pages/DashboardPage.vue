<template>
  <div class="bg-slate-50/40 min-h-screen font-sans text-slate-800">
    <div class="max-w-7xl mx-auto p-4 md:p-8">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-slate-900">
          Gerenciamento Financeiro
        </h1>
        <p class="text-slate-500 mt-1">
          Visualize e controle suas finanças com facilidade.
        </p>
      </header>

      <section class="p-6 rounded-xl shadow-md mb-8">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold">
            Resumo de {{ monthLabel }} de {{ selectedYear }}
          </h2>
          <div class="flex gap-3 items-center">
            <select
              v-model="selectedMonth"
              class="p-2 rounded-lg border bg-slate-50 border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option
                v-for="month in months"
                :key="month.value"
                :value="month.value"
              >
                {{ month.label }}
              </option>
            </select>
            <input
              type="number"
              v-model="selectedYear"
              min="2000"
              max="2100"
              class="p-2 rounded-lg border w-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            class="flex items-center p-5 bg-green-100 text-green-800 rounded-lg"
          >
            <div class="p-3 bg-green-200 rounded-full mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v12m6-6H6"
                />
              </svg>
            </div>
            <div>
              <h3 class="font-medium text-slate-600">Entradas</h3>
              <p class="text-2xl font-bold">
                R$ {{ monthlySummary.total_income?.toFixed(2) ?? "0.00" }}
              </p>
            </div>
          </div>
          <div class="flex items-center p-5 bg-red-100 text-red-800 rounded-lg">
            <div class="p-3 bg-red-200 rounded-full mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M18 12H6"
                />
              </svg>
            </div>
            <div>
              <h3 class="font-medium text-slate-600">Saídas</h3>
              <p class="text-2xl font-bold">
                R$ {{ monthlySummary.total_expanse?.toFixed(2) ?? "0.00" }}
              </p>
            </div>
          </div>
          <div
            class="flex items-center p-5 rounded-lg"
            :class="
              monthlySummary.balance >= 0
                ? 'bg-blue-100 text-blue-800'
                : 'bg-orange-100 text-orange-800'
            "
          >
            <div
              class="p-3 rounded-full mr-4"
              :class="
                monthlySummary.balance >= 0 ? 'bg-blue-200' : 'bg-orange-200'
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                />
              </svg>
            </div>
            <div>
              <h3 class="font-medium text-slate-600">Saldo</h3>
              <p class="text-2xl font-bold">
                R$ {{ monthlySummary.balance?.toFixed(2) ?? "0.00" }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <main class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <aside class="lg:col-span-1 p-6 rounded-xl shadow-md h-fit">
          <div class="mb-6 border-b">
            <nav class="flex -mb-px">
              <button
                @click="activeTab = 'income'"
                :class="[
                  activeTab === 'income'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300',
                ]"
                class="w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm transition-colors"
              >
                Entradas
              </button>
              <button
                @click="activeTab = 'expense'"
                :class="[
                  activeTab === 'expense'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300',
                ]"
                class="w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm transition-colors"
              >
                Gastos
              </button>
            </nav>
          </div>

          <h3 class="text-lg font-semibold mb-4">
            Adicionar
            {{ activeTab === "income" ? "Nova Entrada" : "Novo Gasto" }}
          </h3>
          <form @submit.prevent="addTransaction" class="space-y-4">
            <FormInput
              v-model="newTransaction.description"
              label="Descrição"
              type="text"
              required
            />
            <FormInput
              v-model.number="newTransaction.amount"
              label="Valor (R$)"
              type="number"
              step="0.01"
              required
            />
            <div>
              <label class="block font-medium text-sm mb-1">Categoria</label>
              <div class="flex gap-2">
                <select
                  v-model="newTransaction.category_id"
                  required
                  class="flex-1 p-2 rounded-lg border bg-slate-50 border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option v-if="filteredCategories.length === 0" disabled>
                    Crie uma categoria primeiro
                  </option>
                  <option
                    v-for="category in filteredCategories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.name }}
                  </option>
                </select>
                <button
                  type="button"
                  @click="showCategoryModal = true"
                  class="px-3 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-bold"
                >
                  +
                </button>
              </div>
            </div>
            <FormInput
              v-model="newTransaction.date"
              label="Data"
              type="date"
              required
            />
            <button
              type="submit"
              class="w-full px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
              :class="activeTab === 'income' ? 'bg-blue-500' : 'bg-red-500'"
            >
              Adicionar
            </button>
          </form>
        </aside>

        <section class="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
          <h3 class="text-lg font-semibold mb-4">
            {{ activeTab === "income" ? "Entradas" : "Gastos" }} do Mês
          </h3>
          <div class="divide-y divide-slate-100">
            <div
              class="hidden md:grid grid-cols-5 gap-4 font-bold text-slate-500 text-sm px-4 py-2"
            >
              <span>Data</span>
              <span>Descrição</span>
              <span>Categoria</span>
              <span class="text-right">Valor</span>
              <span class="text-center">Ações</span>
            </div>
            <div
              v-if="filteredTransactions.length === 0"
              class="text-center py-10 text-slate-500"
            >
              <p>Nenhuma transação encontrada para este período.</p>
            </div>
            <div
              v-for="transaction in filteredTransactions"
              :key="transaction.id"
              class="grid grid-cols-2 md:grid-cols-5 gap-4 px-4 py-3 items-center hover:bg-slate-50 transition-colors"
            >
              <span class="md:col-span-1"
                ><strong class="md:hidden">Data: </strong
                >{{ formatDate(transaction.date) }}</span
              >
              <span
                class="md:col-span-1 truncate"
                :title="transaction.description"
                ><strong class="md:hidden">Descrição: </strong
                >{{ transaction.description }}</span
              >
              <span class="md:col-span-1 flex items-center gap-2">
                <strong class="md:hidden">Categoria: </strong>
                <span
                  class="h-2 w-2 rounded-full"
                  :style="{
                    backgroundColor: categoryMap.get(transaction.category_id)
                      ?.color,
                  }"
                ></span>
                {{ categoryMap.get(transaction.category_id)?.name ?? "N/A" }}
              </span>
              <span
                class="md:col-span-1 text-right font-medium"
                :class="
                  transaction.type === 'income'
                    ? 'text-green-600'
                    : 'text-red-600'
                "
              >
                <strong class="md:hidden">Valor: </strong>R$
                {{ transaction.amount.toFixed(2) }}
              </span>
              <span
                class="md:col-span-1 flex gap-2 justify-center mt-2 md:mt-0 col-span-2"
              >
                <button
                  @click="editTransaction(transaction)"
                  class="p-2 text-slate-500 hover:text-yellow-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"
                    />
                  </svg>
                </button>
                <button
                  @click="deleteTransaction(transaction.id!)"
                  class="p-2 text-slate-500 hover:text-red-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </span>
            </div>
          </div>
        </section>
      </main>

      <Transition name="fade">
        <Modal
          v-if="showCategoryModal"
          @close="showCategoryModal = false"
          title="Nova Categoria"
        >
          <form @submit.prevent="addCategory" class="space-y-4">
            <FormInput
              v-model="newCategory.name"
              label="Nome da Categoria"
              type="text"
              required
            />
            <div>
              <label class="block font-medium text-sm mb-1">Tipo</label>
              <select
                v-model="newCategory.type"
                required
                class="w-full p-2 rounded-lg border bg-slate-50 border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="income">Entrada</option>
                <option value="expense">Gasto</option>
              </select>
            </div>
            <FormInput
              v-model="newCategory.color"
              label="Cor"
              type="color"
              inputClass="h-10"
            />
            <button
              type="submit"
              class="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Salvar Categoria
            </button>
          </form>
        </Modal>
      </Transition>

      <Transition name="fade">
        <Modal
          v-if="editingTransaction"
          @close="editingTransaction = null"
          title="Editar Transação"
        >
          <form
            @submit.prevent="updateTransaction"
            class="space-y-4"
            v-if="editingTransaction"
          >
            <FormInput
              v-model="editingTransaction.description"
              label="Descrição"
              type="text"
              required
            />
            <FormInput
              v-model.number="editingTransaction.amount"
              label="Valor (R$)"
              type="number"
              step="0.01"
              required
            />
            <div>
              <label class="block font-medium text-sm mb-1">Categoria</label>
              <select
                v-model="editingTransaction.category_id"
                required
                class="w-full p-2 rounded-lg border bg-slate-50 border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option
                  v-for="category in filteredCategories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
            <FormInput
              v-model="editingTransaction.date"
              label="Data"
              type="date"
              required
            />
            <button
              type="submit"
              class="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Atualizar Transação
            </button>
          </form>
        </Modal>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, watchEffect } from "vue";
// Supondo que você tenha componentes reutilizáveis para formulário e modal
// Se não, pode colocar o HTML deles diretamente no template principal.
// import Modal from './Modal.vue';
// import FormInput from './FormInput.vue';
import { api } from "@/services/api";

// --- TIPOS ---
interface Category {
  id: number;
  name: string;
  color: string;
  type: "income" | "expense";
}

interface Transaction {
  id?: number;
  description: string;
  amount: number;
  category_id: number;
  date: string;
  type: "income" | "expense";
  monthly_summary_id?: number;
}

interface MonthlySummary {
  id?: number;
  year: number;
  month: number;
  total_income: number;
  total_expanse: number;
  balance: number;
}

// --- ESTADO REATIVO (Refs) ---
const activeTab = ref<"income" | "expense">("income");
const showCategoryModal = ref(false);
const editingTransaction = ref<Transaction | null>(null);

const categories = ref<Category[]>([]);
const transactions = ref<Transaction[]>([]);
const monthlySummary = ref<Partial<MonthlySummary>>({});

const selectedYear = ref(new Date().getFullYear());
const selectedMonth = ref(new Date().getMonth() + 1);

const initialTransactionState = () => ({
  description: "",
  amount: 0,
  category_id: 0,
  date: new Date().toISOString().split("T")[0],
  type: activeTab.value,
});

const newTransaction = ref(initialTransactionState());

const newCategory = ref<Omit<Category, "id">>({
  name: "",
  color: "#3b82f6", // Um azul padrão
  type: "income",
});

// --- PROPRIEDADES COMPUTADAS ---
const months = computed(() => [
  { value: 1, label: "Janeiro" },
  { value: 2, label: "Fevereiro" },
  { value: 3, label: "Março" },
  { value: 4, label: "Abril" },
  { value: 5, label: "Maio" },
  { value: 6, label: "Junho" },
  { value: 7, label: "Julho" },
  { value: 8, label: "Agosto" },
  { value: 9, label: "Setembro" },
  { value: 10, label: "Outubro" },
  { value: 11, label: "Novembro" },
  { value: 12, label: "Dezembro" },
]);

const monthLabel = computed(
  () => months.value.find((m) => m.value === selectedMonth.value)?.label ?? ""
);

const filteredCategories = computed(() =>
  categories.value.filter((cat) => cat.type === activeTab.value)
);

const filteredTransactions = computed(() =>
  transactions.value
    .filter((t) => t.type === activeTab.value)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
);

// Otimização: Crie um Map para busca rápida de categorias O(1) em vez de O(n)
const categoryMap = computed(
  () => new Map(categories.value.map((cat) => [cat.id, cat]))
);

// --- MÉTODOS ---
const formatDate = (dateString: string) => {
  // Adiciona timeZone para evitar problemas de fuso horário
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", { timeZone: "UTC" });
};

const resetTransactionForm = () => {
  newTransaction.value = initialTransactionState();
  // Garante que uma categoria válida seja selecionada
  const firstCategory = filteredCategories.value[0];
  if (firstCategory) {
    newTransaction.value.category_id = firstCategory.id;
  }
};

// --- LÓGICA DE API ---
const loadCategories = async () => {
  try {
    const { data } = await api.get<{ data: Category[] }>("/categories/list");
    categories.value = data.data;
  } catch (error) {
    console.error("❌ Erro ao carregar categorias:", error);
  }
};

const loadTransactionsForSummary = async (summaryId: number) => {
  if (!summaryId) {
    transactions.value = [];
    return;
  }
  try {
    // API deve suportar a filtragem por `monthly_summary_id` para eficiência
    const { data } = await api.get<{ data: Transaction[] }>(
      `/transactions/list?monthly_summary_id=${summaryId}`
    );
    transactions.value = data.data;
  } catch (error) {
    console.error("❌ Erro ao carregar transações:", error);
    transactions.value = []; // Limpa em caso de erro
  }
};

const fetchAllDataForPeriod = async () => {
  try {
    // 1. Tenta buscar o resumo do mês
    const { data, status } = await api.get<{ data: MonthlySummary }>(
      `/monthly-summary/find?year=${selectedYear.value}&month=${selectedMonth.value}`
    );
    monthlySummary.value = data.data;
    await loadTransactionsForSummary(data.data.id!);
  } catch (error: any) {
    // 2. Se não encontrar (404), tenta criar um novo
    if (error.response && error.response.status === 404) {
      console.log(
        `ℹ️ Resumo não encontrado para ${selectedMonth.value}/${selectedYear.value}. Criando um novo.`
      );
      try {
        const { data } = await api.post<{ data: MonthlySummary }>(
          "/monthly-summary/create",
          {
            year: selectedYear.value,
            month: selectedMonth.value,
          }
        );
        monthlySummary.value = data.data;
        transactions.value = []; // Novo mês começa sem transações
      } catch (createError) {
        console.error("❌ Erro ao criar novo resumo mensal:", createError);
        monthlySummary.value = {};
        transactions.value = [];
      }
    } else {
      console.error("❌ Erro ao carregar resumo mensal:", error);
      monthlySummary.value = {};
      transactions.value = [];
    }
  }
};

const addTransaction = async () => {
  if (!monthlySummary.value?.id) {
    alert("Resumo mensal não carregado. Não é possível adicionar transação.");
    return;
  }
  try {
    newTransaction.value.type = activeTab.value;
    await api.post("/transactions/create", {
      ...newTransaction.value,
      amount: Number(newTransaction.value.amount),
      monthly_summary_id: monthlySummary.value.id,
    });
    // Fonte da verdade: Recarrega os dados do servidor para garantir consistência
    await fetchAllDataForPeriod();
    resetTransactionForm();
  } catch (error) {
    console.error("❌ Erro ao adicionar transação:", error);
  }
};

const editTransaction = (transaction: Transaction) => {
  // Clona o objeto para evitar mutação direta e formata a data para o input type="date"
  editingTransaction.value = {
    ...transaction,
    date: transaction.date.split("T")[0],
  };
};

const updateTransaction = async () => {
  if (!editingTransaction.value?.id) return;
  try {
    await api.put(
      `/transactions/update/${editingTransaction.value.id}`,
      editingTransaction.value
    );
    editingTransaction.value = null;
    // Fonte da verdade: Recarrega os dados
    await fetchAllDataForPeriod();
  } catch (error) {
    console.error("❌ Erro ao atualizar transação:", error);
  }
};

const deleteTransaction = async (id: number) => {
  if (
    !confirm(
      "Tem certeza que deseja excluir esta transação? A ação não pode ser desfeita."
    )
  )
    return;
  try {
    await api.delete(`/transactions/delete/${id}`);
    // Fonte da verdade: Recarrega os dados
    await fetchAllDataForPeriod();
  } catch (error) {
    console.error("❌ Erro ao excluir transação:", error);
  }
};

const addCategory = async () => {
  try {
    const { data } = await api.post<{ data: Category }>(
      "/categories/create",
      newCategory.value
    );
    categories.value.push(data.data);
    showCategoryModal.value = false;
    newCategory.value = { name: "", color: "#3b82f6", type: "income" };
  } catch (error) {
    console.error("❌ Erro ao adicionar categoria:", error);
  }
};

// --- WATCHERS (Observadores) ---
watch(activeTab, (newTab) => {
  resetTransactionForm();
});

// Observa mudanças no período selecionado e recarrega os dados automaticamente
watchEffect(() => {
  fetchAllDataForPeriod();
});

// --- CICLO DE VIDA ---
onMounted(async () => {
  await loadCategories();
  // `watchEffect` já fará a chamada inicial de `fetchAllDataForPeriod`
  resetTransactionForm();
});
</script>

<style>
/* Estilos para a animação do Modal */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
