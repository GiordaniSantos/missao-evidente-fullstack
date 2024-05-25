<template>
    <div class="flex items-center justify-between mb-3">
      <h1 class="text-3xl font-semibold">Benções Nupciais</h1>
      <button type="button" @click="showAddNewModal()" class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Adicionar Benção Nupcial
      </button>
    </div>
    <BencoesNupciaisTable @clickEdit="editBencaoNupcial"/>
    <BencoesNupciaisModal v-model="showBencaoNupcial" :bencaoNupcial="BencaoNupcialModel" @close="onModalClose"/>
  </template>
      
  <script setup>
    import {computed, onMounted, ref} from "vue";
    import store from "../../store";
    import Swal from 'sweetalert2'
    import BencoesNupciaisModal from "./BencoesNupciaisModal.vue";
    import BencoesNupciaisTable from "./BencoesNupciaisTable.vue";
    
    const DEFAULT__BENCAONUPCIAL = {
      id: '',
      nome: '',
      createdAt: ''
    }
    
    const BencaoNupcialModel = ref({...DEFAULT__BENCAONUPCIAL})
    const showBencaoNupcial = ref(false);
    
    function showAddNewModal() {
      store.dispatch('createBencaoNupcial')
        .then(response => {
          if (response.status === 200) {
            Swal.fire({icon: 'success', title: 'Registro Criado com Sucesso!',showConfirmButton: false,timer: 1500})
            store.dispatch('getBencoesNupciais')
          }
        })
        .catch(error => {
          Swal.fire({icon: 'error', title: 'Erro!', text: error.response.data.message,showConfirmButton: true})
        })
    }
  
    function showEditModal() {
      showBencaoNupcial.value = true
    }
    
    function editBencaoNupcial(bencaoNupcial) {
      store.dispatch('getBencaoNupcial', bencaoNupcial.id)
        .then(({data}) => {
          BencaoNupcialModel.value = data
          showEditModal();
        })
    }
    
    function onModalClose(value) {
      BencaoNupcialModel.value = value;
    }
  </script>
      