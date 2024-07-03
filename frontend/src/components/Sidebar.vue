<template>
  <div class="min-w-[250px] w-[160px]  transition-all bg-white text-white">
    <div class="bg-emerald-900 flex flex-col bg-[#0f5d39] justify-center">
      <img class="mx-auto h-32 w-auto" src="/public/logo-menu.png" alt="Zay Ecommerce">
      <h2 class="text-lg text-center font-bold tracking-wide mb-5 -mt-5">Missão Evidente</h2>
    </div>
    <div class="py-4 px-2">

      <router-link 
        :to="{name: 'app.dashboard'}" 
        active-class="text-white bg-[#0f5d39]"
        exact-active-class="text-white bg-[#0f5d39]"
        class="flex items-center mb-1 p-2 rounded transition-colors hover:bg-black/30">
        <span :class="[$route.name === 'app.dashboard' ? 'text-white' : 'text-black']+' mr-2 text-white'">
          <FontAwesomeIcon :icon="faHouse" class="w-7" />
        </span>
        <span :class="[$route.name === 'app.dashboard' ? 'text-white' : 'text-black']+' text-sm text-white'">
          Início
        </span>
      </router-link>
      <router-link 
        :to="{name: 'app.membresias'}" 
        active-class="text-white bg-[#0f5d39]"
        exact-active-class="text-white bg-[#0f5d39]"
        class="flex items-center mb-1 p-2 rounded transition-colors hover:bg-black/30">
        <span :class="[$route.name === 'app.membresias' ? 'text-white' : 'text-black']+' mr-2 text-white'">
          <FontAwesomeIcon :icon="faCalendarDays" class="w-7" />
        </span>
        <span :class="[$route.name === 'app.membresias' ? 'text-white' : 'text-black']+' text-sm text-white'">
          Frequência
        </span>
      </router-link>
      <Menu as="div" class="relative inline-block text-left w-full">
        <MenuButton class="flex mb-1 items-center w-full p-2 rounded transition-colors hover:bg-black/30">
          <span class="mr-2 text-black">
            <FontAwesomeIcon :icon="faChevronRight" class="w-7" />
          </span>
          <span class="text-sm text-black">
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
          <MenuItems class="right-0 w-full mt-2 mb-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div class="px-1 py-1">
              <MenuItem v-slot="{ active }">
                <router-link :to="{name: 'app.estudos'}" 
                  active-class="text-white bg-[#0f5d39]"
                  exact-active-class="text-white bg-[#0f5d39]"
                  :class="[active ? 'bg-[#0f5d39] text-white' : 'text-gray-900', 'mb-1 group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                  <FontAwesomeIcon :icon="faBook" :class="[$route.name === 'app.estudos' ? 'text-white' : 'text-black']+' mr-2 h-5 w-5'" />
                  Estudo
                </router-link>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <router-link :to="{name: 'app.sermoes'}" 
                  active-class="text-white bg-[#0f5d39]"
                  exact-active-class="text-white bg-[#0f5d39]"
                  :class="[active ? 'bg-[#0f5d39] text-white' : 'text-gray-900', 'mb-1 group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                  <FontAwesomeIcon :icon="faUserTie" :class="[$route.name === 'app.sermoes' ? 'text-white' : 'text-black']+' mr-2 h-5 w-5'" />
                  Sermão
                </router-link>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <router-link :to="{name: 'app.estudosBiblicos'}" 
                  active-class="text-white bg-[#0f5d39]"
                  exact-active-class="text-white bg-[#0f5d39]"
                  :class="[active ? 'bg-[#0f5d39] text-white' : 'text-gray-900', 'mb-1 group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                  <FontAwesomeIcon :icon="faBookBible" :class="[$route.name === 'app.estudosBiblicos' ? 'text-white' : 'text-black']+' mr-2 h-5 w-5'" />
                  Estudo Biblico
                </router-link>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <router-link :to="{name: 'app.discipulados'}" 
                  active-class="text-white bg-[#0f5d39]"
                  exact-active-class="text-white bg-[#0f5d39]"
                  :class="[active ? 'bg-[#0f5d39] text-white' : 'text-gray-900', 'mb-1 group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                  <FontAwesomeIcon :icon="faPeopleArrows" :class="[$route.name === 'app.discipulados' ? 'text-white' : 'text-black']+' mr-2 h-5 w-5'" />
                  Discipulado
                </router-link>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
      <Menu as="div" class="relative inline-block text-left w-full">
        <MenuButton class="flex mb-1 items-center w-full p-2 rounded transition-colors hover:bg-black/30">
          <span class="mr-2 text-black">
            <FontAwesomeIcon :icon="faChevronRight" class="w-7" />
          </span>
          <span class="text-sm text-black">
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
          <MenuItems class="right-0 w-full mt-2 mb-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div class="px-1 py-1">
              <MenuItem v-slot="{ active }">
                <router-link :to="{name: 'app.batismosInfantis'}" 
                  active-class="text-white bg-[#0f5d39]"
                  exact-active-class="text-white bg-[#0f5d39]"
                  :class="[active ? 'bg-[#0f5d39] text-white' : 'text-gray-900', 'mb-1 group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                  <FontAwesomeIcon :icon="faChildReaching" :class="[$route.name === 'app.batismosInfantis' ? 'text-white' : 'text-black']+' mr-2 h-5 w-5'"/>
                  Batismo Infantil
                </router-link>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <router-link :to="{name: 'app.batismosProfissoes'}" 
                  active-class="text-white bg-[#0f5d39]"
                  exact-active-class="text-white bg-[#0f5d39]"
                  :class="[active ? 'bg-[#0f5d39] text-white' : 'text-gray-900', 'mb-1 group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                  <FontAwesomeIcon :icon="faPrayingHands" :class="[$route.name === 'app.batismosProfissoes' ? 'text-white' : 'text-black']+' mr-2 h-5 w-5'" />
                  Batismo e Profissão de Fé
                </router-link>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <router-link :to="{name: 'app.bencoesNupciais'}" 
                  active-class="text-white bg-[#0f5d39]"
                  exact-active-class="text-white bg-[#0f5d39]"
                  :class="[active ? 'bg-[#0f5d39] text-white' : 'text-gray-900', 'mb-1 group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                  <FontAwesomeIcon :icon="faHandHoldingHeart" :class="[$route.name === 'app.bencoesNupciais' ? 'text-white' : 'text-black']+' mr-2 h-5 w-5'" />
                  Benção Nupcial
                </router-link>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <router-link :to="{name: 'app.santasCeias'}" 
                  active-class="text-white bg-[#0f5d39]"
                  exact-active-class="text-white bg-[#0f5d39]"
                  :class="[active ? 'bg-[#0f5d39] text-white' : 'text-gray-900', 'mb-1 group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                  <FontAwesomeIcon :icon="faWineGlassAlt" :class="[$route.name === 'app.santasCeias' ? 'text-white' : 'text-black']+' mr-2 h-5 w-5'" />
                  Santa Ceia
                </router-link>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
      <Menu as="div" class="relative inline-block text-left w-full">
        <MenuButton class="flex mb-1 items-center w-full p-2 rounded transition-colors hover:bg-black/30">
          <span class="mr-2 text-black">
            <FontAwesomeIcon :icon="faChevronRight" class="w-7" />
          </span>
          <span class="text-sm text-black">
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
          <MenuItems class="right-0 w-full mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div class="px-1 py-1">
              <MenuItem v-slot="{ active }">
                <router-link :to="{name: 'app.crentes'}" 
                  active-class="text-white bg-[#0f5d39]"
                  exact-active-class="text-white bg-[#0f5d39]"
                  :class="[active ? 'bg-[#0f5d39] text-white' : 'text-gray-900', 'mb-1 group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                  <FontAwesomeIcon :icon="faCross" :class="[$route.name === 'app.crentes' ? 'text-white' : 'text-black']+' mr-2 h-5 w-5'" />
                  Crentes
                </router-link>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <router-link :to="{name: 'app.incredulos'}" 
                  active-class="text-white bg-[#0f5d39]"
                  exact-active-class="text-white bg-[#0f5d39]"
                  :class="[active ? 'bg-[#0f5d39] text-white' : 'text-gray-900', 'mb-1 group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                  <FontAwesomeIcon :icon="faHeartBroken" :class="[$route.name === 'app.incredulos' ? 'text-white' : 'text-black']+' mr-2 h-5 w-5'" />
                  Não Crentes
                </router-link>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <router-link :to="{name: 'app.presidios'}" 
                  active-class="text-white bg-[#0f5d39]"
                  exact-active-class="text-white bg-[#0f5d39]"
                  :class="[active ? 'bg-[#0f5d39] text-white' : 'text-gray-900', 'mb-1 group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                  <FontAwesomeIcon :icon="faUserLock" :class="[$route.name === 'app.presidios' ? 'text-white' : 'text-black']+' mr-2 h-5 w-5'" />
                  Presídios
                </router-link>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <router-link :to="{name: 'app.enfermos'}" 
                  active-class="text-white bg-[#0f5d39]"
                  exact-active-class="text-white bg-[#0f5d39]"
                  :class="[active ? 'bg-[#0f5d39] text-white' : 'text-gray-900', 'mb-1 group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                  <FontAwesomeIcon :icon="faSyringe" :class="[$route.name === 'app.enfermos' ? 'text-white' : 'text-black']+' mr-2 h-5 w-5'" />
                  Enfermos
                </router-link>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <router-link :to="{name: 'app.hospitais'}" 
                  active-class="text-white bg-[#0f5d39]"
                  exact-active-class="text-white bg-[#0f5d39]"
                  :class="[active ? 'bg-[#0f5d39] text-white' : 'text-gray-900', 'mb-1 group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                  <FontAwesomeIcon :icon="faHospital" :class="[$route.name === 'app.hospitais' ? 'text-white' : 'text-black']+' mr-2 h-5 w-5'" />
                  Hospitais
                </router-link>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <router-link :to="{name: 'app.escolas'}" 
                  active-class="text-white bg-[#0f5d39]"
                  exact-active-class="text-white bg-[#0f5d39]"
                  :class="[active ? 'bg-[#0f5d39] text-white' : 'text-gray-900', 'mb-1 group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                  <FontAwesomeIcon :icon="faSchool" :class="[$route.name === 'app.escolas' ? 'text-white' : 'text-black']+' mr-2 h-5 w-5'" />
                  Escolas
                </router-link>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>
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
