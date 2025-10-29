<template>
  <header class="sticky-top bg-white border-bottom position-relative">

    <BContainer fluid class="top-bar py-1 border-bottom d-flex justify-content-end" style="padding-left: 50px; padding-right: 20px;">
      <BNav class="justify-content-end">
        <BNavItem href="#" class="small top-link">Repair</BNavItem>
        <BNavItem href="#" class="small top-link">Sipariş Takibi</BNavItem>
        <BNavItem href="#" class="small top-link">Kampanyalar</BNavItem>
        <BNavItem href="#" class="small top-link">The One</BNavItem>
        <BNavItem href="#" class="small top-link">Servisler</BNavItem>
        <BNavItem href="#" class="small top-link"><i class="bi bi-globe me-1"></i> TR</BNavItem>
      </BNav>
    </BContainer>

    <hr class="m-0">

    <BContainer fluid class="main-bar py-4 d-flex align-items-center justify-content-between" style="padding-left: 50px; padding-right: 50px;">

      <BNavbarBrand :to="{ name: 'Home' }" class="text-dark logo-text" style="flex-shrink: 0; padding-left: 50px;">
        BEYMEN <span class="dot">.COM</span>
      </BNavbarBrand>

      <div class="search-placeholder w-100 mx-4 d-none d-lg-block">
        <div class="search-input-group">
          <div class="placeholder-text">Ürün, Marka Arayın...</div>
          <i class="bi bi-search text-dark ms-2"></i>
        </div>
      </div>

      <BNav class="icon-group d-flex flex-row align-items-center" style="flex-shrink: 0; padding-right: 50px;">

        <BNavItem :to="{ name: 'Login' }" class="nav-link text-center icon-item p-0">
          <i class="bi bi-person h5 mb-1"></i>
          <span class="d-block icon-text">Hesabım</span>
        </BNavItem>
        <BNavItem class="text-center icon-item">
          <i class="bi bi-heart h5 mb-1"></i>
          <span class="d-block icon-text">Favorilerim</span>
        </BNavItem>

        <BNavItem :to="{ name: 'Cart' }" class="nav-link text-center icon-item p-0 position-relative">
          <i class="bi bi-bag h5 mb-1"></i>
          <span class="d-block icon-text">Sepetim</span>
          <BBadge v-if="cartStore.itemCount > 0" pill variant="danger" class="cart-badge position-absolute top-0 start-100 translate-middle">
            {{ cartStore.itemCount }}
          </BBadge>
        </BNavItem>
      </BNav>

    </BContainer>

    <hr class="m-0">

    <div class="category-bar d-none d-lg-block position-relative" @mouseleave="hideMegaMenu">
      <BContainer fluid style="padding-left: 50px; padding-right: 50px;">
        <BNav class="d-flex w-100 justify-content-between">
          <div
            v-for="cat in categories"
            :key="cat"
            class="category-link-wrapper"
            @mouseenter="showMegaMenu(cat)"
          >
            <router-link
              :to="{ name: 'Category', params: { slug: cat.toLowerCase().replace(/[ &/]/g, '-') } }"
              class="nav-link category-link"
            >
              <template v-if="cat === 'Anne & Bebek & Oyuncak'">
                Anne & Bebek<br>& Oyuncak
              </template>
              <template v-else>
                {{ cat }}
              </template>
            </router-link>
          </div>
        </BNav>
      </BContainer>

      <div
        class="mega-menu-container position-absolute bg-white border shadow-sm w-100"
        :class="{ 'is-visible': isMegaMenuVisible && currentCategoryData }"
        @mouseenter="keepMenuOpen"
        @mouseleave="hideMegaMenu"
      >
        <BContainer fluid class="py-4" style="padding-left: 50px; padding-right: 50px;">
          <BRow class="gx-5" v-if="currentContentData">
            <BCol lg="2" class="mega-menu-side">
              <ul class="list-unstyled mb-0">
                <li
                  v-for="sideLinkKey in currentSideLinks"
                  :key="sideLinkKey"
                  class="mb-1"
                  @mouseover="handleSideLinkHover(sideLinkKey)"
                  :class="{ 'active': activeSideLink === sideLinkKey }"
                >
                  <a href="#" class="mega-menu-side-link" @click.prevent>
                    {{ sideLinkKey }}
                    <i v-if="currentCategoryData[sideLinkKey]?.columns?.length > 0" class="bi bi-chevron-right float-end"></i>
                  </a>
                </li>
              </ul>
            </BCol>
            <BCol :lg="currentContentData.promos?.length > 0 ? 7 : 9">
              <BRow>
                <BCol
                  v-for="(column, index) in currentContentData.columns"
                  :key="index"
                  lg="3" md="4" class="mega-menu-column"
                >
                  <h6 class="mega-menu-column-title">{{ column.title }}</h6>
                  <ul class="list-unstyled mb-0">
                    <li v-for="link in column.links" :key="link.text" class="mb-1">
                      <a :href="link.link" class="mega-menu-link">
                        {{ link.text.replace(' ►', '') }}<span v-if="link.text.includes('►')">&nbsp;►</span>
                      </a>
                    </li>
                  </ul>
                </BCol>
              </BRow>
            </BCol>
            <BCol :lg="3" v-if="currentContentData.promos?.length > 0">
              <div v-for="(promo, index) in currentContentData.promos" :key="index" class="mb-3 promo-item">
                <a :href="promo.link">
                  <img :src="promo.img" class="img-fluid promo-img mb-2" :alt="promo.title">
                  <span class="promo-title">{{ promo.title }}</span>
                </a>
              </div>
            </BCol>
          </BRow>
        </BContainer>
      </div>

    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useShopifyStore } from '../stores/shopifyStore';
import {
  BContainer,
  BNav,
  BNavItem,
  BNavbarBrand,
  BBadge,
  BRow,
  BCol
  // ===== DEĞİŞİKLİK BURADA: BDropdown ve BDropdownItem kaldırıldı =====
} from 'bootstrap-vue-next'

const cartStore = useShopifyStore();

const categories = ref([
    'Kadın', 'Erkek', 'Kozmetik/BBS', 'Ev & Yaşam', 'Çocuk',
    'Anne & Bebek & Oyuncak', 'Teknoloji', 'Spor & Outdoor', 'Outlet', 'Reborn'
]);

// --- MEGA MENÜ VERİ YAPISI (Değişiklik yok) ---
const megaMenuData = ref({
  'Kadın': {
    'Giyim': {
      columns: [ { title: 'Elbise', links: [ { text: 'Siyah Elbise', link: '#' }, { text: 'Jean Elbise', link: '#' }, { text: 'Tulum', link: '#' }, { text: 'Abiye Elbise', link: '#' }, { text: 'Tüm Elbise ►', link: '#' } ] }, { title: 'Triko & Kazak', links: [ { text: 'Kazak', link: '#' }, { text: 'Süveter', link: '#' }, { text: 'Tüm Triko & Kazak ►', link: '#' } ] }, { title: 'Dış Giyim', links: [ { text: 'Mont', link: '#' }, { text: 'Kaban', link: '#' }, { text: 'Palto', link: '#' }, { text: 'Pardösü', link: '#' }, { text: 'Yağmurluk', link: '#' }, { text: 'Tüm Dış Giyim ►', link: '#' } ] }, { title: 'Pantolon', links: [ { text: 'Tayt & Legging', link: '#' }, { text: 'Spor Pantolon', link: '#' }, { text: 'Tüm Pantolon ►', link: '#' } ] }, { title: 'Etek', links: [ { text: 'Deri Etek', link: '#' }, { text: 'Abiye Etek', link: '#' }, { text: 'Tüm Etek ►', link: '#' } ] }, { title: 'Takım', links: [ { text: 'Takım', link: '#' } ] }, { title: 'Sweatshirt', links: [ { text: 'Sweatshirt', link: '#' } ] }, { title: 'Gömlek & Bluz', links: [ { text: 'Bluz', link: '#' }, { text: 'Büstiyer', link: '#' }, { text: 'Jean Gömlek', link: '#' }, { text: 'Tüm Gömlek & Bluz ►', link: '#' } ] }, { title: 'Ceket', links: [ { text: 'Blazer', link: '#' }, { text: 'Klasik Ceket', link: '#' }, { text: 'Tüm Ceket ►', link: '#' } ] }, { title: 'T-Shirt', links: [ { text: 'T-Shirt', link: '#' } ] }, { title: 'Jean Pantolon', links: [ { text: 'Yelek', link: '#' }, { text: 'Jean Pantolon', link: '#' } ] }, ],
      promos: [ { img: 'https://picsum.photos/200/100?image=101', title: 'Tüm Giyim Ürünleri', link: '#' }, { img: 'https://picsum.photos/200/100?image=102', title: 'Giyim Yeni Gelenler', link: '#' }, { img: 'https://picsum.photos/200/100?image=103', title: 'Giyim İndirimleri', link: '#' }, ]
    },
    'Ayakkabı': {
      columns: [ { title: 'Sneaker', links: [ {text: 'Tüm Sneakerlar', link: '#'}, {text: 'Beyaz Sneaker', link: '#'} ] }, { title: 'Bot', links: [ {text: 'Deri Bot', link: '#'}, {text: 'Yağmur Çizmesi', link: '#'} ] }, { title: 'Topuklu Ayakkabı', links: [ {text: 'Stiletto', link: '#'}, {text: 'Platform', link: '#'} ] } ],
      promos: [ { img: 'https://picsum.photos/200/100?image=104', title: 'Ayakkabı Yeni Sezon', link: '#' } ]
    },
    'Çanta': {
      columns: [ { title: 'Omuz Çantası', links: [ {text: 'Tüm Omuz Çantaları', link: '#'} ] }, { title: 'Sırt Çantası', links: [ {text: 'Deri Sırt Çantası', link: '#'} ] } ],
      promos: []
    },
    'Aksesuar': { columns: [ { title: 'Takı', links: [ {text: 'Kolye', link: '#'} ] } ], promos: [] },
    'Reborn - Lüks İkinci El': { columns: [ { title: 'Lüks Çanta', links: [ {text: 'Tüm Çantalar', link: '#'} ] } ], promos: [] },
    'Wellness & Kişisel Bakım': { columns: [ { title: 'Cilt Bakımı', links: [ {text: 'Nemlendirici', link: '#'} ] } ], promos: [] },
    'Öne Çıkan Markalar': { columns: [ { title: 'Markalar', links: [ {text: 'Gucci', link: '#'}, {text: 'Prada', link: '#'} ] } ], promos: [] },
  },
  'Erkek': {
    'Erkek Giyim': {
      columns: [ { title: 'T-Shirt', links: [ {text: 'Polo Yaka', link:'#'}, {text: 'Basic', link:'#'}, {text: 'Tüm T-Shirt ►', link: '#'} ] }, { title: 'Gömlek', links: [ {text: 'Klasik Gömlek', link:'#'}, {text: 'Spor Gömlek', link:'#'}, {text: 'Tüm Gömlek ►', link: '#'} ] }, { title: 'Pantolon', links: [ {text: 'Jean Pantolon', link:'#'}, {text: 'Spor Pantolon', link:'#'}, {text: 'Tüm Pantolon ►', link: '#'} ] }, { title: 'Dış Giyim', links: [ {text: 'Mont', link:'#'}, {text: 'Ceket', link:'#'}, {text: 'Tüm Dış Giyim ►', link: '#'} ] } ],
      promos: [ { img: 'https://picsum.photos/200/100?image=201', title: 'Erkek Yeni Sezon', link: '#' }, { img: 'https://picsum.photos/200/100?image=202', title: 'Erkek İndirim', link: '#' } ]
    },
    'Erkek Ayakkabı': {
      columns: [ { title: 'Sneaker', links: [ {text: 'Tüm Sneakerlar', link: '#'} ] }, { title: 'Bot', links: [ {text: 'Deri Bot', link: '#'} ] } ],
      promos: [ { img: 'https://picsum.photos/200/100?image=203', title: 'Yeni Sezon Botlar', link: '#' } ]
    },
    'Erkek Aksesuar': { columns: [ { title: 'Kemer', links: [ {text: 'Deri Kemer', link: '#'} ] } ], promos: [] },
    'Bakım': { columns: [ { title: 'Parfüm', links: [ {text: 'Tüm Parfümler', link: '#'} ] } ], promos: [] }
  },
  'Kozmetik/BBS': { 'Parfüm': { columns: [ { title: 'Parfüm', links: [ {text: 'Kadın Parfüm', link:'#'}, {text: 'Erkek Parfüm', link:'#'} ] } ], promos: [ { img: 'https://picsum.photos/200/100?image=301', title: 'Çok Satan Parfümler', link: '#' } ] }, 'Makyaj': { columns: [ { title: 'Makyaj', links: [ {text: 'Yüz', link:'#'}, {text: 'Göz', link:'#'} ] } ], promos: [] } },
  'Ev & Yaşam': { 'Sofra': { columns: [ { title: 'Sofra', links: [ {text: 'Yemek Takımları', link:'#'} ] } ], promos: [] } },
  'Çocuk': { 'Kız Çocuk': { columns: [ { title: 'Kız Çocuk Giyim', links: [ {text: 'Elbise', link:'#'} ] } ], promos: [] } },
  'Anne & Bebek & Oyuncak': { 'Bebek Giyim': { columns: [ { title: 'Bebek Giyim', links: [ {text: 'Zıbın', link:'#'} ] } ], promos: [] } },
  'Teknoloji': { 'Giyilebilir Teknoloji': { columns: [ { title: 'Giyilebilir', links: [ {text: 'Akıllı Saat', link:'#'} ] } ], promos: [] } },
  'Spor & Outdoor': { 'Spor Giyim': { columns: [ { title: 'Spor Giyim', links: [ {text: 'Tayt', link:'#'} ] } ], promos: [] } },
  'Outlet': { 'Kadın Outlet': { columns: [ { title: 'Kadın Giyim', links: [ {text: 'Elbise', link:'#'} ] } ], promos: [] } },
  'Reborn': { 'Lüks Çanta': { columns: [ { title: 'Markalar (Çanta)', links: [ {text: 'Chanel', link:'#'} ] } ], promos: [] } },
});


// --- MEGA MENÜ STATE VE LOGIC (Değişiklik yok) ---
const activeCategory = ref(null); 
const activeSideLink = ref(null); 
const isMegaMenuVisible = ref(false);
let hideTimeout = null;

function showMegaMenu(category) {
  clearTimeout(hideTimeout);
  const data = megaMenuData.value[category];
  
  if (data && Object.keys(data).length > 0) {
    activeCategory.value = category;
    const firstSideLink = Object.keys(data)[0];
    activeSideLink.value = firstSideLink;
    isMegaMenuVisible.value = true;
  } else {
    hideMegaMenuImmediately();
  }
}
function hideMegaMenu() {
  hideTimeout = setTimeout(() => {
    isMegaMenuVisible.value = false;
    activeCategory.value = null;
    activeSideLink.value = null; 
  }, 150);
}
function keepMenuOpen() {
  clearTimeout(hideTimeout);
}
function hideMegaMenuImmediately() {
    clearTimeout(hideTimeout);
    isMegaMenuVisible.value = false;
    activeCategory.value = null;
    activeSideLink.value = null;
}
function handleSideLinkHover(sideLinkKey) {
  activeSideLink.value = sideLinkKey;
}
const currentCategoryData = computed(() => {
  return activeCategory.value ? megaMenuData.value[activeCategory.value] : null;
});
const currentSideLinks = computed(() => {
  return currentCategoryData.value ? Object.keys(currentCategoryData.value) : [];
});
const currentContentData = computed(() => {
  if (currentCategoryData.value && activeSideLink.value) {
    return currentCategoryData.value[activeSideLink.value];
  }
  return null;
});
</script>

<style scoped>
/* Mega menü stilleri (Değişiklik yok) */
.mega-menu-side-link {
  display: block;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  color: #212529;
  text-decoration: none;
  font-weight: 600;
  white-space: nowrap;
  border-bottom: 1px solid #f8f9fa;
  border-left: 3px solid transparent;
  padding-left: calc(1rem - 3px);
  transition: all 0.1s ease-in-out;
}
.mega-menu-side-link:hover,
li.active .mega-menu-side-link {
  color: #000;
  background-color: #f8f9fa;
  border-left: 3px solid #40579e; /* Beymen mavisi */
}
li.active .mega-menu-side-link i {
  display: none;
}

/* Genel stiller (Değişiklik yok) */
header.sticky-top {
    z-index: 1020;
    background-color: white;
    border-bottom: 1px solid #dee2e6;
}
hr {
  margin: 0;
}
.top-bar, .main-bar, .category-bar {
    width: 100%;
    margin-left: 0 !important;
    margin-right: 0 !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
}
.top-bar {
    border-bottom: 1px solid #dee2e6;
}
.search-placeholder {
    max-width: 500px;
    width: 100%;
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
.top-link {
    color: #555 !important;
    font-size: 0.7rem;
    padding: 0 0.6rem !important;
    text-transform: uppercase;
    text-decoration: none;
}
.top-link:hover {
    color: #000 !important;
}
.logo-text {
    font-weight: 300;
    letter-spacing: 2px;
    font-size: 1.5rem;
    text-decoration: none;
    white-space: nowrap;
}
.logo-text .dot {
    color: #40579e;
    font-weight: 700;
}

/* ===== DEĞİŞİKLİK BURADA: .icon-item kuralı güncellendi ===== 
  Dropdown için eklenen 'justify-content' kuralı kaldırıldı,
  çünkü <BNavItem> linkleri için buna gerek yok.
*/
.icon-group .icon-item {
    margin-left: 1.5rem;
    padding: 0 !important;
    cursor: pointer;
    text-decoration: none;
    color: #333;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.icon-group .icon-item:hover {
    color: #000;
}
.icon-text {
    font-size: 0.7rem;
    color: #333;
    white-space: nowrap;
}
.icon-group .icon-item i {
    font-size: 1.4rem;
    margin-bottom: 0.1rem;
    display: block;
}
.cart-badge {
    font-size: 0.6rem;
    padding: 0.2em 0.4em;
}
.category-bar {
    border-top: 1px solid #dee2e6;
    background-color: white;
}
.category-link-wrapper {
    display: inline-flex;
    flex-grow: 0;
}
.category-link {
    margin: 0 !important;
    padding: 0.6rem 0.5rem !important;
    color: #1c1c1c !important;
    font-size: 0.85rem;
    font-weight: 500;
    text-transform: uppercase;
    text-decoration: none;
    border-bottom: 2px solid transparent;
    transition: border-bottom 0.2s ease-in-out;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 3em;
    text-align: center;
    line-height: 1.1;
    cursor: pointer;
    width: 100%;
}
.category-link-wrapper:hover .category-link {
    color: #1c1c1c !important;
    border-bottom: 2px solid #1c1c1c;
}

.mega-menu-container {
  top: 100%;
  left: 0;
  z-index: 1030;
  background-color: #fff;
  border-top: 1px solid #eee !important;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.2s ease-out, visibility 0s linear 0.2s;
}
.mega-menu-container.is-visible {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transition: opacity 0.2s ease-out, visibility 0s linear 0s;
}
.mega-menu-side {
    border-right: 1px solid #eee;
    padding-right: 0;
    padding-left: 0;
}
.mega-menu-column {
    padding-left: 1.5rem;
}
.mega-menu-column-title {
  font-size: 0.8rem;
  font-weight: 700;
  color: #000;
  text-transform: uppercase;
  margin-bottom: 0.8rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid #eee;
}
.mega-menu-link {
  display: block;
  font-size: 0.85rem;
  color: #555;
  text-decoration: none;
  padding: 0.25rem 0;
  white-space: nowrap;
}
.mega-menu-link:hover {
  color: #000;
  text-decoration: underline;
}
.mega-menu-link:last-child {
    font-weight: 500;
    color: #333;
}
.promo-item a {
  text-decoration: none;
  color: inherit;
  display: block;
}
.promo-img {
  border: 1px solid #eee;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 4px;
}
.promo-title {
  display: block;
  font-size: 0.8rem;
  color: #333;
  font-weight: 500;
  text-align: center;
}

/* ===== DEĞİŞİKLİK BURADA: DROPDOWN STILLERI SİLİNDİ ===== */
/* Burada daha önce yer alan .icon-item :deep(...) 
  ile başlayan stil blokları, artık <BDropdown> 
  kullanılmadığı için kaldırıldı.
*/
</style>