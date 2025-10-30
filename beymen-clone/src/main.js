// src/main.js

import {createApp} from 'vue'
import App from './App.vue' 

// --- SADECE GEREKLİ CSS DOSYALARI ---
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import 'bootstrap-icons/font/bootstrap-icons.css' 
// -----------------------------

// Pinia ve Router importları
import { createPinia } from 'pinia'
import router from './router' 

// Diğer CSS importları
import './style.css'
import './assets/styles/custom.css'

const app = createApp(App)

// --- BOOTSTRAPVUE EKLENTİSİ BURADA KULLANILMIYOR (app.use YOK) ---
// Bileşenler her dosyada manuel import edilecek.

// Pinia ve Router normal şekilde kuruluyor
app.use(router)
app.use(createPinia()) 

app.mount('#app')