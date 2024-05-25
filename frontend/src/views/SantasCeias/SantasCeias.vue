<template>
    <div class="flex items-center justify-between mb-3">
      <h1 class="text-3xl font-semibold">Santas Ceias</h1>
      <button type="button" @click="showAddNewModal()" class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Adicionar Santa Ceia
      </button>
    </div>
    <SantasCeiasTable @clickEdit="editSantaCeia"/>
    <SantasCeiasModal v-model="showSantaCeia" :santaCeia="SantaCeiaModel" @close="onModalClose"/>
  </template>
      
  <script setup>
    import {computed, onMounted, ref} from "vue";
    import store from "../../store";
    import Swal from 'sweetalert2'
    import SantasCeiasModal from "./SantasCeiasModal.vue";
    import SantasCeiasTable from "./SantasCeiasTable.vue";
    
    const DEFAULT__SANTACEIA = {
      id: '',
      createdAt: ''
    }
    
    const SantaCeiaModel = ref({...DEFAULT__SANTACEIA})
    const showSantaCeia = ref(false);
    
    function showAddNewModal() {
      store.dispatch('createSantaCeia')
        .then(response => {
          if (response.status === 200) {
            Swal.fire({icon: 'success', title: 'Registro Criado com Sucesso!',showConfirmButton: false,timer: 1500})
            store.dispatch('getSantasCeias')
          }
        })
        .catch(error => {
          Swal.fire({icon: 'error', title: 'Erro!', text: error.response.data.message,showConfirmButton: true})
        })
    }
  
    function showEditModal() {
      showSantaCeia.value = true
    }
    
    function editSantaCeia(santaceia) {
      store.dispatch('getSantaCeia', santaceia.id)
        .then(({data}) => {
          SantaCeiaModel.value = data
          showEditModal();
        })
    }
    
    function onModalClose(value) {
      SantaCeiaModel.value = value;
    }
  </script>
      