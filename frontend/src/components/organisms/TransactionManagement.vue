<template>
  <v-card>
    <v-card-title class="d-flex justify-space-between align-center">
      Gerenciamento de Transações
      <v-btn color="primary" @click="openCreateForm"> Nova Transação </v-btn>
    </v-card-title>

    <v-card-text>
      <TransactionList
        :transactions="transactionStore.transactions"
        :loading="transactionStore.loading"
        @edit="openEditForm"
      />

      <v-pagination
        v-model="transactionStore.pagination.page"
        :length="
          Math.ceil(
            transactionStore.pagination.total /
              transactionStore.pagination.limit
          )
        "
        @update:modelValue="transactionStore.setPage"
      />
    </v-card-text>

    <v-dialog v-model="showForm" max-width="600">
      <TransactionForm
        :transaction="transactionStore.currentTransaction"
        @submit="handleSubmit"
        @cancel="closeForm"
      />
    </v-dialog>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useTransactionStore } from "@/store/transactionStore";
import TransactionList from "@/components/molecules/TransactionList.vue";
import TransactionForm from "@/components/molecules/TransactionForm.vue";

const transactionStore = useTransactionStore();
const showForm = ref(false);

onMounted(() => {
  transactionStore.fetchTransactions();
});

const openCreateForm = () => {
  transactionStore.setCurrentTransaction(null);
  showForm.value = true;
};

const openEditForm = (transaction: any) => {
  transactionStore.setCurrentTransaction(transaction);
  showForm.value = true;
};

const closeForm = () => {
  showForm.value = false;
};

const handleSubmit = async (formData: any) => {
  if (transactionStore.currentTransaction) {
    await transactionStore.updateTransaction(
      transactionStore.currentTransaction.id,
      formData
    );
  } else {
    await transactionStore.createTransaction(formData);
  }
  await transactionStore.fetchTransactions();
  closeForm();
};
</script>
