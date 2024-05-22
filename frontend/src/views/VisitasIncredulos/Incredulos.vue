<template>
    <div class="flex items-center justify-between mb-3">
        <h1 class="text-3xl font-semibold">Visitas aos Não Crentes</h1>
        <button type="button" @click="showAddNewModal()" class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Adicionar Visita ao Não Crente
        </button>
    </div>
    <IncredulosTable @clickEdit="editVisitaIncredulo"/>
    <IncredulosModal v-model="showVisitaIncredulo" :visitaIncredulo="visitaIncreduloModel" @close="onModalClose"/>
</template>
      
<script setup>
    import {computed, onMounted, ref} from "vue";
    import store from "../../store";
    import Swal from 'sweetalert2'
    import IncredulosModal from "./IncredulosModal.vue";
    import IncredulosTable from "./IncredulosTable.vue";
    
    const DEFAULT_VISITA_INCREDULO = {
      id: '',
      nome: '',
      createdAt: ''
    }
    
    const visitaIncreduloModel = ref({...DEFAULT_VISITA_INCREDULO})
    const showVisitaIncredulo = ref(false);
    
    function showAddNewModal() {
      store.dispatch('createVisitaIncredulo')
        .then(response => {
          if (response.status === 200) {
            Swal.fire({icon: 'success', title: 'Registro Criado com Sucesso!',showConfirmButton: false,timer: 1500})
            store.dispatch('getVisitasIncredulos')
          }
        })
        .catch(error => {
          Swal.fire({icon: 'error', title: 'Erro!', text: error.response.data.message,showConfirmButton: true})
        })
    }
  
    function showEditModal() {
      showVisitaIncredulo.value = true
    }
    
    function editVisitaIncredulo(visitaIncredulo) {
      store.dispatch('getVisitaIncredulo', visitaIncredulo.id)
        .then(({data}) => {
          visitaIncreduloModel.value = data
          showEditModal();
        })
    }
    
    function onModalClose(value) {
      visitaIncreduloModel.value = value;
    }
</script>
      