<template>
    <div class="flex items-center justify-between mb-3">
        <h1 class="text-3xl font-semibold">Visitas aos Hospitais</h1>
        <button type="button" @click="showAddNewModal()" class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Adicionar Visita ao Hospital
        </button>
    </div>
    <HospitaisTable @clickEdit="editVisitaHospital"/>
    <HospitaisModal v-model="showVisitaHospital" :visitaHospital="visitaHospitalModel" @close="onModalClose"/>
</template>
      
<script setup>
    import {computed, onMounted, ref} from "vue";
    import store from "../../store";
    import Swal from 'sweetalert2'
    import HospitaisModal from "./HospitaisModal.vue";
    import HospitaisTable from "./HospitaisTable.vue";
    
    const DEFAULT_VISITA_HOSPITAL = {
      id: '',
      nome: '',
      createdAt: ''
    }
    
    const visitaHospitalModel = ref({...DEFAULT_VISITA_HOSPITAL})
    const showVisitaHospital = ref(false);
    
    function showAddNewModal() {
      store.dispatch('createVisitaHospital')
        .then(response => {
          if (response.status === 200) {
            Swal.fire({icon: 'success', title: 'Registro Criado com Sucesso!',showConfirmButton: false,timer: 1500})
            store.dispatch('getVisitasHospitais')
          }
        })
        .catch(error => {
          Swal.fire({icon: 'error', title: 'Erro!', text: error.response.data.message,showConfirmButton: true})
        })
    }
  
    function showEditModal() {
      showVisitaHospital.value = true
    }
    
    function editVisitaHospital(visitaHospital) {
      store.dispatch('getVisitaHospital', visitaHospital.id)
        .then(({data}) => {
          visitaHospitalModel.value = data
          showEditModal();
        })
    }
    
    function onModalClose(value) {
      visitaHospitalModel.value = value;
    }
</script>
      