<template>
    <div class="flex items-center justify-between mb-3">
      <h1 class="text-3xl font-semibold">Estudos Biblicos</h1>
      <button type="button" @click="showAddNewModal()" class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Adicionar Estudo Biblico
      </button>
    </div>
    <EstudosBiblicosTable @clickEdit="editEstudoBiblico"/>
    <EstudosBiblicosModal v-model="showEstudoBiblico" :estudoBiblico="EstudoBiblicoModel" @close="onModalClose"/>
  </template>
      
  <script setup>
    import {computed, onMounted, ref} from "vue";
    import store from "../../store";
    import Swal from 'sweetalert2'
    import EstudosBiblicosModal from "./EstudosBiblicosModal.vue";
    import EstudosBiblicosTable from "./EstudosBiblicosTable.vue";
    
    const DEFAULT__ESTUDOBIBLICO = {
      id: '',
      nome: '',
      createdAt: ''
    }
    
    const EstudoBiblicoModel = ref({...DEFAULT__ESTUDOBIBLICO})
    const showEstudoBiblico = ref(false);
    
    function showAddNewModal() {
      store.dispatch('createEstudoBiblico')
        .then(response => {
          if (response.status === 200) {
            Swal.fire({icon: 'success', title: 'Registro Criado com Sucesso!',showConfirmButton: false,timer: 1500})
            store.dispatch('getEstudosBiblicos')
          }
        })
        .catch(error => {
          Swal.fire({icon: 'error', title: 'Erro!', text: error.response.data.message,showConfirmButton: true})
        })
    }
  
    function showEditModal() {
      showEstudoBiblico.value = true
    }
    
    function editEstudoBiblico(estudoBiblico) {
      store.dispatch('getEstudoBiblico', estudoBiblico.id)
        .then(({data}) => {
          EstudoBiblicoModel.value = data
          showEditModal();
        })
    }
    
    function onModalClose(value) {
      EstudoBiblicoModel.value = value;
    }
  </script>
      