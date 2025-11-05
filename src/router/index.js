import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/adopsi', name: 'adopsi', component: () => import('../views/AdopsiView.vue') },
    
    // ===== TAMBAHKAN BLOK INI =====
    {
      path: '/adopsi/:id', // :id adalah parameter dinamis
      name: 'adopsi-detail',
      component: () => import('../views/FormAdopsiView.vue')
    },
    // ============================

    { path: '/donasi', name: 'donasi', component: () => import('../views/DonasiView.vue') },
    { 
      path: '/donasi/:id', 
      name: 'donasi-detail',
      component: () => import('../views/DonasiDetailView.vue')
    },
    {
      path: '/pembayaran/:id',
      name: 'pembayaran-donasi',
      component: () => import('../views/PembayaranDonasiView.vue')
    },
    { path: '/peringkat', name: 'peringkat', component: () => import('../views/PeringkatView.vue') },
    { path: '/rawat-kucing', name: 'rawat-kucing', component: () => import('../views/RawatKucingView.vue') }
  ]
})

export default router