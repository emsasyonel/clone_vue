// src/main.js

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router' // <-- Default import kullanılıyor
import './assets/styles/custom.css'


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')