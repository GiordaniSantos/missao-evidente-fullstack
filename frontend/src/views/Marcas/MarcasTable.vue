<template>
  <div class="bg-white p-4 rounded-lg shadow animate-fade-in-down">
    <div class="flex justify-between border-b-2 pb-3">
      <div class="flex items-center">
        <span class="whitespace-nowrap mr-3">Por Página</span>
        <select @change="getMarcas(null)" v-model="perPage" class="appearance-none relative block w-24 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <span class="ml-3">Encontrado {{marcas.total}} marcas</span>
      </div>
      <div>
        <input v-model="search" @change="getMarcas(null)" class="appearance-none relative block w-48 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Procurar marcas">
      </div>
    </div>
    <table class="table-auto w-full">
      <thead>
        <tr>
          <TableHeaderCell field="id" :sort-field="sortField" :sort-direction="sortDirection" @click="sortMarcas('id')">
            ID
          </TableHeaderCell>
          <TableHeaderCell field="image" :sort-field="sortField" :sort-direction="sortDirection">
            Imagem
          </TableHeaderCell>
          <TableHeaderCell field="image" :sort-field="sortField" :sort-direction="sortDirection">
            Nome
          </TableHeaderCell>
          <TableHeaderCell field="actions">
            Ações
          </TableHeaderCell>
        </tr>
      </thead>
      <tbody v-if="marcas.loading || !marcas.data.length">
        <tr>
          <td colspan="6">
            <Spinner v-if="marcas.loading"/>
            <p v-else class="text-center py-8 text-gray-700">
              Não há marcas
            </p>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr v-for="(marca, index) of marcas.data">
          <td class="border-b p-2 ">
            {{ marca.id }}
          </td>
          <td class="border-b p-2 ">
            <a v-if="marca.arquivo" :href="getImagem(marca.arquivo.id, marca.arquivo.arquivo)" target="_blank">
              <img class="w-16 h-16 object-cover" v-if="marca.arquivo" :src="getImagem(marca.arquivo.id, marca.arquivo.arquivo)" :alt="marca.titulo">
            </a>
          </td>
          <td class="border-b p-2 max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">
            {{ marca.nome }}
          </td>
          <td class="border-b p-2 ">
            <Menu as="div" class="relative inline-block text-left">
              <div>
                <MenuButton class="inline-flex items-center justify-center w-full justify-center rounded-full w-10 h-10 bg-black bg-opacity-0 text-sm font-medium text-white hover:bg-opacity-5 focus:bg-opacity-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  <Bars3Icon class="mr-2 h-5 w-5 text-indigo-400" aria-hidden="true"/>
                </MenuButton>
              </div>
              <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
                <MenuItems class="absolute z-10 right-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div class="px-1 py-1">
                    <MenuItem v-slot="{ active }">
                      <button :class="[ active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm',]" @click="editMarca(marca)">
                        <PencilIcon :active="active" class="mr-2 h-5 w-5 text-indigo-400" aria-hidden="true"/>
                        Editar
                      </button>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <button :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900','group flex w-full items-center rounded-md px-2 py-2 text-sm',]" @click="deleteMarca(marca)">
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
    <div v-if="!marcas.loading" class="flex justify-between items-center mt-5">
      <div v-if="marcas.data.length">
        Mostrando {{ marcas.from }} de {{ marcas.to }}
      </div>
      <nav v-if="marcas.total > marcas.limit" class="relative z-0 inline-flex justify-center rounded-md shadow-sm -space-x-px" aria-label="Pagination">
        <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
        <a
          v-for="(link, i) of marcas.links"
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
              i === marcas.links.length - 1 ? 'rounded-r-md' : '',
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
  import {PRODUCTS_PER_PAGE} from "../../constants";
  import TableHeaderCell from "../../components/core/Table/TableHeaderCell.vue";
  import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/vue";
  import {PencilIcon, TrashIcon, Bars3Icon} from '@heroicons/vue/24/outline'
  import MarcaModal from "./MarcaModal.vue";
  import Swal from 'sweetalert2'

  const perPage = ref(PRODUCTS_PER_PAGE);
  const search = ref('');
  const marcas = computed(() => store.state.marcas);
  const sortField = ref('updated_at');
  const sortDirection = ref('desc')

  const marca = ref({})
  const showMarcaModal = ref(false);

  const emit = defineEmits(['clickEdit'])

  onMounted(() => {
    getMarcas();
  })

  function getForPage(ev, link) {
    ev.preventDefault();
    if (!link.url || link.active) {
      return;
    }

    getMarcas(link.url)
  }

  function getMarcas(url = null) {
    store.dispatch("getMarcas", {
      url,
      search: search.value,
      per_page: perPage.value,
      sort_field: sortField.value,
      sort_direction: sortDirection.value
    });
  }

  function sortMarcas(field) {
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

    getMarcas()
  }

  function showAddNewModal() {
    showMarcaModal.value = true
  }

  function getImagem(id, nome){
    return `${import.meta.env.VITE_API_BASE_URL}/storage/uploads/marca/${id}/${nome}`
  }

  function deleteMarca(marca) {
    Swal.fire({
      title: 'Tem certeza que deseja excluir este registro?',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancelar",
      icon: 'warning'
    }).then((result) => {
        if (result.isConfirmed) {
          store.dispatch('deleteMarca', marca.id)
          .then(res => {
            Swal.fire({icon: 'success', title: 'Registro Excluido com Sucesso!',showConfirmButton: false,timer: 1500})
            store.dispatch('getMarcas')
          })
        } else {
          Swal.fire('Cancelado', '', 'error')
        }
    })
  }

  function editMarca(marca) {
    emit('clickEdit', marca)
  }
</script>
