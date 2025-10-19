<template>
  <b-card no-body class="product-card shadow-sm h-100" @click="goToProductDetail">
    
    <b-card-img-lazy 
      :src="product.imageUrl" 
      :alt="product.title" 
      class="product-img-top" 
      top
    ></b-card-img-lazy>

    <b-card-body class="d-flex flex-column justify-content-between p-3">
      
      <div class="text-center">
        <p class="card-text text-muted mb-1 brand-name">BEYMEN Collection</p> 
        <b-card-title class="product-title">{{ product.title }}</b-card-title>
      </div>

      <div class="text-center mt-3">
        <b-card-text class="product-price mb-2">{{ product.priceText }}</b-card-text>
        <b-button variant="outline-dark" size="sm" @click.stop="addToCart(product)">
          Sepete Ekle
        </b-button>
      </div>
      
    </b-card-body>
  </b-card>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { useShopifyStore } from '../stores/shopifyStore';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const router = useRouter();
const shopifyStore = useShopifyStore();

const goToProductDetail = () => {
  router.push({ name: 'Product', params: { id: props.product.id } });
};

const addToCart = (product) => {
  // Bu action'ı Shopify Store'a eklememiz gerekecek.
  // shopifyStore.addItem(product);
  console.log('Ürün sepete eklendi:', product.title); // Şimdilik log atıyoruz
};
</script>

<style scoped>
/* Kartın genel stilleri */
.product-card {
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  overflow: hidden;
}
.product-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.product-img-top {
  width: 100%;
  aspect-ratio: 3 / 4; /* Dikey görsel oranı */
  object-fit: cover;
}

.brand-name {
  font-size: 0.8rem;
  font-weight: 400;
  text-transform: uppercase;
}
.product-title {
  font-size: 0.95rem;
  font-weight: 500;
  color: #333;
  /* Metni tek satırda tutmaya zorlar */
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis; 
}
.product-price {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1c1c1c;
}

.btn-outline-dark {
    border-color: #ccc;
    color: #333;
    font-size: 0.8rem;
}
</style>