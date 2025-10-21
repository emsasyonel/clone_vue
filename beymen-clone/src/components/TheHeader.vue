<template>
  <header class="sticky-top">
    <b-navbar type="light" variant="white" class="top-bar py-1 border-bottom">
      <b-container-fluid class="d-flex justify-content-end">
        <b-navbar-nav>
          <b-nav-item href="#" class="small top-link">Repair</b-nav-item>
          <b-nav-item href="#" class="small top-link">Sipariş Takibi</b-nav-item>
          <b-nav-item href="#" class="small top-link">Kampanyalar</b-nav-item>
          <b-nav-item href="#" class="small top-link">The One</b-nav-item>
          <b-nav-item href="#" class="small top-link">Servisler</b-nav-item>
          <b-nav-item href="#" class="small top-link"><b-icon-globe></b-icon-globe> TR</b-nav-item>
        </b-navbar-nav>
      </b-container-fluid>
    </b-navbar>
    <hr>
    <b-navbar type="light" variant="white" class="main-bar py-4">
      <b-container-fluid class="d-flex align-items-center">
        
        <b-navbar-brand :to="{ name: 'Home' }" class="text-dark logo-text">
          BEYMEN <span class="dot">.COM</span>
        </b-navbar-brand>
        <div class="search-placeholder mx-auto d-none d-lg-block">
      <b-input-group class="search-input-group">
        <div class="placeholder-text">Ürün, Marka Arayın...</div>
        <b-icon-search class="text-dark ml-2"></b-icon-search>
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
      </b-container-fluid>
    </b-navbar>
<hr>
<div class="category-bar d-none d-lg-block"> 
    <b-container-fluid>
                <b-nav class="d-flex w-100 justify-content-between">
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

// Kategorileri statik olarak tanımlayalım (Beymen görüntüsüne uygun)
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

/* TÜM HEADER ÇUBUKLARI İÇİN ZORLAMA KURALI */
.top-bar, .main-bar, .category-bar {
    width: 100%; 
    margin-left: 0 !important; 
    margin-right: 0 !important;
    padding-left: 0 !important; 
    padding-right: 0 !important;
}

/* HATA DÜZELTMESİ: .w-100 kuralı buradan silindi, 
  çünkü 'scoped' içindeyken alt bileşenlerde çalışmaz.
*/

/* Arama Placeholder'ı */
.search-placeholder {
    max-width: 500px;
    width: 100%;
    padding: 0 20px;
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
.top-bar {
    border-bottom: 1px solid #eee;
}
.top-bar .container-fluid {
    padding-left: 30px !important; 
    padding-right: 30px !important;
}
.top-link {
    color: #555 !important;
    font-size: 0.7rem;
    padding: 0 0.6rem !important;
    text-transform: uppercase;
}

/* --- 2. ANA ŞERİT STİLİ (.main-bar) --- */
.main-bar {
    border-bottom: 1px solid #eee;
    padding-top: 1.5rem !important;
    padding-bottom: 1.5rem !important;
}
.main-bar .container-fluid {
    padding-left: 30px !important; 
    padding-right: 30px !important;
}
.logo-text {
    font-weight: 300; 
    letter-spacing: 2px;
    font-size: 1.5rem;
}
.logo-text .dot {
    color: #40579e; 
    font-weight: 700;
}
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
.icon-group .icon-item {
    margin-left: 1rem;
    padding: 0 !important;
    cursor: pointer;
}
.icon-text {
    font-size: 0.7rem;
    color: #333;
    white-space: nowrap; 
}
.h5 { 
    margin-bottom: 0 !important;
}

/* --- 3. KATEGORİ ŞERİDİ STİLİ (.category-bar) --- */
.category-bar {
    border-bottom: 1px solid #ccc;
    padding-top: 0px !important; 
    padding-bottom: 0px !important;
    background-color: white;
    
    /* ZORLAMA: Header'daki tüm çubuklara uygulanan genel zorlamayı buraya da uygular */
    width: 100%; 
    margin-left: 0 !important; 
    margin-right: 0 !important;
    /* HATA DÜZELTMESİ: Fazladan '}' parantezi buradan silindi. */
}

.category-bar .container-fluid {
    padding-left: 30px !important; 
    padding-right: 30px !important;
}

.category-link {
    margin: 0 !important; 
    padding: 0px 0px !important;
    color: #1c1c1c !important;
    font-size: 0.85rem;
    font-weight: 500;
    text-transform: uppercase;
    
    margin: 0 !important; 
    padding: 0px 0px !important; 
    
    border-bottom: 2px solid transparent;
    transition: border-bottom 0.2s ease-in-out;
    flex-grow: 0;
}
.category-link:hover {
    color: #1c1c1c !important; 
    border-bottom: 2px solid #1c1c1c;
}

/* --- ÇÖZÜM 1 KURALI BURADA --- */
/* :deep() seçicisi, bu kuralın <b-nav> bileşeninin içine işlemesini sağlar */
:deep(.category-nav-list) {
    display: flex !important;
    width: 100% !important;
    justify-content: space-between !important;
    margin: 0;
    padding: 0;
}
</style>