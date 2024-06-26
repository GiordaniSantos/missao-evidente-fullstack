<template>
    <div class="bg-white p-4 rounded-lg shadow animate-fade-in-down">
      <div class="flex justify-between border-b-2 pb-3">
        <div class="flex items-center">
          <span class="whitespace-nowrap mr-3">Por Página</span>
          <select @change="getEstudosBiblicos(null)" v-model="perPage" class="appearance-none relative block w-24 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span class="ml-3">Encontrado {{estudosBiblicos.total}} Estudos Biblicos</span>
        </div>
        <div>
          <input v-model="search" @change="getEstudosBiblicos(null)" class="appearance-none relative block w-48 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Procurar por assunto">
        </div>
      </div>
      <table class="table-auto w-full">
        <thead>
          <tr>
            <TableHeaderCell field="id" :sort-field="sortField" :sort-direction="sortDirection" @click="sortEstudosBiblicos('id')">
              ID
            </TableHeaderCell>
            <TableHeaderCell field="createdAt" :sort-field="sortField" :sort-direction="sortDirection" @click="sortEstudosBiblicos('createdAt')">
              Data
            </TableHeaderCell>
            <TableHeaderCell field="nome" :sort-field="sortField" :sort-direction="sortDirection" @click="sortEstudosBiblicos('nome')">
              Assunto
            </TableHeaderCell>
            <TableHeaderCell field="actions">
              Ações
            </TableHeaderCell>
          </tr>
        </thead>
        <tbody v-if="estudosBiblicos.loading || !estudosBiblicos.data.length">
          <tr>
            <td colspan="6">
              <Spinner v-if="estudosBiblicos.loading"/>
              <p v-else class="text-center py-8 text-gray-700">
                Não há Estudos Biblicos
              </p>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr v-for="(estudoBiblico, index) of estudosBiblicos.data">
            <td class="border-b p-2 ">
              {{ estudoBiblico.id }}
            </td>
            <td class="border-b p-2 max-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis">
              {{ formatDate(estudoBiblico.createdAt) }}
            </td>
            <td class="border-b p-2 max-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis">
              {{ estudoBiblico.nome }}
            </td>
            <td class="border-b p-2 ">
              <Menu as="div" class="relative inline-block text-left">
                <div>
                  <MenuButton class="inline-flex items-center justify-center w-full justify-center rounded-full w-10 h-10 bg-opacity-0 text-sm font-medium text-white hover:bg-opacity-5 focus:bg-opacity-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    <PlusCircleIcon class="mr-2 h-5 w-5 text-indigo-400 hover:text-indigo-800" aria-hidden="true"/>
                  </MenuButton>
                </div>
                <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
                  <MenuItems class="absolute z-10 right-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div class="px-1 py-1">
                      <MenuItem v-slot="{ active }">
                        <button :class="[ active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm',]" @click="editEstudoBiblico(estudoBiblico)">
                          <PencilIcon :active="active" class="mr-2 h-5 w-5 text-indigo-400" aria-hidden="true"/>
                          Editar
                        </button>
                      </MenuItem>
                      <MenuItem v-slot="{ active }">
                        <button :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900','group flex w-full items-center rounded-md px-2 py-2 text-sm',]" @click="deleteEstudoBiblico(estudoBiblico)">
                          <TrashIcon :active="active" class="mr-2 h-5 w-5 text-indigo-400" aria-hidden="true"/>
                          Excluir
                        </button>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </transition>
              </Menu>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="!estudosBiblicos.loading" class="flex justify-between items-center mt-5">
        <div v-if="estudosBiblicos.data.length">
          Mostrando página {{ estudosBiblicos.page }} de {{ estudosBiblicos.totalPage }}
        </div>
        <nav v-if="estudosBiblicos.total > estudosBiblicos.limit" class="relative z-0 inline-flex justify-center rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
          <a
            v-for="(link, i) of estudosBiblicos.links"
            :key="i"
            :disabled="!link.url"
            href="#"
            @click="getForPage($event, link)"
            aria-current="page"
            class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap"
            :class="[
                link.active
                  ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                i === 0 ? 'rounded-l-md' : '',
                i === estudosBiblicos.links.length - 1 ? 'rounded-r-md' : '',
                !link.url ? ' bg-gray-100 text-gray-700': ''
              ]"
            v-html="link.label"
          >
          </a>
        </nav>
      </div>
    </div>
  </template>
  
  <script setup>
    import {computed, onMounted, ref} from "vue";
    import store from "../../store";
    import Spinner from "../../components/core/Spinner.vue";
    import {ITENS_PER_PAGE} from "../../constants";
    import TableHeaderCell from "../../components/core/Table/TableHeaderCell.vue";
    import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/vue";
    import {PencilIcon, TrashIcon, PlusCircleIcon} from '@heroicons/vue/24/outline'
    import moment from "moment/dist/moment"
    import pt from "moment/dist/locale/pt-br"
    //import estudobiblicoModal from "./estudobiblicoModal.vue";
    import Swal from 'sweetalert2'
  
    const perPage = ref(ITENS_PER_PAGE);
    const search = ref('');
    const estudosBiblicos = computed(() => store.state.estudosBiblicos);
    const sortField = ref('updatedAt');
    const sortDirection = ref('desc')
  
    const estudobiblico = ref({})
    const showEstudoBiblicoModal = ref(false);
  
    const emit = defineEmits(['clickEdit'])
  
    onMounted(() => {
      getEstudosBiblicos();
    })
  
    const formatDate = (date) => {
      return moment(date).format('dddd, D [de] MMMM [de] YYYY')+" às "+moment(date).format('HH:mm')+"h";
    }
  
    function getForPage(ev, link) {
      ev.preventDefault();
      if (!link.url || link.active) {
        return;
      }
  
      getEstudosBiblicos(link.url)
    }
  
    function getEstudosBiblicos(url = null) {
      store.dispatch("getEstudosBiblicos", {
        url,
        search: search.value,
        per_page: perPage.value,
        sort_field: sortField.value,
        sort_direction: sortDirection.value
      });
    }
  
    function sortEstudosBiblicos(field) {
      if (field === sortField.value) {
        if (sortDirection.value === 'desc') {
          sortDirection.value = 'asc'
        } else {
          sortDirection.value = 'desc'
        }
      } else {
        sortField.value = field;
        sortDirection.value = 'asc'
      }
  
      getEstudosBiblicos()
    }
  
    function showAddNewModal() {
      showEstudoBiblicoModal.value = true
    }
  
    function deleteEstudoBiblico(estudoBiblico) {
      Swal.fire({
        title: 'Tem certeza que deseja excluir este registro?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancelar",
        icon: 'warning'
      }).then((result) => {
          if (result.isConfirmed) {
            store.dispatch('deleteEstudoBiblico', estudoBiblico.id)
            .then(res => {
              Swal.fire({icon: 'success', title: 'Registro Excluido com Sucesso!',showConfirmButton: false,timer: 1500})
              store.dispatch('getEstudosBiblicos')
            })
          } else {
            Swal.fire('Cancelado', '', 'error')
          }
      })
    }
  
    function editEstudoBiblico(estudoBiblico) {
      emit('clickEdit', estudoBiblico)
    }
  </script>
  