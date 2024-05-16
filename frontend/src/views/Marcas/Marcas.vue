<template>
  <div class="flex items-center justify-between mb-3">
    <h1 class="text-3xl font-semibold">Marcas</h1>
    <button type="button" @click="showAddNewModal()" class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      Adicionar Marca
    </button>
  </div>
  <MarcasTable @clickEdit="editMarca"/>
  <MarcaModal v-model="showMarcaModal" :marca="marcaModel" @close="onModalClose"/>
</template>
  
<script setup>
  import {computed, onMounted, ref} from "vue";
  import store from "../../store";
  import MarcaModal from "./MarcaModal.vue";
  import MarcasTable from "./MarcasTable.vue";
  
  const DEFAULT_MARCA = {
    id: '',
    nome: '',
  }
  
  const marcas = computed(() => store.state.marcas);
  
  const marcaModel = ref({...DEFAULT_MARCA})
  const showMarcaModal = ref(false);
  
  function showAddNewModal() {
    showMarcaModal.value = true
  }
  
  function editMarca(marca) {
    store.dispatch('getMarca', marca.id)
      .then(({data}) => {
        marcaModel.value = data
        showAddNewModal();
      })
  }
  
  function onModalClose() {
    marcaModel.value = {...DEFAULT_MARCA}
  }
</script>
  