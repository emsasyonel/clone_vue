<template>
  <div> 
    <TheHeader /> 
    
    <main class="my-4"> 
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

