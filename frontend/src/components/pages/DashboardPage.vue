<template>
  <HomeLayout>
    <v-container>
      <FinanceDashboard />

      <v-row class="mt-6">
        <v-col cols="12" md="8">
          <TransactionList
            :transactions="transactionStore.transactions.slice(0, 5)"
            :loading="transactionStore.loading"
            @edit="editTransaction"
          />
          <v-btn block class="mt-4" @click="$router.push('/transactions')">
            Ver Todas as Transações
          </v-btn>
        </v-col>

        <v-col cols="12" md="4">
          <CategoryList
            :categories="categoryStore.categories"
            :loading="categoryStore.loading"
            @edit="editCategory"
          />
        </v-col>
      </v-row>
    </v-container>
  </HomeLayout>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useTransactionStore } from "@/store/transactionStore";
import { useCategoryStore } from "@/store/categoryStore";
import HomeLayout from "@/layouts/HomeLayout.vue";
import FinanceDashboard from "@/components/organisms/FinanceDashboard.vue";
import TransactionList from "@/components/molecules/TransactionList.vue";
import CategoryList from "@/components/molecules/CategoryList.vue";

const transactionStore = useTransactionStore();
const categoryStore = useCategoryStore();

onMounted(() => {
  transactionStore.fetchTransactions({ limit: 5 });
  categoryStore.fetchCategories();
});

const editTransaction = (transaction: any) => {
  transactionStore.setCurrentTransaction(transaction);
  // Implemente a navegação ou abra o formulário
};

const editCategory = (category: any) => {
  categoryStore.setCurrentCategory(category);
  // Implemente a navegação ou abra o formulário
};
</script>
