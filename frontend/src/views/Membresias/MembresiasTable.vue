<template>
    <div class="bg-white p-4 rounded-lg shadow animate-fade-in-down">
      <div class="flex justify-between border-b-2 pb-3">
        <div class="flex items-center">
          <span class="whitespace-nowrap mr-3">Por Página</span>
          <select @change="getMembresias(null)" v-model="perPage" class="appearance-none relative block w-24 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span class="ml-3">Encontrado {{membresias.total}} Registros de Membresia</span>
        </div>
        <div>
          <input v-model="search" @change="getMembresias(null)" class="appearance-none relative block w-48 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Procurar Membresia">
        </div>
      </div>
      <table class="table-auto w-full">
        <thead>
          <tr>
            <TableHeaderCell field="id" :sort-field="sortField" :sort-direction="sortDirection" @click="sortMembresias('id')">
              ID
            </TableHeaderCell>
            <TableHeaderCell field="createdAt" :sort-field="sortField" :sort-direction="sortDirection"  @click="sortMembresias('createdAt')">
              Data
            </TableHeaderCell>
            <TableHeaderCell field="nome" :sort-field="sortField" :sort-direction="sortDirection" @click="sortMembresias('nome')">
              Relação
            </TableHeaderCell>
            <TableHeaderCell field="quantidade" :sort-field="sortField" :sort-direction="sortDirection" @click="sortMembresias('quantidade')">
              Quantidade
            </TableHeaderCell>
            <TableHeaderCell field="actions">
              Ações
            </TableHeaderCell>
          </tr>
        </thead>
        <tbody v-if="membresias.loading || !membresias.data.length">
          <tr>
            <td colspan="6">
              <Spinner v-if="membresias.loading"/>
              <p v-else class="text-center py-8 text-gray-700">
                Não há Membresias
              </p>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr v-for="(membresia, index) of membresias.data">
            <td class="border-b p-2 ">
              {{ membresia.id }}
            </td>
            <td class="border-b p-2 max-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis">
              {{ formatDate(membresia.createdAt) }}
            </td>
            <td class="border-b p-2 max-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis">
              {{ membresia.nome }}
            </td>
            <td class="border-b p-2 max-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis">
              {{ membresia.quantidade }}
            </td>
            <td class="border-b p-2 ">
              <Menu as="div" class="relative inline-block text-left">
                <div>
                  <MenuButton class="inline-flex items-center justify-center w-full justify-center rounded-full w-10 h-10 bg-opacity-0 text-sm font-medium text-white hover:bg-opacity-5 focus:bg-opacity-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    <PlusCircleIcon class="h-5 w-5 text-indigo-400 hover:text-indigo-800" aria-hidden="true"/>
                  </MenuButton>
                </div>
                <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
                  <MenuItems class="absolute z-10 right-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div class="px-1 py-1">
                      <MenuItem v-slot="{ active }">
                        <button :class="[ active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm',]" @click="editMembresia(membresia)">
                          <PencilIcon :active="active" class="mr-2 h-5 w-5 text-indigo-400" aria-hidden="true"/>
                          Editar
                        </button>
                      </MenuItem>
                      <MenuItem v-slot="{ active }">
                        <button :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900','group flex w-full items-center rounded-md px-2 py-2 text-sm',]" @click="deleteMembresia(membresia)">
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
      <div v-if="!membresias.loading" class="flex justify-between items-center mt-5">
        <div v-if="membresias.data.length">
          Mostrando página {{ membresias.page }} de {{ membresias.totalPage }}
        </div>
        <nav v-if="membresias.total > membresias.limit" class="relative z-0 inline-flex justify-center rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
          <a
            v-for="(link, i) of membresias.links"
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
                i === membresias.links.length - 1 ? 'rounded-r-md' : '',
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
    //import membresiaModal from "./membresiaModal.vue";
    import Swal from 'sweetalert2'
  
    const perPage = ref(ITENS_PER_PAGE);
    const search = ref('');
    const membresias = computed(() => store.state.membresias);
    const sortField = ref('createdAt');
    const sortDirection = ref('desc')

  
    const emit = defineEmits(['clickEdit'])
  
    onMounted(() => {
      getMembresias();
    })
  
    const formatDate = (date) => {
      return moment(date).format('dddd, D [de] MMMM [de] YYYY');
    }
  
    function getForPage(ev, link) {
      ev.preventDefault();
      if (!link.url || link.active) {
        return;
      }
  
      getMembresias(link.url)
    }
  
    function getMembresias(url = null) {
      store.dispatch("getMembresias", {
        url,
        search: search.value,
        per_page: perPage.value,
        sort_field: sortField.value,
        sort_direction: sortDirection.value
      });
    }
  
    function sortMembresias(field) {
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
  
      getMembresias()
    }
  
    function deleteMembresia(membresia) {
      Swal.fire({
        title: 'Tem certeza que deseja excluir este registro?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancelar",
        icon: 'warning'
      }).then((result) => {
          if (result.isConfirmed) {
            store.dispatch('deleteMembresia', membresia.id)
            .then(res => {
              Swal.fire({icon: 'success', title: 'Registro Excluido com Sucesso!',showConfirmButton: false,timer: 1500})
              store.dispatch('getMembresias')
            })
          } else {
            Swal.fire('Cancelado', '', 'error')
          }
      })
    }
  
    function editMembresia(membresia) {
      emit('clickEdit', membresia)
    }
  </script>
  