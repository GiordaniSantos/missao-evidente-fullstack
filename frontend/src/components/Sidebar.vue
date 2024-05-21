<template>
  <div class="min-w-[160px] w-[160px]  transition-all bg-indigo-700 text-white py-4 px-2">
    <router-link 
      :to="{name: 'app.dashboard'}" 
      active-class="text-white bg-indigo-600"
      exact-active-class="text-white bg-indigo-600"
      class="flex items-center p-2 rounded transition-colors hover:bg-black/30">
      <span class="mr-2 text-gray-300">
        <HomeIcon class="w-5"/>
      </span>
      <span class="text-xs">
        Dashboard
      </span>
    </router-link>
    <router-link :to="{name: 'app.membresias'}" class="flex items-center p-2 rounded transition-colors hover:bg-black/30">
      <span class="mr-2 text-gray-300">
        <CalendarIcon class="w-5"/>
      </span>
      <span class="text-xs">
        Frequência
      </span>
    </router-link>
    <Menu as="div" class="relative inline-block text-left w-full">
      <MenuButton class="flex items-center w-full p-2 rounded transition-colors hover:bg-black/30">
        <span class="mr-2 text-gray-300">
          <HomeIcon class="w-5"/>
        </span>
        <span class="text-xs">
          Ministração
        </span>
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
        <MenuItems class="right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <router-link to="{name: 'app.crentes'}" 
                active-class="text-white bg-indigo-600"
                exact-active-class="text-white bg-indigo-600"
                :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                <AtSymbolIcon :active="active" class="mr-2 h-5 w-5 text-indigo-400" aria-hidden="true"/>
                Estudo
              </router-link>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <router-link to="{name: 'app.crentes'}" 
                active-class="text-white bg-indigo-600"
                exact-active-class="text-white bg-indigo-600"
                :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                <AtSymbolIcon :active="active" class="mr-2 h-5 w-5 text-indigo-400" aria-hidden="true"/>
                Sermão
              </router-link>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <router-link to="{name: 'app.crentes'}" 
                active-class="text-white bg-indigo-600"
                exact-active-class="text-white bg-indigo-600"
                :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                <AtSymbolIcon :active="active" class="mr-2 h-5 w-5 text-indigo-400" aria-hidden="true"/>
                Estudo Biblico
              </router-link>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <router-link to="{name: 'app.crentes'}" 
                active-class="text-white bg-indigo-600"
                exact-active-class="text-white bg-indigo-600"
                :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                <AtSymbolIcon :active="active" class="mr-2 h-5 w-5 text-indigo-400" aria-hidden="true"/>
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
          <HomeIcon class="w-5"/>
        </span>
        <span class="text-xs">
          Ato Pastoral
        </span>
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
        <MenuItems class="right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <router-link to="{name: 'app.crentes'}" 
                active-class="text-white bg-indigo-600"
                exact-active-class="text-white bg-indigo-600"
                :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                <AtSymbolIcon :active="active" class="mr-2 h-5 w-5 text-indigo-400" aria-hidden="true"/>
                Batismo Infantil
              </router-link>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <router-link to="{name: 'app.crentes'}" 
                active-class="text-white bg-indigo-600"
                exact-active-class="text-white bg-indigo-600"
                :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                <AtSymbolIcon :active="active" class="mr-2 h-5 w-5 text-indigo-400" aria-hidden="true"/>
                Batismo e Profissão de Fé
              </router-link>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <router-link to="{name: 'app.crentes'}" 
                active-class="text-white bg-indigo-600"
                exact-active-class="text-white bg-indigo-600"
                :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                <AtSymbolIcon :active="active" class="mr-2 h-5 w-5 text-indigo-400" aria-hidden="true"/>
                Benção Nupcial
              </router-link>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <router-link to="{name: 'app.crentes'}" 
                active-class="text-white bg-indigo-600"
                exact-active-class="text-white bg-indigo-600"
                :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                <AtSymbolIcon :active="active" class="mr-2 h-5 w-5 text-indigo-400" aria-hidden="true"/>
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
          <HomeIcon class="w-5"/>
        </span>
        <span class="text-xs">
          Visitação
        </span>
        <span class="text-right">
          <ChevronUpDownIcon class="h-5 w-5 text-violet-200 hover:text-violet-100" aria-hidden="true" />
        </span>
      </MenuButton>
      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems class="right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <router-link :to="{name: 'app.crentes'}" 
                active-class="text-white bg-indigo-600"
                exact-active-class="text-white bg-indigo-600"
                :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                <AtSymbolIcon :active="active" class="mr-2 h-5 w-5 text-indigo-400" aria-hidden="true"/>
                Crentes
              </router-link>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <router-link to="{name: 'app.crentes'}" 
                active-class="text-white bg-indigo-600"
                exact-active-class="text-white bg-indigo-600"
                :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                <AtSymbolIcon :active="active" class="mr-2 h-5 w-5 text-indigo-400" aria-hidden="true"/>
                Não Crentes
              </router-link>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <router-link to="{name: 'app.crentes'}" 
                active-class="text-white bg-indigo-600"
                exact-active-class="text-white bg-indigo-600"
                :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                <AtSymbolIcon :active="active" class="mr-2 h-5 w-5 text-indigo-400" aria-hidden="true"/>
                Presídios
              </router-link>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <router-link to="{name: 'app.crentes'}" 
                active-class="text-white bg-indigo-600"
                exact-active-class="text-white bg-indigo-600"
                :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                <AtSymbolIcon :active="active" class="mr-2 h-5 w-5 text-indigo-400" aria-hidden="true"/>
                Enfermos
              </router-link>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <router-link to="{name: 'app.crentes'}" 
                active-class="text-white bg-indigo-600"
                exact-active-class="text-white bg-indigo-600"
                :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                <AtSymbolIcon :active="active" class="mr-2 h-5 w-5 text-indigo-400" aria-hidden="true"/>
                Hospitais
              </router-link>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <router-link to="{name: 'app.crentes'}" 
                active-class="text-white bg-indigo-600"
                exact-active-class="text-white bg-indigo-600"
                :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                <AtSymbolIcon :active="active" class="mr-2 h-5 w-5 text-indigo-400" aria-hidden="true"/>
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
  import {HomeIcon, UserGroupIcon, ViewColumnsIcon, AtSymbolIcon, UsersIcon, CalendarIcon, ChartBarIcon, ArrowRightCircleIcon} from '@heroicons/vue/24/outline'
  import { UserIcon, ChevronUpDownIcon, PowerIcon } from "@heroicons/vue/24/outline"
  import {Menu, MenuButton, MenuItems, MenuItem} from '@headlessui/vue'
</script>

<style scoped>

</style>
