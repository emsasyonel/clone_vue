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
        <BNavItem class="text-center icon-item">
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
        :class="{ 'is-visible': isMegaMenuVisible && currentMenuData }"
        @mouseenter="keepMenuOpen"
        @mouseleave="hideMegaMenu"
      >
        <BContainer fluid class="py-4" style="padding-left: 50px; padding-right: 50px;">
          <BRow class="gx-5">

            <BCol lg="2" class="mega-menu-side" v-if="currentMenuData?.sideLinks.length > 0">
              <ul class="list-unstyled mb-0">
                <li v-for="sideLink in currentMenuData?.sideLinks" :key="sideLink.text" class="mb-1">
                  <a :href="sideLink.link" class="mega-menu-side-link">{{ sideLink.text }}</a>
                </li>
              </ul>
            </BCol>

            <BCol :lg="currentMenuData?.sideLinks.length > 0 ? 7 : 9">
              <BRow>
                <BCol
                  v-for="(column, index) in currentMenuData?.columns"
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

            <BCol :lg="currentMenuData?.sideLinks.length > 0 ? 3 : 3" v-if="currentMenuData?.promos.length > 0">
              <div v-for="(promo, index) in currentMenuData?.promos" :key="index" class="mb-3 promo-item">
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
} from 'bootstrap-vue-next'

const cartStore = useShopifyStore();

const categories = ref([
    'Kadın', 'Erkek', 'Kozmetik/BBS', 'Ev & Yaşam', 'Çocuk',
    'Anne & Bebek & Oyuncak', 'Teknoloji', 'Spor & Outdoor', 'Outlet', 'Reborn'
]);

// --- DÜZELTME: EKSİK KATEGORİ VERİLERİ EKLENDİ ---
const megaMenuData = ref({
  'Kadın': { sideLinks: [ { text: 'Giyim', link: '#' }, { text: 'Ayakkabı', link: '#' }, { text: 'Çanta', link: '#' }, { text: 'Aksesuar', link: '#' }, { text: 'Reborn - Lüks İkinci El', link: '#'}, { text: 'Wellness & Kişisel Bakım', link: '#'}, { text: 'Öne Çıkan Markalar', link: '#'}, ], columns: [ { title: 'Elbise', links: [ { text: 'Siyah Elbise', link: '#' }, { text: 'Jean Elbise', link: '#' }, { text: 'Tulum', link: '#' }, { text: 'Abiye Elbise', link: '#' }, { text: 'Tüm Elbise ►', link: '#' } ] }, { title: 'Triko & Kazak', links: [ { text: 'Kazak', link: '#' }, { text: 'Süveter', link: '#' }, { text: 'Tüm Triko & Kazak ►', link: '#' } ] }, { title: 'Dış Giyim', links: [ { text: 'Mont', link: '#' }, { text: 'Kaban', link: '#' }, { text: 'Palto', link: '#' }, { text: 'Pardösü', link: '#' }, { text: 'Yağmurluk', link: '#' }, { text: 'Tüm Dış Giyim ►', link: '#' } ] }, { title: 'Pantolon', links: [ { text: 'Tayt & Legging', link: '#' }, { text: 'Spor Pantolon', link: '#' }, { text: 'Tüm Pantolon ►', link: '#' } ] }, { title: 'Etek', links: [ { text: 'Deri Etek', link: '#' }, { text: 'Abiye Etek', link: '#' }, { text: 'Tüm Etek ►', link: '#' } ] }, { title: 'Takım', links: [ { text: 'Takım', link: '#' } ] }, { title: 'Sweatshirt', links: [ { text: 'Sweatshirt', link: '#' } ] }, { title: 'Gömlek & Bluz', links: [ { text: 'Bluz', link: '#' }, { text: 'Büstiyer', link: '#' }, { text: 'Jean Gömlek', link: '#' }, { text: 'Tüm Gömlek & Bluz ►', link: '#' } ] }, { title: 'Ceket', links: [ { text: 'Blazer', link: '#' }, { text: 'Klasik Ceket', link: '#' }, { text: 'Tüm Ceket ►', link: '#' } ] }, { title: 'T-Shirt', links: [ { text: 'T-Shirt', link: '#' } ] }, { title: 'Jean Pantolon', links: [ { text: 'Yelek', link: '#' }, { text: 'Jean Pantolon', link: '#' } ] }, ], promos: [ { img: 'https://picsum.photos/200/100?image=101', title: 'Tüm Giyim Ürünleri', link: '#' }, { img: 'https://picsum.photos/200/100?image=102', title: 'Giyim Yeni Gelenler', link: '#' }, { img: 'https://picsum.photos/200/100?image=103', title: 'Giyim İndirimleri', link: '#' }, ] },
  'Erkek': { sideLinks: [ { text: 'Erkek Giyim', link: '#' }, { text: 'Erkek Ayakkabı', link: '#' }, { text: 'Erkek Aksesuar', link: '#' }, { text: 'Bakım', link: '#'} ], columns: [ { title: 'T-Shirt', links: [ {text: 'Polo Yaka', link:'#'}, {text: 'Basic', link:'#'}, {text: 'Tüm T-Shirt ►', link: '#'} ] }, { title: 'Gömlek', links: [ {text: 'Klasik Gömlek', link:'#'}, {text: 'Spor Gömlek', link:'#'}, {text: 'Tüm Gömlek ►', link: '#'} ] }, { title: 'Pantolon', links: [ {text: 'Jean Pantolon', link:'#'}, {text: 'Spor Pantolon', link:'#'}, {text: 'Tüm Pantolon ►', link: '#'} ] }, { title: 'Dış Giyim', links: [ {text: 'Mont', link:'#'}, {text: 'Ceket', link:'#'}, {text: 'Tüm Dış Giyim ►', link: '#'} ] } ], promos: [ { img: 'https://picsum.photos/200/100?image=201', title: 'Erkek Yeni Sezon', link: '#' }, { img: 'https://picsum.photos/200/100?image=202', title: 'Erkek İndirim', link: '#' } ] },
  'Kozmetik/BBS': { sideLinks: [ { text: 'Parfüm', link: '#' }, { text: 'Makyaj', link: '#' }, { text: 'Cilt Bakımı', link: '#' }, { text: 'Saç Bakımı', link: '#'} ], columns: [ { title: 'Parfüm', links: [ {text: 'Kadın Parfüm', link:'#'}, {text: 'Erkek Parfüm', link:'#'}, {text: 'Niş Parfüm ►', link: '#'} ] }, { title: 'Makyaj', links: [ {text: 'Yüz', link:'#'}, {text: 'Göz', link:'#'}, {text: 'Dudak', link: '#'} ] }, { title: 'Cilt Bakımı', links: [ {text: 'Nemlendirici', link:'#'}, {text: 'Serum', link:'#'}, {text: 'Güneş Kremi', link: '#'} ] } ], promos: [ { img: 'https://picsum.photos/200/100?image=301', title: 'Çok Satan Parfümler', link: '#' }, { img: 'https://picsum.photos/200/100?image=302', title: 'Cilt Bakım Setleri', link: '#' } ] },
  'Ev & Yaşam': { sideLinks: [ { text: 'Sofra', link: '#' }, { text: 'Mutfak', link: '#' }, { text: 'Ev Tekstili', link: '#' }, { text: 'Ev Dekorasyon', link: '#'} ], columns: [ { title: 'Sofra', links: [ {text: 'Yemek Takımları', link:'#'}, {text: 'Bardak Setleri', link:'#'}, {text: 'Tüm Sofra ►', link: '#'} ] }, { title: 'Mutfak', links: [ {text: 'Pişirme Grubu', link:'#'}, {text: 'Hazırlama', link:'#'}, {text: 'Tüm Mutfak ►', link: '#'} ] }, { title: 'Ev Tekstili', links: [ {text: 'Nevresim Takımı', link:'#'}, {text: 'Havlu', link:'#'}, {text: 'Yastık', link: '#'} ] }, { title: 'Dekorasyon', links: [ {text: 'Vazo', link:'#'}, {text: 'Mumluk', link:'#'}, {text: 'Tablo', link: '#'} ] } ], promos: [ { img: 'https://picsum.photos/200/100?image=401', title: 'Yeni Sofra Koleksiyonu', link: '#' } ] },
  'Çocuk': { sideLinks: [ { text: 'Kız Çocuk', link: '#' }, { text: 'Erkek Çocuk', link: '#' }, { text: 'Bebek', link: '#' } ], columns: [ { title: 'Kız Çocuk Giyim', links: [ {text: 'Elbise', link:'#'}, {text: 'T-shirt', link:'#'}, {text: 'Tüm Giyim ►', link: '#'} ] }, { title: 'Erkek Çocuk Giyim', links: [ {text: 'T-shirt', link:'#'}, {text: 'Pantolon', link:'#'}, {text: 'Tüm Giyim ►', link: '#'} ] }, { title: 'Çocuk Ayakkabı', links: [ {text: 'Sneaker', link:'#'}, {text: 'Bot', link:'#'} ] } ], promos: [ { img: 'https://picsum.photos/200/100?image=501', title: 'Okula Dönüş', link: '#' }, { img: 'https://picsum.photos/200/100?image=502', title: 'Popüler Oyuncaklar', link: '#' } ] },
  'Anne & Bebek & Oyuncak': { sideLinks: [ { text: 'Bebek Giyim', link: '#' }, { text: 'Bebek Arabası', link: '#' }, { text: 'Beslenme', link: '#' }, { text: 'Oyuncak', link: '#'} ], columns: [ { title: 'Bebek Giyim', links: [ {text: 'Zıbın', link:'#'}, {text: 'Tulum', link:'#'}, {text: 'Tüm Giyim ►', link: '#'} ] }, { title: 'Bebek Arabası', links: [ {text: 'Puset', link:'#'}, {text: 'Aksesuarlar', link:'#'} ] }, { title: 'Beslenme', links: [ {text: 'Mama Sandalyesi', link:'#'}, {text: 'Biberon', link:'#'} ] }, { title: 'Oyuncak', links: [ {text: 'Eğitici Oyuncaklar', link:'#'}, {text: 'Peluş Oyuncaklar', link:'#'} ] } ], promos: [ { img: 'https://picsum.photos/200/100?image=601', title: 'Tüm Bebek İhtiyaçları', link: '#' } ] },
  'Teknoloji': { sideLinks: [ { text: 'Giyilebilir Teknoloji', link: '#' }, { text: 'Ses Sistemleri', link: '#' }, { text: 'Kişisel Bakım', link: '#' }, { text: 'Ev Aletleri', link: '#'} ], columns: [ { title: 'Giyilebilir', links: [ {text: 'Akıllı Saat', link:'#'}, {text: 'Akıllı Bileklik', link:'#'} ] }, { title: 'Ses', links: [ {text: 'Kulaklık', link:'#'}, {text: 'Hoparlör', link:'#'} ] }, { title: 'Kişisel Bakım', links: [ {text: 'Saç Şekillendirici', link:'#'}, {text: 'Tıraş Makinesi', link:'#'} ] }, { title: 'Ev Aletleri', links: [ {text: 'Süpürge', link:'#'}, {text: 'Mutfak Robotu', link:'#'} ] } ], promos: [ { img: 'https://picsum.photos/200/100?image=701', title: 'Kulaklık Fırsatları', link: '#' }, { img: 'https://picsum.photos/200/100?image=702', title: 'Dyson Keşfet', link: '#' } ] },
  'Spor & Outdoor': { sideLinks: [ { text: 'Spor Giyim', link: '#' }, { text: 'Spor Ayakkabı', link: '#' }, { text: 'Fitness', link: '#' }, { text: 'Outdoor', link: '#'} ], columns: [ { title: 'Spor Giyim', links: [ {text: 'Tayt', link:'#'}, {text: 'Eşofman', link:'#'}, {text: 'Bra', link:'#'} ] }, { title: 'Spor Ayakkabı', links: [ {text: 'Koşu', link:'#'}, {text: 'Yürüyüş', link:'#'}, {text: 'Tüm Ayakkabılar ►', link:'#'} ] }, { title: 'Fitness', links: [ {text: 'Mat', link:'#'}, {text: 'Ekipmanlar', link:'#'} ] }, { title: 'Outdoor', links: [ {text: 'Mont', link:'#'}, {text: 'Bot', link:'#'} ] } ], promos: [ { img: 'https://picsum.photos/200/100?image=801', title: 'Yeni Sezon Spor', link: '#' } ] },
  'Outlet': { sideLinks: [ { text: 'Kadın Outlet', link: '#' }, { text: 'Erkek Outlet', link: '#' }, { text: 'Çocuk Outlet', link: '#'} ], columns: [ { title: 'Kadın Giyim', links: [ {text: 'Elbise', link:'#'}, {text: 'Dış Giyim', link:'#'} ] }, { title: 'Kadın Ayakkabı', links: [ {text: 'Sneaker', link:'#'}, {text: 'Bot', link:'#'} ] }, { title: 'Erkek Giyim', links: [ {text: 'T-shirt', link:'#'}, {text: 'Pantolon', link:'#'} ] }, { title: 'Erkek Ayakkabı', links: [ {text: 'Sneaker', link:'#'}, {text: 'Bot', link:'#'} ] } ], promos: [ { img: 'https://picsum.photos/200/100?image=901', title: 'Outlet Fırsatları', link: '#' } ] },
  'Reborn': { sideLinks: [ { text: 'Lüks Çanta', link: '#' }, { text: 'Lüks Ayakkabı', link: '#' }, { text: 'Lüks Aksesuar', link: '#'} ], columns: [ { title: 'Markalar (Çanta)', links: [ {text: 'Chanel', link:'#'}, {text: 'Gucci', link:'#'}, {text: 'Dior', link:'#'} ] }, { title: 'Markalar (Ayakkabı)', links: [ {text: 'Prada', link:'#'}, {text: 'Louboutin', link:'#'} ] } ], promos: [ { img: 'https://picsum.photos/200/100?image=950', title: 'Vintage Keşfet', link: '#' } ] },
});

const activeCategory = ref(null);
const isMegaMenuVisible = ref(false);
let hideTimeout = null;

function showMegaMenu(category) {
  clearTimeout(hideTimeout);
  const data = megaMenuData.value[category];
  if (data && (data.sideLinks?.length > 0 || data.columns?.length > 0 || data.promos?.length > 0)) {
      activeCategory.value = category;
      isMegaMenuVisible.value = true;
  } else {
       hideMegaMenuImmediately();
  }
}

function hideMegaMenu() {
  hideTimeout = setTimeout(() => {
    isMegaMenuVisible.value = false;
    activeCategory.value = null;
  }, 150);
}

function keepMenuOpen() {
  clearTimeout(hideTimeout);
}

function hideMegaMenuImmediately() {
    clearTimeout(hideTimeout);
    isMegaMenuVisible.value = false;
    activeCategory.value = null;
}

const currentMenuData = computed(() => {
  const data = activeCategory.value ? megaMenuData.value[activeCategory.value] : null;
  return (data && (data.sideLinks?.length > 0 || data.columns?.length > 0 || data.promos?.length > 0)) ? data : null;
});
</script>

<style scoped>
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
.icon-group .icon-item {
    margin-left: 1.5rem;
    padding: 0 !important;
    cursor: pointer;
    text-decoration: none;
    color: #333;
    position: relative;
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
.mega-menu-side-link {
  display: block;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  color: #212529;
  text-decoration: none;
  font-weight: 600;
  white-space: nowrap;
  border-bottom: 1px solid #f8f9fa;
}
.mega-menu-side-link:hover {
  color: #000;
  background-color: #f8f9fa;
  border-left: 3px solid #40579e;
  padding-left: calc(1rem - 3px);
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
</style>