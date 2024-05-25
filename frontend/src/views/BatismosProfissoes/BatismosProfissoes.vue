<template>
    <div class="flex items-center justify-between mb-3">
      <h1 class="text-3xl font-semibold">Batismos e Profissões de Fé</h1>
      <button type="button" @click="showAddNewModal()" class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Adicionar Batismo e Profissão de Fé
      </button>
    </div>
    <BatismosProfissoesTable @clickEdit="editBatismoProfissao"/>
    <BatismosProfissoesModal v-model="showBatismoProfissao" :batismoProfissao="BatismoProfissaoModel" @close="onModalClose"/>
  </template>
      
  <script setup>
    import {computed, onMounted, ref} from "vue";
    import store from "../../store";
    import Swal from 'sweetalert2'
    import BatismosProfissoesModal from "./BatismosProfissoesModal.vue";
    import BatismosProfissoesTable from "./BatismosProfissoesTable.vue";
    
    const DEFAULT__BATISMOPROFISSAO = {
      id: '',
      nome: '',
      createdAt: ''
    }
    
    const BatismoProfissaoModel = ref({...DEFAULT__BATISMOPROFISSAO})
    const showBatismoProfissao = ref(false);
    
    function showAddNewModal() {
      store.dispatch('createBatismoProfissao')
        .then(response => {
          if (response.status === 200) {
            Swal.fire({icon: 'success', title: 'Registro Criado com Sucesso!',showConfirmButton: false,timer: 1500})
            store.dispatch('getBatismosProfissoes')
          }
        })
        .catch(error => {
          Swal.fire({icon: 'error', title: 'Erro!', text: error.response.data.message,showConfirmButton: true})
        })
    }
  
    function showEditModal() {
      showBatismoProfissao.value = true
    }
    
    function editBatismoProfissao(batismoProfissao) {
      store.dispatch('getBatismoProfissao', batismoProfissao.id)
        .then(({data}) => {
          BatismoProfissaoModel.value = data
          showEditModal();
        })
    }
    
    function onModalClose(value) {
      BatismoProfissaoModel.value = value;
    }
  </script>
      