<template>
    <div class="flex items-center justify-between mb-3">
      <h1 class="text-3xl font-semibold">Estudos</h1>
      <button type="button" @click="showAddNewModal()" class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Adicionar Estudo
      </button>
    </div>
    <EstudosTable @clickEdit="editEstudo"/>
    <EstudosModal v-model="showEstudo" :estudo="EstudoModel" @close="onModalClose"/>
  </template>
      
  <script setup>
    import {computed, onMounted, ref} from "vue";
    import store from "../../store";
    import Swal from 'sweetalert2'
    import EstudosModal from "./EstudosModal.vue";
    import EstudosTable from "./EstudosTable.vue";
    
    const DEFAULT__ESTUDO = {
      id: '',
      nome: '',
      createdAt: ''
    }
    
    const EstudoModel = ref({...DEFAULT__ESTUDO})
    const showEstudo = ref(false);
    
    function showAddNewModal() {
      store.dispatch('createEstudo')
        .then(response => {
          if (response.status === 200) {
            Swal.fire({icon: 'success', title: 'Registro Criado com Sucesso!',showConfirmButton: false,timer: 1500})
            store.dispatch('getEstudos')
          }
        })
        .catch(error => {
          Swal.fire({icon: 'error', title: 'Erro!', text: error.response.data.message,showConfirmButton: true})
        })
    }
  
    function showEditModal() {
      showEstudo.value = true
    }
    
    function editEstudo(estudo) {
      store.dispatch('getEstudo', estudo.id)
        .then(({data}) => {
          EstudoModel.value = data
          showEditModal();
        })
    }
    
    function onModalClose(value) {
      EstudoModel.value = value;
    }
  </script>
      