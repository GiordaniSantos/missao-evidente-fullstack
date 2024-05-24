<template>
    <div class="flex items-center justify-between mb-3">
      <h1 class="text-3xl font-semibold">Sermões</h1>
      <button type="button" @click="showAddNewModal()" class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Adicionar Sermao
      </button>
    </div>
    <SermoesTable @clickEdit="editSermao"/>
    <SermoesModal v-model="showSermao" :sermao="SermaoModel" @close="onModalClose"/>
  </template>
      
  <script setup>
    import {computed, onMounted, ref} from "vue";
    import store from "../../store";
    import Swal from 'sweetalert2'
    import SermoesModal from "./SermoesModal.vue";
    import SermoesTable from "./SermoesTable.vue";
    
    const DEFAULT__SERMAO = {
      id: '',
      nome: '',
      createdAt: ''
    }
    
    const SermaoModel = ref({...DEFAULT__SERMAO})
    const showSermao = ref(false);
    
    function showAddNewModal() {
      store.dispatch('createSermao')
        .then(response => {
          if (response.status === 200) {
            Swal.fire({icon: 'success', title: 'Registro Criado com Sucesso!',showConfirmButton: false,timer: 1500})
            store.dispatch('getSermoes')
          }
        })
        .catch(error => {
          Swal.fire({icon: 'error', title: 'Erro!', text: error.response.data.message,showConfirmButton: true})
        })
    }
  
    function showEditModal() {
      showSermao.value = true
    }
    
    function editSermao(sermao) {
      store.dispatch('getSermao', sermao.id)
        .then(({data}) => {
          SermaoModel.value = data
          showEditModal();
        })
    }
    
    function onModalClose(value) {
      SermaoModel.value = value;
    }
  </script>
      