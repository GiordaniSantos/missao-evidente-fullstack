<template>
  <div class="flex items-center justify-between mb-3">
    <h1 class="text-3xl font-semibold">Visitas Crentes</h1>
    <button type="button" @click="showAddNewModal()" class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      Adicionar Visita ao Crente
    </button>
  </div>
  <CrentesTable @clickEdit="editVisitaCrente"/>
  <VisitaCrenteModal v-model="showVisitaCrente" :visitaCrente="visitaCrenteModel" @close="onModalClose"/>
</template>
    
<script setup>
  import {computed, onMounted, ref} from "vue";
  import store from "../../store";
  import VisitaCrenteModal from "./VisitaCrenteModal.vue";
  import CrentesTable from "./CrentesTable.vue";
  
  const DEFAULT_VISITA_CRENTE = {
    id: '',
    nome: '',
    createdAt: ''
  }
  
  const visitasCrentes = computed(() => store.state.visitaCrente);
  
  const visitaCrenteModel = ref({...DEFAULT_VISITA_CRENTE})
  const showVisitaCrente = ref(false);
  
  function showAddNewModal() {
    showVisitaCrente.value = true
  }
  
  function editVisitaCrente(visitaCrente) {
    store.dispatch('getVisitaCrente', visitaCrente.id)
      .then(({data}) => {
        visitaCrenteModel.value = data
        showAddNewModal();
      })
  }
  
  function onModalClose() {
    visitaCrenteModel.value = {...DEFAULT_VISITA_CRENTE}
  }
</script>
    