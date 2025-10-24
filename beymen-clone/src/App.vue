<template>
  <TheHeader />

  <main>
    <router-view />
  </main>

  <TheFooter />
</template>

<script setup>
// import { BApp } from 'bootstrap-vue-next' // Kaldırıldı
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';
</script>