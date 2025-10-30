<template>
  <TheHeader />

  <main>
    <router-view />
  </main>

  <TheFooter />
</template>

<script setup>
// '<BApp>' import'u yok, çünkü kullanmıyoruz.
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';
</script>