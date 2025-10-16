<template>
  <div class="home">
    <b-container>
      <h2>Yeni Ürünler</h2>

      <div v-if="shopifyStore.loading" class="text-center my-5">
        <b-spinner label="Yükleniyor..."></b-spinner>
        <p class="mt-2">Ürünler yükleniyor...</p>
      </div>

      <b-alert v-else-if="shopifyStore.error" show variant="danger">
        Hata: Ürünler yüklenemedi. {{ shopifyStore.error.message }}
      </b-alert>

      <div v-else class="product-grid">
        <div v-for="product in shopifyStore.normalizedProducts" :key="product.id" class="product-card">
          <img :src="product.imageUrl" :alt="product.title" class="product-img" />
          
          <h3>{{ product.title }}</h3>
          <p>{{ product.priceText }}</p>
          <b-button variant="dark" size="sm" class="mt-2">İncele</b-button>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
// Yolu, TheHeader'da çalıştığı gibi göreceli olarak ayarlayın:
import { useShopifyStore } from '../stores/shopifyStore'; 

// Store'u kullanıma hazır hale getirin
const shopifyStore = useShopifyStore();

// Bileşen yüklendiğinde fetchProducts fonksiyonunu çağır
onMounted(() => {
  // Yalnızca ürünler daha önce yüklenmediyse çekmeyi deneyin
  if (shopifyStore.products.length === 0) {
    shopifyStore.fetchProducts();
  }
});
</script>

