<template>
    <div class="flex items-center justify-between mb-3">
        <h1 class="text-3xl font-semibold">Visitas aos Enfermos</h1>
        <button type="button" @click="showAddNewModal()" class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Adicionar Visita ao Enfermo
        </button>
    </div>
    <EnfermosTable @clickEdit="editVisitaEnfermo"/>
    <EnfermosModal v-model="showVisitaEnfermo" :visitaEnfermo="visitaEnfermoModel" @close="onModalClose"/>
</template>
      
<script setup>
    import {computed, onMounted, ref} from "vue";
    import store from "../../store";
    import Swal from 'sweetalert2'
    import EnfermosModal from "./EnfermosModal.vue";
    import EnfermosTable from "./EnfermosTable.vue";
    
    const DEFAULT_VISITA_ENFERMO = {
      id: '',
      nome: '',
      createdAt: ''
    }
    
    const visitaEnfermoModel = ref({...DEFAULT_VISITA_ENFERMO})
    const showVisitaEnfermo = ref(false);
    
    function showAddNewModal() {
      store.dispatch('createVisitaEnfermo')
        .then(response => {
          if (response.status === 200) {
            Swal.fire({icon: 'success', title: 'Registro Criado com Sucesso!',showConfirmButton: false,timer: 1500})
            store.dispatch('getVisitasEnfermos')
          }
        })
        .catch(error => {
          Swal.fire({icon: 'error', title: 'Erro!', text: error.response.data.message,showConfirmButton: true})
        })
    }
  
    function showEditModal() {
      showVisitaEnfermo.value = true
    }
    
    function editVisitaEnfermo(visitaEnfermo) {
      store.dispatch('getVisitaEnfermo', visitaEnfermo.id)
        .then(({data}) => {
          visitaEnfermoModel.value = data
          showEditModal();
        })
    }
    
    function onModalClose(value) {
      visitaEnfermoModel.value = value;
    }
</script>
      