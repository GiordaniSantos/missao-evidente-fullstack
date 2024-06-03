<template>
    <div class="flex items-center justify-between mb-3">
      <h1 class="text-3xl font-semibold">Membresias</h1>
      <div>
        <label for="comungante" class="block text-sm font-medium leading-6 text-gray-900">Comungantes</label>
        <div class="mt-2">
          <input id="comungante" v-model="comungante.quantidade" @change="onSubmit('comungante')" name="quantidade" type="number" autocomplete="quantidade" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
      <div>
        <label for="naoComungante" class="block text-sm font-medium leading-6 text-gray-900">Não Comungantes</label>
        <div class="mt-2">
          <input id="naoComungante" v-model="naoComungante.quantidade" @change="onSubmit('naoComungante')" name="quantidade" type="number" autocomplete="quantidade" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
      <button type="button" @click="showAddNewModal()" class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Adicionar Membresia
      </button>
    </div>
    <MembresiasTable @clickEdit="editMembresia"/>
    <MembresiasModal v-model="showMembresia" :membresia="membresiaModel" @close="onModalClose"/>
</template>
      
<script setup>
    import {ref, onMounted} from "vue";
    import store from "../../store";
    import MembresiasModal from "./MembresiaModal.vue";
    import MembresiasTable from "./MembresiasTable.vue";
    import Swal from 'sweetalert2'
    
    const DEFAULT_MEMBRESIA = {
      id: '',
      nome: '',
      createdAt: ''
    }

    const comungante = ref({
      id: '',
      quantidade: 0,
      nome: "Primeiro Domingo",
      tipo: "Comungante"
    })

    const naoComungante = ref({
      id: '',
      quantidade: 0,
      nome: "Primeiro Domingo",
      tipo: "Não Comungante"
    })

    function getComungante() {
      store.dispatch('getComungante')
        .then(({data}) => {
          comungante.value = data
        })
    }

    function getNaoComungante() {
      store.dispatch('getNaoComungante')
        .then(({data}) => {
          naoComungante.value = data
        })
    }

    onMounted(() => {
      getComungante();
      getNaoComungante();
    })
    
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

    function onSubmit(tipo) {
      let frequencia = null;
      tipo == 'comungante' ? frequencia = comungante.value : frequencia = naoComungante.value; 
      if (comungante.value.id) {
        store.dispatch('updateMembresia', frequencia)
          .then(response => {
            if (response.status === 200) {
              Swal.fire({icon: 'success', title: 'Registro Atualizado com Sucesso!',showConfirmButton: false,timer: 1500})
            }
          })
          .catch(error => {
            Swal.fire({icon: 'error', title: 'Erro!', text: error.response.data.message,showConfirmButton: true})
          });
      } else {
        store.dispatch('createMembresia', frequencia)
          .then(response => {
            if (response.status === 200) {
              Swal.fire({icon: 'success', title: 'Registro Cadastrado com Sucesso!',showConfirmButton: false,timer: 1500})
            }
          })
          .catch(error => {
            console.log(error)
            Swal.fire({icon: 'error', title: 'Erro!', text: error.response.data.message,showConfirmButton: true})
          })
      }
    }
</script>
      