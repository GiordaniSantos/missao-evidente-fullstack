<template>
  <div class="min-w-[200px] w-[160px]  transition-all bg-indigo-700 text-white py-4 px-2">
    <router-link 
      :to="{name: 'app.dashboard'}" 
      active-class="text-white bg-indigo-600"
      exact-active-class="text-white bg-indigo-600"
      class="flex items-center p-2 rounded transition-colors hover:bg-black/30">
      <span class="mr-2 text-gray-300">
        <FontAwesomeIcon :icon="faHouse" class="w-5" />
      </span>
      <span class="text-xs">
        Dashboard
      </span>
    </router-link>
    <router-link 
      :to="{name: 'app.membresias'}" 
      active-class="text-white bg-indigo-600"
      exact-active-class="text-white bg-indigo-600"
      class="flex items-center p-2 rounded transition-colors hover:bg-black/30">
      <span class="mr-2 text-gray-300">
        <FontAwesomeIcon :icon="faCalendarDays" class="w-5" />
      </span>
      <span class="text-xs">
        Frequência
      </span>
    </router-link>
    <Menu as="div" class="relative inline-block text-left w-full">
      <MenuButton class="flex items-center w-full p-2 rounded transition-colors hover:bg-black/30">
        <span class="mr-2 text-gray-300">
          <FontAwesomeIcon :icon="faChevronRight" class="w-5" />
        </span>
        <span class="text-xs">
          Ministração
        </span>
      </MenuButton>
      <transition
      enter-active-class="transition duration-300 ease-out delay-100"
      enter-from-class="transform opacity-0 -translate-y-1"
      enter-to-class="transform opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform opacity-100 translate-y-0"
      leave-to-class="transform opacity-0 -translate-y-1"
      >
        <MenuItems class="right-0 w-full mt-2 mb-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <router-link to="{name: 'app.crentes'}" 
                active-class="text-white bg-indigo-600"
                exact-active-class="text-white bg-indigo-600"
                :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                <FontAwesomeIcon :icon="faBook" class="mr-2 h-5 w-5 text-indigo-400" />
                Estudo
              </router-link>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <router-link to="{name: 'app.crentes'}" 
                active-class="text-white bg-indigo-600"
                exact-active-class="text-white bg-indigo-600"
                :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                <FontAwesomeIcon :icon="faUserTie" class="mr-2 h-5 w-5 text-indigo-400" />
                Sermão
              </router-link>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <router-link to="{name: 'app.crentes'}" 
                active-class="text-white bg-indigo-600"
                exact-active-class="text-white bg-indigo-600"
                :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                <FontAwesomeIcon :icon="faBookBible" class="mr-2 h-5 w-5 text-indigo-400" />
                Estudo Biblico
              </router-link>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <router-link to="{name: 'app.crentes'}" 
                active-class="text-white bg-indigo-600"
                exact-active-class="text-white bg-indigo-600"
                :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                <FontAwesomeIcon :icon="faPeopleArrows" class="mr-2 h-5 w-5 text-indigo-400" />
                Discipulado
              </router-link>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
    <Menu as="div" class="relative inline-block text-left w-full">
      <MenuButton class="flex items-center w-full p-2 rounded transition-colors hover:bg-black/30">
        <span class="mr-2 text-gray-300">
          <FontAwesomeIcon :icon="faChevronRight" class="w-5" />
        </span>
        <span class="text-xs">
          Ato Pastoral
        </span>
      </MenuButton>
      <transition
        enter-active-class="transition duration-300 ease-out delay-100"
        enter-from-class="transform opacity-0 -translate-y-1"
        enter-to-class="transform opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform opacity-100 translate-y-0"
        leave-to-class="transform opacity-0 -translate-y-1"
      >
        <MenuItems class="right-0 w-full mt-2 mb-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <router-link to="{name: 'app.crentes'}" 
                active-class="text-white bg-indigo-600"
                exact-active-class="text-white bg-indigo-600"
                :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                <FontAwesomeIcon :icon="faChildReaching" class="mr-2 h-5 w-5 text-indigo-400"/>
                Batismo Infantil
              </router-link>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <router-link to="{name: 'app.crentes'}" 
                active-class="text-white bg-indigo-600"
                exact-active-class="text-white bg-indigo-600"
                :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                <FontAwesomeIcon :icon="faPrayingHands" class="mr-2 h-5 w-5 text-indigo-400" />
                Batismo e Profissão de Fé
              </router-link>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <router-link to="{name: 'app.crentes'}" 
                active-class="text-white bg-indigo-600"
                exact-active-class="text-white bg-indigo-600"
                :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                <FontAwesomeIcon :icon="faHandHoldingHeart" class="mr-2 h-5 w-5 text-indigo-400" />
                Benção Nupcial
              </router-link>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <router-link to="{name: 'app.crentes'}" 
                active-class="text-white bg-indigo-600"
                exact-active-class="text-white bg-indigo-600"
                :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                <FontAwesomeIcon :icon="faWineGlassAlt" class="mr-2 h-5 w-5 text-indigo-400" />
                Santa Ceia
              </router-link>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
    <Menu as="div" class="relative inline-block text-left w-full">
      <MenuButton class="flex items-center w-full p-2 rounded transition-colors hover:bg-black/30">
        <span class="mr-2 text-gray-300">
          <FontAwesomeIcon :icon="faChevronRight" class="w-5" />
        </span>
        <span class="text-xs">
          Visitação
        </span>
      </MenuButton>
      <transition
        enter-active-class="transition duration-300 ease-out delay-100"
        enter-from-class="transform opacity-0 -translate-y-1"
        enter-to-class="transform opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform opacity-100 translate-y-0"
        leave-to-class="transform opacity-0 -translate-y-1"
      >
        <MenuItems class="right-0 w-full mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <router-link :to="{name: 'app.crentes'}" 
                active-class="text-white bg-indigo-600"
                exact-active-class="text-white bg-indigo-600"
                :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                <FontAwesomeIcon :icon="faCross" class="mr-2 h-5 w-5 text-indigo-400" />
                Crentes
              </router-link>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <router-link :to="{name: 'app.incredulos'}" 
                active-class="text-white bg-indigo-600"
                exact-active-class="text-white bg-indigo-600"
                :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                <FontAwesomeIcon :icon="faHeartBroken" class="mr-2 h-5 w-5 text-indigo-400" />
                Não Crentes
              </router-link>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <router-link :to="{name: 'app.presidios'}" 
                active-class="text-white bg-indigo-600"
                exact-active-class="text-white bg-indigo-600"
                :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                <FontAwesomeIcon :icon="faUserLock" class="mr-2 h-5 w-5 text-indigo-400" />
                Presídios
              </router-link>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <router-link :to="{name: 'app.enfermos'}" 
                active-class="text-white bg-indigo-600"
                exact-active-class="text-white bg-indigo-600"
                :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                <FontAwesomeIcon :icon="faSyringe" class="mr-2 h-5 w-5 text-indigo-400" />
                Enfermos
              </router-link>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <router-link :to="{name: 'app.hospitais'}" 
                active-class="text-white bg-indigo-600"
                exact-active-class="text-white bg-indigo-600"
                :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                <FontAwesomeIcon :icon="faHospital" class="mr-2 h-5 w-5 text-indigo-400" />
                Hospitais
              </router-link>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <router-link :to="{name: 'app.escolas'}" 
                active-class="text-white bg-indigo-600"
                exact-active-class="text-white bg-indigo-600"
                :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                <FontAwesomeIcon :icon="faSchool" class="mr-2 h-5 w-5 text-indigo-400" />
                Escolas
              </router-link>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script setup>
  import {Menu, MenuButton, MenuItems, MenuItem} from '@headlessui/vue'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { faHouse, faCalendarDays, faBook, faUserTie, faBookBible, faPeopleArrows,
   faChildReaching, faPrayingHands, faHandHoldingHeart, faWineGlassAlt, faCross, faHeartBroken,
   faUserLock, faSyringe, faHospital, faSchool, faChevronRight} from '@fortawesome/free-solid-svg-icons'
</script>

<style scoped>

</style>
