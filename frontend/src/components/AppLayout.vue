<template>
    <div class="min-h-full bg-gray-200 flex">
      <!--    Sidebar-->
      <Sidebar :class="{'-ml-[250px]': !sidebarOpened}"/>
      <!--/    Sidebar-->
  
      <div class="flex-1">
        <Navbar @toggle-sidebar="toggleSidebar"></Navbar>
        <!--      Content-->
        <main class="p-6">
          <router-view></router-view>
        </main>
        <!--      Content-->
      </div>
    </div>

  </template>
  
  <script setup>
  import {ref, computed, onMounted, onUnmounted} from 'vue'
  import Sidebar from "./Sidebar.vue";
  import Navbar from "./Navbar.vue";
  
  const {title} = defineProps({
    title: String
  })
  const sidebarOpened = ref(true);
  
  function toggleSidebar() {
    sidebarOpened.value = !sidebarOpened.value
  }
  
  
  </script>
  
  <style scoped>
  
  </style>