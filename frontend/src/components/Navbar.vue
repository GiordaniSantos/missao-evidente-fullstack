<template>
  <header class="flex justify-between items-center p-3 h-14 shadow bg-white">
    <button @click="emit('toggle-sidebar')" class="flex items-center justify-center rounded transition-colors w-8 h-8 text-gray-700 hover:bg-black/10">
      <Bars3Icon class="w-6"/>
    </button>
    <Menu as="div" class="relative inline-block text-left">
      <MenuButton class="flex items-center">
        <small>{{currentUser.name}}</small>
        <ChevronUpDownIcon class="h-5 w-5 text-violet-200 hover:text-violet-100" aria-hidden="true" />
      </MenuButton>
      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems class="absolute right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <router-link 
                :to="{name: 'app.perfil'}" 
                active-class="text-white bg-[#0f5d39]"
                exact-active-class="text-white bg-[#0f5d39]"
                class="flex items-center text-sm p-2 rounded transition-colors hover:text-white hover:bg-[#0f5d39]">
                 <UserIcon
                  :active="active"
                  :class="[$route.name === 'app.perfil' ? 'text-white' : 'text-black']+' mr-2 mr-2 h-5 w-5'"
                  aria-hidden="true"
                />
                Minha Conta
              </router-link>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <button
                @click="logout"
                :class="[
                  active ? 'bg-[#0f5d39] text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
              >
                <ArrowLeftOnRectangleIcon
                  :active="active"
                  class="mr-2 h-5 w-5 text-black"
                  aria-hidden="true"
                />
                Sair
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </header>
</template>
  
  <script setup>
  import { UserIcon, ChevronUpDownIcon, PowerIcon, Bars3Icon, UsersIcon, ArrowLeftOnRectangleIcon } from "@heroicons/vue/24/outline"
  import {Menu, MenuButton, MenuItems, MenuItem} from '@headlessui/vue'
  import store from "../store";
  import router from "../router";
  import {computed} from "vue";
  import Swal from 'sweetalert2'
  
  const emit = defineEmits(['toggle-sidebar'])
  
  const currentUser = computed(() => store.state.user.data);
  
  function logout() {
    store.dispatch('logout').then(() => { 
      router.push({name: 'login'}) 
    })
  }
  
  </script>
  
  <style scoped>
  
  </style>