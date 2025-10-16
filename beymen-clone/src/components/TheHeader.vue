<template>
  <header class="sticky-top">
    <b-navbar type="light" variant="white" class="top-bar py-1 border-bottom">
      <b-container class="d-flex justify-content-end">
        <b-navbar-nav>
          <b-nav-item href="#" class="small top-link">Repair</b-nav-item>
          <b-nav-item href="#" class="small top-link">Sipariş Takibi</b-nav-item>
          <b-nav-item href="#" class="small top-link">Kampanyalar</b-nav-item>
          <b-nav-item href="#" class="small top-link">The One</b-nav-item>
          <b-nav-item href="#" class="small top-link">Servisler</b-nav-item>
          <b-nav-item href="#" class="small top-link"><b-icon-globe></b-icon-globe> TR</b-nav-item>
        </b-navbar-nav>
      </b-container>
    </b-navbar>
    
    <b-navbar type="light" variant="white" class="main-bar py-4">
      <b-container class="d-flex align-items-center">
        
        <b-navbar-brand :to="{ name: 'Home' }" class="text-dark logo-text">
          BEYMEN <span class="dot">.COM</span>
        </b-navbar-brand>

        <div class="search-container mx-auto d-none d-lg-block">
          <b-input-group class="search-input-group">
            <b-form-input placeholder="Ürün, Marka Arayın..."></b-form-input>
            <b-input-group-append>
              <b-button variant="link"><b-icon-search class="text-dark"></b-icon-search></b-button>
            </b-input-group-append>
          </b-input-group>
        </div>

        <b-navbar-nav class="d-flex flex-row align-items-center icon-group">
          
          <b-nav-item class="text-center icon-item">
            <b-icon-person-circle class="h5 mb-1"></b-icon-person-circle>
            <span class="d-block icon-text">Hesabım</span>
          </b-nav-item>
          
          <b-nav-item class="text-center icon-item">
            <b-icon-heart class="h5 mb-1"></b-icon-heart>
            <span class="d-block icon-text">Favorilerim</span>
          </b-nav-item>
          
          <b-nav-item :to="{ name: 'Cart' }" class="text-center icon-item">
            <b-icon-bag class="h5 mb-1"></b-icon-bag>
            <span class="d-block icon-text">Sepetim</span>
            <b-badge v-if="cartStore.itemCount > 0" pill variant="danger" class="cart-badge">{{ cartStore.itemCount }}</b-badge>
          </b-nav-item>
        </b-navbar-nav>
      </b-container>
    </b-navbar>
    
    <b-container class="d-none d-lg-block">
      <b-nav class="justify-content-center">
        <b-nav-item v-for="cat in categories" :key="cat" :to="{ name: 'Category', params: { slug: cat.toLowerCase() } }" class="category-link">
          {{ cat }}
        </b-nav-item>
      </b-nav>
    </b-container>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useShopifyStore } from '../stores/shopifyStore';

const cartStore = useShopifyStore(); 

// Kategorileri statik olarak tanımlayalım (Beymen görüntüsüne uygun)
const categories = ref([
    'Kadın', 'Erkek', 'Kozmetik/BBS', 'Ev & Yaşam', 'Çocuk', 
    'Anne & Bebek & Oyuncak', 'Teknoloji', 'Spor & Outdoor', 'Outlet', 'Reborn'
]);
</script>

<style scoped>
/* GENEL STİL */
header.sticky-top {
    z-index: 1020; 
    background-color: white;
}

/* 1. ÜST ŞERİT STİLİ */
.top-bar {
    border-bottom: 1px solid #eee;
}
.top-link {
    color: #555 !important;
    font-size: 0.7rem;
    padding: 0 0.6rem !important;
    text-transform: uppercase;
}

/* 2. ANA ŞERİT STİLİ */
.main-bar {
    border-bottom: 1px solid #eee;
    padding-top: 1.5rem !important;
    padding-bottom: 1.5rem !important;
}
.logo-text {
    font-weight: 300; /* İnce font */
    letter-spacing: 2px;
    font-size: 1.5rem;
}
.logo-text .dot {
    color: #40579e; /* Beymen'in mavi noktası */
    font-weight: 700;
}

/* Arama Çubuğu */
.search-container {
    max-width: 500px;
    padding: 0 20px;
}
.search-input-group input {
    border: 1px solid #ccc;
    border-right: none;
    padding: 0.5rem 1rem;
    height: auto;
}
.search-input-group .btn-link {
    border: 1px solid #ccc;
    border-left: none;
    color: #333 !important;
    padding: 0.5rem 1rem;
}

/* İkon Grubu */
.icon-group .icon-item {
    margin-left: 1rem;
    padding: 0 !important;
    cursor: pointer;
}
.icon-text {
    font-size: 0.7rem;
    color: #333;
    white-space: nowrap; /* Alt satıra inmesini engeller */
}
.h5 { 
    margin-bottom: 0 !important;
}

/* 3. KATEGORİ ŞERİDİ STİLİ */
.category-bar {
    border-bottom: 1px solid #ccc;
    padding-top: 0.5rem !important;
    padding-bottom: 0.5rem !important;
}
.category-link {
    color: #1c1c1c !important;
    font-size: 0.85rem;
    font-weight: 500;
    text-transform: uppercase;
    padding: 0.5rem 1rem !important;
}
</style>