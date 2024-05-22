<template>
    <div class="flex items-center justify-between mb-3">
        <h1 class="text-3xl font-semibold">Visitas aos Presídios</h1>
        <button type="button" @click="showAddNewModal()" class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Adicionar Visita ao Presídio
        </button>
    </div>
    <PresidiosTable @clickEdit="editVisitaPresidio"/>
    <PresidiosModal v-model="showVisitaPresidio" :visitaPresidio="visitaPresidioModel" @close="onModalClose"/>
</template>
      
<script setup>
    import {computed, onMounted, ref} from "vue";
    import store from "../../store";
    import Swal from 'sweetalert2'
    import PresidiosModal from "./PresidiosModal.vue";
    import PresidiosTable from "./PresidiosTable.vue";
    
    const DEFAULT_VISITA_PRESIDIO = {
      id: '',
      nome: '',
      createdAt: ''
    }
    
    const visitaPresidioModel = ref({...DEFAULT_VISITA_PRESIDIO})
    const showVisitaPresidio = ref(false);
    
    function showAddNewModal() {
      store.dispatch('createVisitaPresidio')
        .then(response => {
          if (response.status === 200) {
            Swal.fire({icon: 'success', title: 'Registro Criado com Sucesso!',showConfirmButton: false,timer: 1500})
            store.dispatch('getVisitasPresidios')
          }
        })
        .catch(error => {
          Swal.fire({icon: 'error', title: 'Erro!', text: error.response.data.message,showConfirmButton: true})
        })
    }
  
    function showEditModal() {
      showVisitaPresidio.value = true
    }
    
    function editVisitaPresidio(visitaPresidio) {
      store.dispatch('getVisitaPresidio', visitaPresidio.id)
        .then(({data}) => {
          visitaPresidioModel.value = data
          showEditModal();
        })
    }
    
    function onModalClose(value) {
      visitaPresidioModel.value = value;
    }
</script>
      