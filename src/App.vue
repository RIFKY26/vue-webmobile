<script setup>
import { RouterView } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import { ref } from 'vue' // 1. Impor 'ref'

// 2. Buat "saklar" reaktif
const isSidebarOpen = ref(true)

// 3. Buat fungsi untuk tombol burger
function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <Sidebar :isOpen="isSidebarOpen" />

  <div class="main-content-wrapper" :class="{ 'full-width': !isSidebarOpen }">

    <header class="header">
      <div class="left-side">
        <i class="fa-solid fa-bars" id="burgerMenuBtn" @click="toggleSidebar"></i>
      </div>
      <div class="right-side">
        <i class="fa-solid fa-cog"></i>
        <i class="fa-solid fa-bell"></i>
        <i class="fa-solid fa-user-circle"></i>
      </div>
    </header>

    <RouterView />

  </div>
</template>

<style scoped>
/* Kosongkan, kita pakai main.css */
</style>