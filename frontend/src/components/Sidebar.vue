<template>
    <div class="min-w-[160px] w-[160px]  transition-all bg-indigo-700 text-white py-4 px-2">
      <router-link :to="{name: 'app.dashboard'}"
                   class="flex items-center p-2 rounded transition-colors hover:bg-black/30">
        <span class="mr-2 text-gray-300">
          <HomeIcon class="w-5"/>
        </span>
        <span class="text-xs">
          Dashboard
        </span>
      </router-link>
      <router-link :to="{name: 'app.membresias'}"
                   class="flex items-center p-2 rounded transition-colors hover:bg-black/30">
        <span class="mr-2 text-gray-300">
          <AtSymbolIcon class="w-5"/>
        </span>
        <span class="text-xs">
          Frequência
        </span>
      </router-link>
      <router-link :to="{name: 'app.crentes'}"
                   class="flex items-center p-2 rounded transition-colors hover:bg-black/30">
        <span class="mr-2 text-gray-300">
          <AtSymbolIcon class="w-5"/>
        </span>
        <span class="text-xs">
          Visitas Crentes
        </span>
      </router-link>
    </div>
  </template>

  <script setup>
    import {HomeIcon, UserGroupIcon, ViewColumnsIcon, AtSymbolIcon, UsersIcon, ChartBarIcon, ArrowRightCircleIcon} from '@heroicons/vue/24/outline'

  </script>

  <style scoped>

  </style>
