<template>
    <div class="flex items-center justify-between mb-3">
      <h1 class="text-3xl font-semibold">Batismos Infantis</h1>
      <button type="button" @click="showAddNewModal()" class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Adicionar Batismo Infantil
      </button>
    </div>
    <BatismosInfantisTable @clickEdit="editBatismoInfantil"/>
    <BatismosInfantisModal v-model="showBatismoInfantil" :batismoInfantil="BatismoInfantilModel" @close="onModalClose"/>
  </template>
      
  <script setup>
    import {computed, onMounted, ref} from "vue";
    import store from "../../store";
    import Swal from 'sweetalert2'
    import BatismosInfantisModal from "./BatismosInfantisModal.vue";
    import BatismosInfantisTable from "./BatismosInfantisTable.vue";
    
    const DEFAULT__BATISMOINFANTIL = {
      id: '',
      nome: '',
      createdAt: ''
    }
    
    const BatismoInfantilModel = ref({...DEFAULT__BATISMOINFANTIL})
    const showBatismoInfantil = ref(false);
    
    function showAddNewModal() {
      store.dispatch('createBatismoInfantil')
        .then(response => {
          if (response.status === 200) {
            Swal.fire({icon: 'success', title: 'Registro Criado com Sucesso!',showConfirmButton: false,timer: 1500})
            store.dispatch('getBatismosInfantis')
          }
        })
        .catch(error => {
          Swal.fire({icon: 'error', title: 'Erro!', text: error.response.data.message,showConfirmButton: true})
        })
    }
  
    function showEditModal() {
      showBatismoInfantil.value = true
    }
    
    function editBatismoInfantil(batismoInfantil) {
      store.dispatch('getBatismoInfantil', batismoInfantil.id)
        .then(({data}) => {
          BatismoInfantilModel.value = data
          showEditModal();
        })
    }
    
    function onModalClose(value) {
      BatismoInfantilModel.value = value;
    }
  </script>
      