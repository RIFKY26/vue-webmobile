<template>
    <main>
      <div class="main-header">
        <h1>Adopsi</h1>
        <span class="breadcrumb">ADOPSI / DAFTAR KUCING</span>
      </div>
  
      <div class="adoption-controls">
        <div class="control-buttons">
          <button @click="toggleFilter" :class="{ active: isFilterOpen }">
            <i class="fa-solid fa-filter"></i> Filter
          </button>
          <button @click="showList" :class="{ active: !isFilterOpen }">
            <i class="fa-solid fa-list"></i> List Adopsi
          </button>
        </div>
        <div class="search-bar">
          <i class="fa-solid fa-search"></i>
          <input type="text" placeholder="Pilihan yang sesuai dan diinginkan">
        </div>
      </div>
  
      <div v_show="isFilterOpen" class="filter-panel">
        <h4>Filter</h4>
        <div class="filter-options">
          <div class="filter-group">
            <label><b>Jenis Kelamin</b></label>
            <label><input type="checkbox" @change="applyFilters" value="betina" v-model="selectedFilters.gender"> Betina</label>
            <label><input type="checkbox" @change="applyFilters" value="jantan" v-model="selectedFilters.gender"> Jantan</label>
          </div>
          <div class="filter-group">
            <label><b>Ras Kucing</b></label>
            <label><input type="checkbox" @change="applyFilters" value="persia" v-model="selectedFilters.ras"> Persia</label>
            <label><input type="checkbox" @change="applyFilters" value="british" v-model="selectedFilters.ras"> British</label>
            <label><input type="checkbox" @change="applyFilters" value="domestik" v-model="selectedFilters.ras"> Domestik</label>
          </div>
        </div>
      </div>
  
      <div class="cat-adoption-grid">
        <div v-for="cat in filteredCats" :key="cat.id" class="cat-card">
          <img :src="cat.gambar" :alt="'Foto ' + cat.nama">
          <div class="cat-card-body">
            <h3>{{ cat.nama }}</h3>
            <div class="cat-info-tags">
              <span class="tag">{{ cat.gender }}</span>
              <span class="tag">{{ cat.ras }}</span>
              <span class="tag">{{ cat.umurTeks }}</span>
            </div>
            <div class="shelter-info">
              <img :src="cat.shelter.avatar" alt="Avatar Shelter">
              <span><b>{{ cat.shelter.nama }}</b> - {{ cat.shelter.lokasi }}</span>
            </div>
            <p>{{ cat.deskripsi }}</p>
            <RouterLink :to="'/adopsi/' + cat.id" class="btn-adopt">Adopsi</RouterLink>
          </div>
        </div>
        <p v-if="filteredCats.length === 0" style="grid-column: 1 / -1; text-align: center;">
          Tidak ada kucing yang sesuai dengan filter.
        </p>
      </div>
    </main>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue' // Import 'ref' dan 'computed' dari Vue
  import { RouterLink } from 'vue-router'
  
  // --- DATA (menggunakan ref) ---
  const isFilterOpen = ref(false); // Menggantikan logika 'show'
  
  const selectedFilters = ref({
    gender: [],
    ras: []
  });
  
  const catData = ref([
      {
          id: "Mochi",
          nama: "Mochi",
          gambar: "https://i.imgur.com/K0k9eDo.png",
          gender: "betina",
          ras: "persia",
          umurTeks: "1 thn",
          shelter: { nama: "Rumah Kucing BDG", lokasi: "Bandung", avatar: "https://i.imgur.com/5D63UyY.jpg" },
          deskripsi: "Mochi adalah kucing yang tenang dan penyayang, cocok untuk keluarga."
      },
      {
          id: "Leo",
          nama: "Leo",
          gambar: "https://i.imgur.com/k2gW25y.jpg",
          gender: "jantan",
          ras: "british",
          umurTeks: "8 bln",
          shelter: { nama: "Meow Shelter", lokasi: "Jakarta", avatar: "https://i.imgur.com/5D63UyY.jpg" },
          deskripsi: "Leo sangat aktif dan suka bermain. Mencari rumah yang bisa mengajaknya bermain."
      },
      {
          id: "Kiko",
          nama: "Kiko",
          gambar: "https://i.imgur.com/J16tCfD.png",
          gender: "jantan",
          ras: "domestik",
          umurTeks: "1.5 thn",
          shelter: { nama: "Paw Friends", lokasi: "Yogyakarta", avatar: "https://i.imgur.com/k2gW25y.jpg" },
          deskripsi: "Kiko adalah kucing yang mandiri dan suka menjelajah."
      }
  ]);
  
  // --- COMPUTED (Data yang dihitung otomatis) ---
  const filteredCats = computed(() => {
    return catData.value.filter(cat => {
      const genderMatch = selectedFilters.value.gender.length === 0 || selectedFilters.value.gender.includes(cat.gender);
      const rasMatch = selectedFilters.value.ras.length === 0 || selectedFilters.value.ras.includes(cat.ras);
      return genderMatch && rasMatch;
    });
  });
  
  // --- METHODS (Fungsi-fungsi) ---
  function toggleFilter() {
    isFilterOpen.value = !isFilterOpen.value;
  }
  
  function showList() {
    isFilterOpen.value = false;
  }
  
  function applyFilters() {
    // Tidak perlu melakukan apa-apa di sini,
    // 'computed' property 'filteredCats' akan otomatis menghitung ulang.
    console.log('Filters applied:', selectedFilters.value);
  }
  </script>
  
  <style scoped>
  /* CSS khusus untuk halaman ini bisa diletakkan di sini.
     Tapi karena kita sudah punya CSS global di main.css,
     ini bisa dikosongkan.
  */
  </style>