<template>
  <BContainer class="my-5">

    <div v-if="true"> <BRow class="justify-content-center">
        <BCol md="10" lg="8" class="text-center bg-light p-5">
          <i class="bi bi-heart h1 mb-4 d-block"></i>
          <h4 class="mb-3">FAVORİLERİNİZDE ÜRÜN BULUNMAMAKTADIR</h4>
          <p class="text-muted mb-4">
            Beğendiğiniz ürünleri favorilerinize ekleyerek daha sonra kolayca ulaşabilirsiniz.
          </p>
          <BButton variant="outline-dark" size="lg" :to="{ name: 'Home' }">
            ALIŞVERİŞE BAŞLA
          </BButton>
        </BCol>
      </BRow>

    </div>

    </BContainer>
</template>

<script setup>
// Gerekli importları yapıyoruz
import {
  BContainer,
  BRow,
  BCol,
  BButton
} from 'bootstrap-vue-next';

// GELECEKTEKİ PLAN:
// import { useFavoritesStore } from '../stores/favoritesStore'; // Yeni bir store oluşturulacak
// const favoritesStore = useFavoritesStore();
</script>

<style scoped>
/* Bu sayfa için özel bir stile şimdilik gerek yok */
</style>