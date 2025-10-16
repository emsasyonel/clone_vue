<template>
  <div> 
    
    <TheHeader /> 
    
    <main class="container my-4"> 
      <router-view /> 
    </main>
    
    <TheFooter />
    
  </div>
</template>
<script setup>
// layout klasörüne koyduğunuzu varsayarak içe aktarıyoruz
import TheHeader from './components/TheHeader.vue'; 
import TheFooter from './components/TheFooter.vue';
</script>

<style>
/* Global CSS aynı kalır */
body {
  font-family: sans-serif;
  background-color: #f8f9fa; 
}
a {
  text-decoration: none; 
}
</style>