// src/router/index.js (DÜZELTİLMİŞ VE TAM HALİ)

import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Product from '@/views/Product.vue'
import Cart from '@/views/Cart.vue'
import Category from '@/views/Category.vue' // <-- YENİ İMPORT EKLENDİ

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/product/:id', name: 'Product', component: Product },
  { path: '/cart', name: 'Cart', component: Cart },
  // --- YENİ KATEGORİ TANIMI EKLENDİ ---
  {
    path: '/category/:slug', // Dinamik parametre :slug
    name: 'Category',        // İsim eşleşiyor
    component: Category      // Yeni oluşturduğumuz bileşen
  }
  // ------------------------------------
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router