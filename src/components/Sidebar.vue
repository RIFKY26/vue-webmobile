<template>
  <aside class="sidebar" :class="{ 'hidden': !isOpen }">
    <div class="sidebar-header">LOGO ANDA</div>
    <nav>
      <h3>Filter Utama</h3>
      <ul>
        <li><RouterLink to="/"><i class="fa-solid fa-house"></i> Beranda</RouterLink></li>
        <li><RouterLink to="/lapor"><i class="fa-solid fa-flag"></i> Lapor</RouterLink></li>
        <li><RouterLink to="/adopsi"><i class="fa-solid fa-paw"></i> Adopsi</RouterLink></li>
        <li><RouterLink to="/donasi"><i class="fa-solid fa-hand-holding-dollar"></i> Donasi</RouterLink></li>
        <li><RouterLink to="/peringkat"><i class="fa-solid fa-ranking-star"></i> Peringkat</RouterLink></li>
        <li><RouterLink to="/rawat-kucing"><i class="fa-solid fa-notes-medical"></i> Rawat Kucing</RouterLink></li>
      </ul>
      <h3>Pengguna</h3>
      <ul>
        <li><RouterLink to="/profil"><i class="fa-solid fa-user"></i> Profil</RouterLink></li>
        <li><RouterLink to="/keluar"><i class="fa-solid fa-right-from-bracket"></i> Keluar</RouterLink></li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { RouterLink } from 'vue-router'

// Terima 'prop' isOpen dari App.vue
defineProps({
  isOpen: Boolean
})
</script>

<style scoped>
nav a.router-link-exact-active {
  background-color: #EFF6FF;
  color: #3B82F6;
}
</style>