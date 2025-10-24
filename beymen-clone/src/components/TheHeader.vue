<template>
  <header class="sticky-top bg-white border-bottom">
    
    <b-container fluid class="top-bar py-1 border-bottom" style="padding-left: 50px; padding-right: 50px;">
      <b-nav class="justify-content-end">
        <b-nav-item href="#" class="small top-link">Repair</b-nav-item>
        <b-nav-item href="#" class="small top-link">Sipariş Takibi</b-nav-item>
        <b-nav-item href="#" class="small top-link">Kampanyalar</b-nav-item>
        <b-nav-item href="#" class="small top-link">The One</b-nav-item>
        <b-nav-item href="#" class="small top-link">Servisler</b-nav-item>
        <b-nav-item href="#" class="small top-link"><b-icon-globe></b-icon-globe> TR</b-nav-item>
      </b-nav>
    </b-container>

    <hr class="m-0">

    <b-container fluid class="main-bar py-4 d-flex align-items-center justify-content-between" style="padding-left: 50px; padding-right: 50px;">
        
        <b-navbar-brand :to="{ name: 'Home' }" class="text-dark logo-text" style="flex-shrink: 0; padding-left: 50px;">
          BEYMEN <span class="dot">.COM</span>
        </b-navbar-brand>

        <div class="search-placeholder w-100 mx-4 d-none d-lg-block">
          <div class="search-input-group">
            <div class="placeholder-text">Ürün, Marka Arayın...</div>
            <b-icon-search class="text-dark ml-2"></b-icon-search>
          </div>
        </div>

        <b-nav class="icon-group d-flex flex-row" style="flex-shrink: 0; padding-right: 50px;">
          <b-nav-item class="text-center icon-item">
            <i class="bi bi-person"></i>
            
            <span class="d-block icon-text">Hesabım</span>
          </b-nav-item>
          <b-nav-item class="text-center icon-item">
            <i class="bi bi-heart"></i>
            <span class="d-block icon-text">Favorilerim</span>
          </b-nav-item>
          <b-nav-item :to="{ name: 'Cart' }" class="text-center icon-item">
            <i class="bi bi-bag"></i>
            <span class="d-block icon-text">Sepetim</span>
            <b-badge v-if="cartStore.itemCount > 0" pill variant="danger" class="cart-badge">{{ cartStore.itemCount }}</b-badge>
          </b-nav-item>
        </b-nav>

    </b-container>

    <hr class="m-0">

    <div class="category-bar d-none d-lg-block" > 
      <b-container-fluid style="padding-left: 50px; padding-right: 50px;">
          <b-nav class="d-flex w-100 justify-content-between" style="padding-left: 50px; padding-right: 50px;">
            <b-nav-item v-for="cat in categories" :key="cat" :to="{ name: 'Category', params: { slug: cat.toLowerCase() } }" class="category-link">
                {{ cat }}
            </b-nav-item>
          </b-nav>
      </b-container-fluid>
    </div>

  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useShopifyStore } from '../stores/shopifyStore';

const cartStore = useShopifyStore(); 

const categories = ref([
    'Kadın', 'Erkek', 'Kozmetik/BBS', 'Ev & Yaşam', 'Çocuk', 
    'Anne & Bebek & Oyuncak', 'Teknoloji', 'Spor & Outdoor', 'Outlet', 'Reborn'
]);
</script>

<style scoped>
/* GENEL AYARLAR */
header.sticky-top {
    z-index: 1020; 
    background-color: white;
}
hr {
  margin: 0;
}

/* TÜM HEADER ÇUBUKLARI İÇİN ZORLAMA KURALI */
.top-bar, .main-bar, .category-bar {
    width: 100%; 
    margin-left: 0 !important; 
    margin-right: 0 !important;
    padding-left: 0 !important; 
    padding-right: 0 !important;
}

/* Arama Placeholder'ı */
/* DÜZELTME: Arama çubuğunun genişliğini 'w-100' ile esnek yaptığımız için,
  sadece 'max-width' (en fazla ne kadar büyüyebileceği) ayarı bırakıyoruz.
*/
.search-placeholder {
    max-width: 500px; /* Ortadaki arama çubuğu en fazla 500px olsun */
    width: 100%; /* İçinde bulunduğu alanı (w-100) doldursun */
}
.search-placeholder .search-input-group {
    border: 1px solid #ccc;
    padding: 10px 15px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: text;
}
.search-placeholder .placeholder-text {
    color: #999;
    font-size: 0.9rem;
    line-height: 1;
}

/* --- 1. ÜST ŞERİT STİLİ (.top-bar) --- */
.top-bar.container-fluid {
    padding-left: 50px !important; 
    padding-right: 50px !important;
}
.top-link {
    color: #555 !important;
    font-size: 0.7rem;
    padding: 0 0.6rem !important;
    text-transform: uppercase;
}

/* --- 2. ANA ŞERİT STİLİ (.main-bar) --- */
.main-bar.container-fluid {
    padding-left: 50px !important; 
    padding-right: 50px !important;
}
.logo-text {
    font-weight: 300; 
    letter-spacing: 2px;
    font-size: 1.5rem;
    text-decoration: none;
    white-space: nowrap; /* "BEYMEN .COM" yazısının kırılmasını engelle */
}
.logo-text .dot {
    color: #40579e; 
    font-weight: 700;
}
.icon-group .icon-item {
    margin-left: 1rem; /* İkonlar arası boşluk */
    padding: 0 !important;
    cursor: pointer;
    text-decoration: none;
}
.icon-text {
    font-size: 0.7rem;
    color: #333;
    white-space: nowrap; 
}
.h5 { 
    margin-bottom: 0 !important;
}
.cart-badge {
    position: absolute;
    top: -5px;
    right: -10px;
    font-size: 0.6rem;
}

/* --- 3. KATEGORİ ŞERİDİ STİLİ (.category-bar) --- */
.category-bar {
    border-bottom: 1px solid #ccc;
    padding-top: 0.2rem !important; 
    padding-bottom: 0.2rem !important;
    background-color: white;
}
.category-bar .container-fluid {
    padding-left: 50px !important; 
    padding-right: 50px !important;
}

.category-link {
    margin: 0 !important; 
    padding: 0.2rem 0.5rem !important; 
    color: #1c1c1c !important;
    font-size: 0.85rem;
    font-weight: 500;
    text-transform: uppercase;
    
    border-bottom: 2px solid transparent;
    transition: border-bottom 0.2s ease-in-out;
    flex-grow: 0;
}
.category-link:hover {
    color: #1c1c1c !important; 
    border-bottom: 2px solid #1c1c1c;
}
</style>