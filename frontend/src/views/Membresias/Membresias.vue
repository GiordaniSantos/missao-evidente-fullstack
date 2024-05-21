<template>
    <div class="flex items-center justify-between mb-3">
      <h1 class="text-3xl font-semibold">Membresias</h1>
      <button type="button" @click="showAddNewModal()" class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Adicionar Membresia
      </button>
    </div>
    <MembresiasTable @clickEdit="editMembresia"/>
    <MembresiasModal v-model="showMembresia" :membresia="membresiaModel" @close="onModalClose"/>
</template>
      
<script setup>
    import {ref} from "vue";
    import store from "../../store";
    import MembresiasModal from "./MembresiaModal.vue";
    import MembresiasTable from "./MembresiasTable.vue";
    
    const DEFAULT_MEMBRESIA = {
      id: '',
      nome: '',
      createdAt: ''
    }
    
    const membresiaModel = ref({...DEFAULT_MEMBRESIA})
    const showMembresia = ref(false);
    
    function showAddNewModal() {
        membresiaModel.value = {...DEFAULT_MEMBRESIA}
        showMembresia.value = true
    }

    function showEditModal() {
        showMembresia.value = true
    }
    
    function editMembresia(membresia) {
      store.dispatch('getMembresia', membresia.id)
        .then(({data}) => {
          membresiaModel.value = data
          showEditModal();
        })
    }
    
    function onModalClose(value) {
      membresiaModel.value = value;
    }
</script>
      