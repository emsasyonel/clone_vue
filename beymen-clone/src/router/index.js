// src/router/index.js (Bu kod router dosyanızın İÇİNDE olmalı)

import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue' // Alias kullanmaya geri dönüyoruz
import Product from '@/views/Product.vue'
import Cart from '@/views/Cart.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/product/:id', name: 'Product', component: Product },
  { path: '/cart', name: 'Cart', component: Cart }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router // <-- Uncaught SyntaxError'ın kaynağı bu satırın olmamasıdır!