<template>
    <div class="flex items-center justify-between mb-3">
      <h1 class="text-3xl font-semibold">Discipulados</h1>
      <button type="button" @click="showAddNewModal()" class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Adicionar Discipulado
      </button>
    </div>
    <DiscipuladosTable @clickEdit="editDiscipulado"/>
    <DiscipuladosModal v-model="showDiscipulado" :discipulado="DiscipuladoModel" @close="onModalClose"/>
  </template>
      
  <script setup>
    import {computed, onMounted, ref} from "vue";
    import store from "../../store";
    import Swal from 'sweetalert2'
    import DiscipuladosModal from "./DiscipuladosModal.vue";
    import DiscipuladosTable from "./DiscipuladosTable.vue";
    
    const DEFAULT__DISCIPULADO = {
      id: '',
      nome: '',
      createdAt: ''
    }
    
    const DiscipuladoModel = ref({...DEFAULT__DISCIPULADO})
    const showDiscipulado = ref(false);
    
    function showAddNewModal() {
      store.dispatch('createDiscipulado')
        .then(response => {
          if (response.status === 200) {
            Swal.fire({icon: 'success', title: 'Registro Criado com Sucesso!',showConfirmButton: false,timer: 1500})
            store.dispatch('getDiscipulados')
          }
        })
        .catch(error => {
          Swal.fire({icon: 'error', title: 'Erro!', text: error.response.data.message,showConfirmButton: true})
        })
    }
  
    function showEditModal() {
      showDiscipulado.value = true
    }
    
    function editDiscipulado(discipulado) {
      store.dispatch('getDiscipulado', discipulado.id)
        .then(({data}) => {
          DiscipuladoModel.value = data
          showEditModal();
        })
    }
    
    function onModalClose(value) {
      DiscipuladoModel.value = value;
    }
  </script>
      