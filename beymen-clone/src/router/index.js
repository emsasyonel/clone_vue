// src/router/index.js (GÜNCELLENMİŞ HALİ)

import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Product from '@/views/Product.vue'
import Cart from '@/views/Cart.vue'
import Category from '@/views/Category.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Favorites from '@/views/Favorites.vue' // <-- YENİ İMPORT EKLENDİ

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/product/:id', name: 'Product', component: Product },
  { path: '/cart', name: 'Cart', component: Cart },
  {
    path: '/category/:slug',
    name: 'Category',
    component: Category
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  // --- YENİ FAVORİLER SAYFASI ROTASI EKLENDİ ---
  {
    path: '/favorites',
    name: 'Favorites',
    component: Favorites
  }
  // ------------------------------------
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router