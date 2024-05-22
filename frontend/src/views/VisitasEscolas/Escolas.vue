<template>
    <div class="flex items-center justify-between mb-3">
        <h1 class="text-3xl font-semibold">Visitas às Escolas</h1>
        <button type="button" @click="showAddNewModal()" class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Adicionar Visita à Escola
        </button>
    </div>
    <EscolasTable @clickEdit="editVisitaEscola"/>
    <EscolasModal v-model="showVisitaEscola" :visitaEscola="visitaEscolaModel" @close="onModalClose"/>
</template>
      
<script setup>
    import {computed, onMounted, ref} from "vue";
    import store from "../../store";
    import Swal from 'sweetalert2'
    import EscolasModal from "./EscolasModal.vue";
    import EscolasTable from "./EscolasTable.vue";
    
    const DEFAULT_VISITA_ESCOLA = {
      id: '',
      nome: '',
      createdAt: ''
    }
    
    const visitaEscolaModel = ref({...DEFAULT_VISITA_ESCOLA})
    const showVisitaEscola = ref(false);
    
    function showAddNewModal() {
      store.dispatch('createVisitaEscola')
        .then(response => {
          if (response.status === 200) {
            Swal.fire({icon: 'success', title: 'Registro Criado com Sucesso!',showConfirmButton: false,timer: 1500})
            store.dispatch('getVisitasEscolas')
          }
        })
        .catch(error => {
          Swal.fire({icon: 'error', title: 'Erro!', text: error.response.data.message,showConfirmButton: true})
        })
    }
  
    function showEditModal() {
      showVisitaEscola.value = true
    }
    
    function editVisitaEscola(visitaEscola) {
      store.dispatch('getVisitaEscola', visitaEscola.id)
        .then(({data}) => {
          visitaEscolaModel.value = data
          showEditModal();
        })
    }
    
    function onModalClose(value) {
      visitaEscolaModel.value = value;
    }
</script>
      