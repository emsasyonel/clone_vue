// src/main.js (MANUEL IMPORT İÇİN TEMİZLENDİ)

import {createApp} from 'vue'
import App from './App.vue' 

// --- SADECE CSS DOSYALARI ---
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import 'bootstrap-icons/font/bootstrap-icons.css' 
// -----------------------------

// Pinia ve Router importları (Bunlar kalacak)
import { createPinia } from 'pinia'
import router from './router' 

// Diğer CSS importları (Bunlar kalacak)
import './style.css'
import './assets/styles/custom.css'

const app = createApp(App)

// --- BOOTSTRAPVUE EKLENTİSİ TAMAMEN KALDIRILDI ---
// app.component('BContainer', BContainer) SİLİNDİ
// app.use(createBootstrap(...)) SİLİNDİ
// ----------------------------------------------

// Pinia ve Router normal şekilde kuruluyor
app.use(router)
app.use(createPinia()) 

app.mount('#app')