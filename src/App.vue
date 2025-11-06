<script setup>
import { RouterView, useRouter } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import { ref, computed, onMounted, onUnmounted } from 'vue'

const router = useRouter()

// 2. Buat "saklar" reaktif
const isSidebarOpen = ref(true)
const isDarkMode = ref(false)
const isBellDropdownOpen = ref(false)

// Data pengingat kucing (simulasi - bisa diambil dari store/composable)
const catReminders = ref([
  { id: 1, catName: "Leo", title: "Memberi Makan Pagi", time: "08:00", frequency: "harian", checked: true },
  { id: 2, catName: "Leo", title: "Memberi Vitamin", time: "08:00", frequency: "harian", checked: false },
  { id: 4, catName: "Mochi", title: "Memberi Makan Sore", time: "17:00", frequency: "harian", checked: true }
])

// Computed untuk pengingat yang aktif
const activeReminders = computed(() => {
  return catReminders.value.filter(r => r.checked)
})

// Computed untuk jumlah notifikasi
const notificationCount = computed(() => {
  return activeReminders.value.length
})

// 3. Buat fungsi untuk tombol burger
function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

// Fungsi untuk navigasi ke profil
function goToProfile() {
  router.push('/profil')
}

// Fungsi untuk toggle dark mode
function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark-mode')
    localStorage.setItem('darkMode', 'true')
  } else {
    document.documentElement.classList.remove('dark-mode')
    localStorage.setItem('darkMode', 'false')
  }
}

// Fungsi untuk toggle bell dropdown
function toggleBellDropdown() {
  isBellDropdownOpen.value = !isBellDropdownOpen.value
}

// Tutup dropdown saat klik di luar
function handleClickOutside(event) {
  if (!event.target.closest('.bell-container')) {
    isBellDropdownOpen.value = false
  }
}

// Load dark mode dari localStorage saat mount
onMounted(() => {
  const savedDarkMode = localStorage.getItem('darkMode')
  if (savedDarkMode === 'true') {
    isDarkMode.value = true
    document.documentElement.classList.add('dark-mode')
  }
  
  // Tambahkan event listener untuk menutup dropdown
  document.addEventListener('click', handleClickOutside)
})

// Cleanup event listener
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <Sidebar :isOpen="isSidebarOpen" />

  <div class="main-content-wrapper" :class="{ 'full-width': !isSidebarOpen }">

    <header class="header">
      <div class="left-side">
        <i class="fa-solid fa-bars" id="burgerMenuBtn" @click="toggleSidebar"></i>
      </div>
      <div class="right-side">
        <!-- Settings Icon untuk Dark Mode -->
        <i 
          class="fa-solid fa-cog" 
          @click="toggleDarkMode"
          :title="isDarkMode ? 'Mode Terang' : 'Mode Gelap'"
          style="cursor: pointer;"
        ></i>
        
        <!-- Bell Icon dengan Dropdown -->
        <div class="bell-container" style="position: relative;">
          <div 
            @click="toggleBellDropdown"
            style="cursor: pointer; position: relative; display: inline-block;"
          >
            <i class="fa-solid fa-bell"></i>
            <span v-if="notificationCount > 0" class="notification-badge">{{ notificationCount }}</span>
          </div>
          
          <!-- Dropdown Pengingat -->
          <div v-if="isBellDropdownOpen" class="bell-dropdown">
            <div class="bell-dropdown-header">
              <h4>Pengingat Kucing</h4>
              <span class="notification-count-text">{{ notificationCount }} pengingat aktif</span>
            </div>
            <div class="bell-dropdown-body">
              <div 
                v-for="reminder in activeReminders" 
                :key="reminder.id"
                class="reminder-notification-item"
              >
                <div class="reminder-notification-icon">
                  <i class="fa-solid fa-cat"></i>
                </div>
                <div class="reminder-notification-content">
                  <div class="reminder-notification-title">{{ reminder.title }}</div>
                  <div class="reminder-notification-details">
                    <span class="cat-name">{{ reminder.catName }}</span>
                    <span class="reminder-time">
                      <i class="fa-solid fa-clock"></i> {{ reminder.time }}
                    </span>
                    <span class="reminder-frequency">{{ reminder.frequency }}</span>
                  </div>
                </div>
              </div>
              <div v-if="activeReminders.length === 0" class="no-reminders">
                <i class="fa-solid fa-bell-slash"></i>
                <p>Tidak ada pengingat aktif</p>
              </div>
            </div>
            <div class="bell-dropdown-footer">
              <router-link to="/rawat-kucing" @click="isBellDropdownOpen = false">
                Kelola Pengingat
              </router-link>
            </div>
          </div>
        </div>
        
        <!-- Profile Icon -->
        <i 
          class="fa-solid fa-user-circle" 
          @click="goToProfile"
          style="cursor: pointer;"
          title="Profil"
        ></i>
      </div>
    </header>

    <RouterView />

  </div>
</template>

<style scoped>
/* Kosongkan, kita pakai main.css */
</style>