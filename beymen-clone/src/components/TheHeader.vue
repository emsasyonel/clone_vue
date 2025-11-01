<template>
  <header class="sticky-top bg-white border-bottom position-relative">

    <BContainer fluid class="top-bar py-1 border-bottom d-flex justify-content-end" style="padding-left: 50px; padding-right: 20px;">
      <BNav class="justify-content-end" style="color: #555 !important;">
        <BNavItem href="#" class="small top-link"><span class="d-block icon-text">Repair</span></BNavItem>
        <BNavItem href="#" class="small top-link"><span class="d-block icon-text">Sipariş Takibi</span></BNavItem>
        <BNavItem href="#" class="small top-link"><span class="d-block icon-text">Kampanyalar</span></BNavItem>
        <BNavItem href="#" class="small top-link"><span class="d-block icon-text">The One</span></BNavItem>
        <BNavItem href="#" class="small top-link"><span class="d-block icon-text">Servisler</span></BNavItem>
        <BNavItem href="#" class="small top-link"><span class="d-block icon-text"><i class="bi bi-globe me-1"></i> TR</span></BNavItem>
      </BNav>
    </BContainer>



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
        <BNavItem :to="{ name: 'Favorites' }" class="nav-link text-center icon-item p-0">
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
      columns: [
        { title: 'Elbise', links: [ { text: 'Siyah Elbise', link: '#' }, { text: 'Jean Elbise', link: '#' }, { text: 'Tulum', link: '#' }, { text: 'Abiye Elbise', link: '#' }, { text: 'Tüm Elbise ►', link: '#' } ] },
        { title: 'Takım', links: [ { text: 'Takım', link: '#' } ] }, // // 'Takım' eklendi
        { title: 'Etek', links: [ { text: 'Deri Etek', link: '#' }, { text: 'Abiye Etek', link: '#' }, { text: 'Tüm Etek ►', link: '#' } ] },
        { title: 'Triko & Kazak', links: [ { text: 'Kazak', link: '#' }, { text: 'Süveter', link: '#' }, { text: 'Tüm Triko & Kazak ►', link: '#' } ] },
        { title: 'Sweatshirt', links: [ { text: 'Sweatshirt', link: '#' } ] }, // // 'Sweatshirt' eklendi
        { title: 'Gömlek & Bluz', links: [ { text: 'Bluz', link: '#' }, { text: 'Büstiyer', link: '#' }, { text: 'Jean Gömlek', link: '#' }, { text: 'Tüm Gömlek & Bluz ►', link: '#' } ] },
        { title: 'T-Shirt', links: [ { text: 'T-Shirt', link: '#' } ] }, // // 'T-Shirt' eklendi
        { title: 'Dış Giyim', links: [
            { text: 'Mont', link: '#' },
            { text: 'Kaban', link: '#' },
            { text: 'Palto', link: '#' },
            { text: 'Pardösü', link: '#' },
            { text: 'Yağmurluk', link: '#' },
            { text: 'Yelek', link: '#' }, // // 'Yelek' buraya taşındı
            { text: 'Tüm Dış Giyim ►', link: '#' }
          ]
        },
        { title: 'Ceket', links: [ { text: 'Blazer', link: '#' }, { text: 'Klasik Ceket', link: '#' }, { text: 'Tüm Ceket ►', link: '#' } ] },
        { title: 'Pantolon', links: [ { text: 'Tayt & Legging', link: '#' }, { text: 'Spor Pantolon', link: '#' }, { text: 'Tüm Pantolon ►', link: '#' } ] },
        { title: 'Jean Pantolon', links: [ { text: 'Jean Pantolon', link: '#' } ] }, // // 'Yelek' buradan kaldırıldı
      ],
      promos: [
        { img: 'https://cdn.beymen.com/bannerimages/menu-tum-urunler_2022030815084030426.png', title: 'Tüm Giyim Ürünleri', link: '#' },
        { img: 'https://cdn.beymen.com/bannerimages/menu-tum-yeni-gelenler_2022030815085866516.png', title: 'Giyim Yeni Gelenler', link: '#' },
        { img: 'https://cdn.beymen.com/bannerimages/menu-tum-indirimliler_2022030815082413329.png', title: 'Giyim İndirimleri', link: '#' },
      ]
    },
    'Ayakkabı': {
      // // AYAKKABI GÜNCELLENDİ (Başlıksız 2 sütun)
      columns: [
        {
          title: '', // Başlık yok
          links: [
            { text: 'Sneaker', link: '#' },
            { text: 'Bot', link: '#' },
            { text: 'Çizme', link: '#' },
            { text: 'Kar Botu', link: '#' },
            { text: 'Terlik', link: '#' },
          ]
        },
        {
          title: '', // Başlık yok
          links: [
            { text: 'Gece Ayakkabısı', link: '#' },
            { text: 'Topuklu Ayakkabı', link: '#' },
            { text: 'Babet', link: '#' },
            { text: 'Loafer', link: '#' },
          ]
        }
      ],
      promos: [
        { img: 'https://cdn.beymen.com/bannerimages/menu-tum-urunler_2022030815084030426.png', title: 'Tüm Ayakkabı Ürünleri', link: '#' },
        { img: 'https://cdn.beymen.com/bannerimages/menu-tum-yeni-gelenler_2022030815085866516.png', title: 'Ayakkabı Yeni Gelenler', link: '#' },
        { img: 'https://cdn.beymen.com/bannerimages/menu-tum-indirimliler_2022030815082413329.png', title: 'Ayakkabı İndirimler', link: '#' }
      ]
    },
    'Çanta': {
      // // ÇANTA GÜNCELLENDİ (Başlıksız 2 sütun)
      columns: [
        { 
          title: '',
          links: [
            { text: 'Omuz Çantası', link: '#' },
            { text: 'Alışveriş Çantası', link: '#' },
            { text: 'El Portföyü', link: '#' },
            { text: 'El Çantası', link: '#' },
            { text: 'Sırt Çantası', link: '#' },
            { text: 'Bavul & Seyahat Çantası', link: '#' },
          ] 
        },
        { 
          title: '',
          links: [
            { text: 'Abiye Çanta', link: '#' },
            { text: 'Bel Çantası', link: '#' },
            { text: 'Torba/Büzgülü Çanta', link: '#' },
            { text: 'Evrak Çantası & Laptop Çantası', link: '#' },
            { text: 'Çanta Aksesuarı', link: '#' },
          ] 
        }
      ],
      promos: [
        { img: 'https://cdn.beymen.com/bannerimages/menu-tum-urunler_2022030815084030426.png', title: 'Tüm Çanta Ürünleri', link: '#' },
        { img: 'https://cdn.beymen.com/bannerimages/menu-tum-yeni-gelenler_2022030815085866516.png', title: 'Çanta Yeni Gelenler', link: '#' },
        { img: 'https://cdn.beymen.com/bannerimages/menu-tum-indirimliler_2022030815082413329.png', title: 'Çanta İndirimler', link: '#' }
      ]
    },
    'Aksesuar': {
      // // AKSESUAR GÜNCELLENDİ (Başlıksız 1 sütun + Başlıklı 2 sütun)
      columns: [
        {
          title: '', // Başlıksız sütun
          links: [
            { text: 'Güneş Gözlüğü', link: '#' },
            { text: 'Cüzdan', link: '#' },
            { text: 'Kemer', link: '#' },
            { text: 'Şapka', link: '#' },
            { text: 'Kartvizitlik', link: '#' },
            { text: 'Kol saati', link: '#' },
            { text: 'Eşarp / Fular / Şal', link: '#' },
            { text: 'Anahtarlık', link: '#' },
            { text: 'Çorap', link: '#' },
          ]
        },
        {
          title: 'Bijüteri', // Başlıklı sütun
          links: [
            { text: 'Bijuteri Bileklik', link: '#' }, { text: 'Bijuteri Kolye', link: '#' }, { text: 'Bijuteri Küpe', link: '#' },
            { text: 'Bijuteri Yüzük', link: '#' }, { text: 'Gümüş Küpe', link: '#' }, { text: 'Gümüş Yüzük', link: '#' },
            { text: 'İnci Kolye', link: '#' }, { text: 'İnci Küpe', link: '#' }, { text: 'Gümüş Kolye', link: '#' },
            { text: 'Tüm Bijüteri ►', link: '#' }
          ]
        },
        {
          title: 'Mücevher', // Başlıklı sütun
          links: [
            { text: 'Altın Yüzük', link: '#' }, { text: 'Altın Kolye', link: '#' }, { text: 'Altın Küpe', link: '#' },
            { text: 'Altın Bileklik', link: '#' }, { text: 'Altın Bilezik', link: '#' }, { text: 'Pırlanta Bileklik', link: '#' },
            { text: 'Pırlanta Kolye', link: '#' }, { text: 'Pırlanta Küpe', link: '#' }, { text: 'Pırlanta Yüzük', link: '#' },
            { text: 'Tüm Mücevher ►', link: '#' }
          ]
        }
      ],
      promos: [
        { img: 'https://picsum.photos/200/100?image=150', title: 'Tüm Aksesuarlar', link: '#' },
        { img: 'https://picsum.photos/200/100?image=151', title: 'Aksesuar Yeni Gelenler', link: '#' }
      ]
    },
    'Reborn - Lüks İkinci El': {
      // // Örnek olarak dolduruldu
      'Lüks Çanta': {
        columns: [ { title: 'Markalar', links: [ {text: 'Chanel', link:'#'}, {text: 'Gucci', link:'#'} ] } ],
        promos: [ { img: 'https://picsum.photos/200/100?image=950', title: 'Vintage Keşfet', link: '#' } ]
      },
      'Lüks Ayakkabı': {
        columns: [ { title: 'Markalar', links: [ {text: 'Prada', link:'#'}, {text: 'Louboutin', link:'#'} ] } ],
        promos: []
      }
    },
    'Wellness & Kişisel Bakım': {
      // // Örnek olarak dolduruldu
      'Cilt Bakımı': {
        columns: [ { title: 'Nemlendirici', links: [ {text: 'Yüz Nemlendiricisi', link:'#'} ] } ],
        promos: []
      },
      'Parfüm': {
        columns: [ { title: 'Niş Parfüm', links: [ {text: 'Tüm Niş Parfümler', link:'#'} ] } ],
        promos: []
      }
    },
'Öne Çıkan Markalar': {
      columns: [
        // Sütun 1 (5 marka)
        { 
          title: '', // Başlık yok
          links: [
            { text: 'Beymen', link: '#' },
            { text: 'Bottega Veneta', link: '#' },
            { text: 'Valentino Garavani', link: '#' },
            { text: 'McQueen', link: '#' },
            { text: 'Polo Ralph Lauren', link: '#' },
          ] 
        },
        // Sütun 2 (5 marka)
        { 
          title: '', // Başlık yok
          links: [
            { text: 'Beymen Club', link: '#' },
            { text: 'Golden Goose', link: '#' },
            { text: 'Tory Burch', link: '#' },
            { text: 'Beymen Collection', link: '#' },
            { text: 'Academia', link: '#' },
          ] 
        }
      ],
      promos: [] // Promosyon yok
    },
  },




  'Erkek': {
    // // Yeni sıralamana göre sol menü başlıkları:
'Giyim': {
      columns: [
        // === 1. GRUP: ALT KATEGORİLERİ OLANLAR (Aynen kalır) ===
        { 
          title: 'Dış Giyim', 
          links: [ 
            { text: 'Mont', link: '#' }, { text: 'Deri Mont', link: '#' }, { text: 'Kaban', link: '#' }, 
            { text: 'Parka', link: '#' }, { text: 'Spor Yelek', link: '#' }, { text: 'Pardösü', link: '#' }, 
            { text: 'Palto', link: '#' }, { text: 'Yağmurluk', link: '#' }, { text: 'Tüm Dış Giyim ►', link: '#' }
          ] 
        },
        {
          title: 'Triko & Kazak', 
          links: [
            { text: 'Triko', link: '#' }, { text: 'Kazak', link: '#' }, { text: 'Hırka', link: '#' },
            { text: 'Tüm Triko & Kazak ►', link: '#' }
          ]
        },
        {
          title: 'Gömlek', 
          links: [
            { text: 'Jean Gömlek', link: '#' }, { text: 'Tüm Gömlek ►', link: '#' }
          ]
        },
        {
          title: 'Ceket', 
          links: [
            { text: 'Klasik Ceket', link: '#' }, { text: 'Blazer', link: '#' }, { text: 'Spor Ceket', link: '#' },
            { text: 'Klasik Yelek', link: '#' }, { text: 'Tüm Ceket ►', link: '#' }
          ]
        },
        {
          title: 'Spor Giyim', 
          links: [
            { text: 'Spor T-shirt', link: '#' }, { text: 'Eşofman Altı', link: '#' },
            { text: 'Tüm Spor Giyim ►', link: '#' }
          ]
        },

        // === 2. GRUP: ALT LİNKİ OLMAYANLAR (links: [] DOLDURULDU) ===
        { 
          title: 'T-Shirt', 
          links: [{ text: 'Tüm T-Shirt ►', link: '#' }] // // Dolduruldu
        },
        { 
          title: 'Sweatshirt', 
          links: [{ text: 'Tüm Sweatshirt ►', link: '#' }] // // Dolduruldu
        },
        { 
          title: 'Polo Yaka T-Shirt', 
          links: [{ text: 'Tüm Polo Yaka T-Shirt ►', link: '#' }] // // Dolduruldu
        },
        { 
          title: 'Pantolon', 
          links: [{ text: 'Tüm Pantolon ►', link: '#' }] // // Dolduruldu
        }, 
        { 
          title: 'Jean Pantolon', 
          links: [{ text: 'Tüm Jean Pantolon ►', link: '#' }] // // Dolduruldu
        },
        { 
          title: 'Takım Elbise', 
          links: [{ text: 'Tüm Takım Elbise ►', link: '#' }] // // Dolduruldu
        }
      ],
      promos: [
        { img: 'https://picsum.photos/200/100?image=201', title: 'Erkek Yeni Sezon', link: '#' },
        { img: 'https://picsum.photos/200/100?image=202', title: 'Erkek İndirim', link: '#' }
      ]
    },



    
'Ayakkabı': {
      columns: [
        // Sütun 1 (5 link)
        { 
          title: '', // Başlık yok
          links: [
            { text: 'Sneaker', link: '#' },
            { text: 'Klasik Ayakkabı', link: '#' },
            { text: 'Bot', link: '#' },
            { text: 'Espadril', link: '#' },
            { text: 'Loafer', link: '#' },
          ] 
        },
        // Sütun 2 (4 link)
        { 
          title: '', // Başlık yok
          links: [
            { text: 'Driver', link: '#' },
            { text: 'Sandalet', link: '#' },
            { text: 'Terlik', link: '#' },
            { text: 'Smokin Ayakkabısı', link: '#' },
          ] 
        }
      ],
      promos: [ // Promosyonları koruyoruz
        { img: 'https://picsum.photos/200/100?image=203', title: 'Yeni Sezon Ayakkabı', link: '#' }
      ]
    },


'Çanta': {
      // // 7 linki 2 sütuna böldük (4+3)
      columns: [
        // Sütun 1 (4 link)
        { 
          title: '', // Başlık yok
          links: [
            { text: 'Sırt Çantası', link: '#' },
            { text: 'Bavul', link: '#' },
            { text: 'Evrak Çantası', link: '#' },
            { text: 'Bel Çantası', link: '#' },
          ] 
        },
        // Sütun 2 (3 link)
        { 
          title: '', // Başlık yok
          links: [
            { text: 'Omuz Çantası', link: '#' },
            { text: 'Tıraş Çantası', link: '#' },
            { text: 'El Portföyü', link: '#' },
          ] 
        }
      ],
      promos: [ // Çanta için de promosyon ekleyelim
        { img: 'https://picsum.photos/200/100?image=204', title: 'Yeni Sezon Çantalar', link: '#' }
      ]
    },


'Aksesuar': {
      // // 11 linki 2 sütuna böldük (6+5)
      columns: [
        // Sütun 1 (6 link)
        { 
          title: '', // Başlık yok
          links: [
            { text: 'Kol Saati', link: '#' },
            { text: 'Güneş Gözlüğü', link: '#' },
            { text: 'Şapka', link: '#' },
            { text: 'Cüzdan', link: '#' },
            { text: 'Kemer', link: '#' },
            { text: 'Kartlık/Kartvizitlik', link: '#' },
          ] 
        },
        // Sütun 2 (5 link)
        { 
          title: '', // Başlık yok
          links: [
            { text: 'Atkı & Bere & Eldiven', link: '#' },
            { text: 'Çorap', link: '#' },
            { text: 'Takı', link: '#' },
            { text: 'Kol Düğmesi', link: '#' },
            { text: 'Kravat & Poşet Mendil', link: '#' },
          ] 
        }
      ],
      promos: [ // Aksesuar için de promosyon ekleyelim
        { img: 'https://picsum.photos/200/100?image=205', title: 'Yeni Sezon Aksesuarlar', link: '#' }
      ]
    },

    'Reborn - Lüks İkinci El': {
      // // Yeni eklendi (içi boş)
      columns: [
        { title: 'Erkek Lüks Saat', links: [{text: 'Tüm Saatler', link: '#'}] }
      ],
      promos: []
    },
    'Hobi & Eğlence': {
      // // Yeni eklendi (içi boş)
      columns: [
        { title: 'Ses Sistemleri', links: [{text: 'Kulaklık', link: '#'}] }
      ],
      promos: []
    },

    
'Öne Çıkan Markalar': {
      // // 11 markayı 2 sütuna böldük (6+5)
      columns: [
        // Sütun 1 (6 marka)
        { 
          title: '', // Başlık yok
          links: [
            { text: 'McQueen', link: '#' },
            { text: 'Polo Ralph Lauren', link: '#' },
            { text: 'Beymen Collection', link: '#' },
            { text: 'Dolce&Gabbana', link: '#' },
            { text: 'AllSaints', link: '#' },
            { text: 'Valentino Garavani', link: '#' },
          ] 
        },
        // Sütun 2 (5 marka)
        { 
          title: '', // Başlık yok
          links: [
            { text: 'Etro', link: '#' },
            { text: 'Academia', link: '#' },
            { text: 'Beymen Club', link: '#' },
            { text: 'Network', link: '#' },
            { text: 'Giorgio Armani', link: '#' },
          ] 
        }
      ],
      promos: [] // Promosyon yok
    }
  },
  
  
'Kozmetik/BBS': {
    // // Yeni sol menü sıralamana göre güncellendi


'Makyaj': {
      columns: [
        // Sütun 1: Yüz Makyajı
        {
          title: 'Yüz Makyajı',
          links: [
            { text: 'Allık', link: '#' },
            { text: 'Aydınlatıcı / Highlighter', link: '#' },
            { text: 'BB/CC Krem', link: '#' },
            { text: 'Fondöten', link: '#' },
            { text: 'Kapatıcı', link: '#' },
            { text: 'Makyaj Bazı / Sabitleyiciler', link: '#' },
            { text: 'Pudra', link: '#' },
            { text: 'Tüm Yüz Makyajı ►', link: '#' }
          ]
        },
        // Sütun 2: Dudak Makyajı
        {
          title: 'Dudak Makyajı',
          links: [
            { text: 'Dudak Kalemi', link: '#' },
            { text: 'Dudak Parlatıcısı', link: '#' },
            { text: 'Ruj', link: '#' },
            { text: 'Tüm Dudak Makyajı ►', link: '#' }
          ]
        },
        // Sütun 3: Göz Makyajı
        {
          title: 'Göz Makyajı',
          links: [
            { text: 'Eyeliner', link: '#' },
            { text: 'Göz Farı', link: '#' },
            { text: 'Göz Kalemi', link: '#' },
            { text: 'Kaş Kalemi', link: '#' },
            { text: 'Kaş Maskarası', link: '#' },
            { text: 'Maskara / Rimel', link: '#' },
            { text: 'Tüm Göz Makyajı ►', link: '#' }
          ]
        },
        // Sütun 4: Tırnak
        {
          title: 'Tırnak',
          links: [
            { text: 'Oje', link: '#' },
            { text: 'Törpü / Manikür Aletleri', link: '#' },
            { text: 'Tüm Tırnak ►', link: '#' }
          ]
        },
        // Sütun 5: Makyaj Aksesuarı
        {
          title: 'Makyaj Aksesuarı',
          links: [
            { text: 'Geçici Dövme', link: '#' },
            { text: 'Diğer Makyaj Aksesuarları', link: '#' },
            { text: 'Makyaj Çantaları', link: '#' },
            { text: 'Makyaj Fırça / Sünger', link: '#' },
            { text: 'Tüm Makyaj Aksesuarı ►', link: '#' }
          ]
        }
      ],
      promos: [ // Makyaj için promosyonlar
        { img: 'https://picsum.photos/200/100?image=302', title: 'Yeni Sezon Makyaj', link: '#' }
      ]
    },

'Cilt Bakımı': {
      columns: [
        // // Sütun 1: Başlıksız Ana Kategoriler
        { 
          title: 'Cilt Bakım Setleri', // Başlık yok
          links: [
            { text: 'Cilt Bakım Setleri', link: '#' },
            { text: 'Yüz Kremi', link: '#' },
            { text: 'Cilt Bakım Yağı', link: '#' },
            { text: 'Cilt Serumu', link: '#' }
          ] 
        },
        // // Sütun 2: Temizleyiciler
        { 
          title: 'Temizleyiciler', 
          links: [
            { text: 'Makyaj Temizleyiciler', link: '#' },
            { text: 'Yüz Yıkama ve Temizleyiciler', link: '#' },
            { text: 'Tonikler', link: '#' },
            { text: 'Peeling', link: '#' },
            { text: 'Tüm Temizleyiciler ►', link: '#' }
          ] 
        },
        // // Sütun 3: Göz & Dudak Bakımı
        { 
          title: 'Göz & Dudak Bakımı', 
          links: [
            { text: 'Göz Kremi', link: '#' },
            { text: 'Kaş Kirpik Bakımı', link: '#' },
            { text: 'Dudak Bakımı', link: '#' },
            { text: 'Dudak Kremi ve Peelingi', link: '#' },
            { text: 'Göz Serumu', link: '#' },
            { text: 'Tüm Göz & Dudak Bakımı ►', link: '#' }
          ] 
        },
        // // Sütun 4: Bakım Ürünleri
        { 
          title: 'Bakım Ürünleri', 
          links: [
            { text: 'Antiaging', link: '#' },
            { text: 'Yüz Maskeleri', link: '#' },
            { text: 'Onarıcı', link: '#' },
            { text: 'Yüz Bakım Yağı', link: '#' },
            { text: 'Boyun Dekolte Kremi', link: '#' },
            { text: 'Tüm Bakım Ürünleri ►', link: '#' }
          ] 
        },
        // // Sütun 5: Cihazlar
        { 
          title: 'Cilt Temizleme & Bakım Cihazları', 
          links: [
            { text: 'Cilt Bakım Cihazı', link: '#' },
            { text: 'Cilt temizleme cihaz', link: '#' }
          ] 
        }
      ],
      promos: [ // Promosyonları güncelleyelim
        { img: 'https://picsum.photos/200/100?image=304', title: 'Cilt Bakım Setleri', link: '#' },
        { img: 'https://picsum.photos/200/100?image=306', title: 'Güneş Koruması', link: '#' }
      ]
    },


'Parfüm': {
      // // 6 linki 2 sütuna böldük (3+3)
      columns: [
        // Sütun 1
        { 
          title: '', // Başlık yok
          links: [
            { text: 'Erkek Parfüm', link: '#' },
            { text: 'Kadın Parfüm', link: '#' },
            { text: 'Parfüm Setleri', link: '#' },
          ] 
        },
        // Sütun 2
        { 
          title: '', // Başlık yok
          links: [
            { text: 'Deodorant', link: '#' },
            { text: 'Kolonya', link: '#' },
            { text: 'ÇOK SATANLAR', link: '#' }, // Bu linki de ekledik
          ] 
        }
      ],
      promos: [ // Promosyonları koruyoruz
        { img: 'https://picsum.photos/200/100?image=301', title: 'Çok Satan Parfümler', link: '#' }
      ]
    },

'Saç Bakımı': {
      columns: [
        // Sütun 1: Başlıksız (Ana Kategoriler 1)
        { 
          title: '', // Başlık yok
          links: [
            { text: 'Şampuanlar', link: '#' },
            { text: 'Saç Kremleri', link: '#' },
            { text: 'Saç Fırça/Tarak', link: '#' },
          ] 
        },
        // Sütun 2: Başlıksız (Ana Kategoriler 2)
        { 
          title: '', // Başlık yok
          links: [
            { text: 'Saç Bakım Ürünleri', link: '#' },
            { text: 'Saç Bakım Setleri', link: '#' },
            { text: 'Saç Maskesi', link: '#' },
            { text: 'Saç Toniği', link: '#' },
          ] 
        },
        // Sütun 3: Başlıklı (Saç Şekillendiriciler)
        { 
          title: 'Saç Şekillendiriciler', 
          links: [
            { text: 'Briyantin- Jöle', link: '#' },
            { text: 'Saç Spreyi /Köpüğü', link: '#' },
            { text: 'Tüm Saç Şekillendiriciler ►', link: '#' }
          ] 
        }
      ],
      promos: [ // Saç bakımı için de promosyon ekleyelim
        { img: 'https://picsum.photos/200/100?image=307', title: 'Popüler Saç Bakım Ürünleri', link: '#' }
      ]
    },


    'Korean Beauty': {
      columns: [ 
        { title: 'Maske', links: [ {text: 'Kağıt Maske', link:'#'} ] },
        { title: 'Serum', links: [ {text: 'K-Beauty Serumları', link:'#'} ] }
      ],
      promos: [ { img: 'https://picsum.photos/200/100?image=305', title: 'Kore Güzelliği', link: '#' } ]
    },



'Kişisel Bakım': {
      columns: [
        // Sütun 1: Ağız Bakımı
        { 
          title: 'Ağız Bakım', 
          links: [
            { text: 'Tüm Ağız Bakım ►', link: '#' } // // Listen tek öğeydi, "Tüm..." linki ekledim
          ] 
        },
        // Sütun 2: Vücut Bakımı
        { 
          title: 'Vücut Bakımı', 
          links: [
            { text: 'Nemlendirici Krem/Losyon', link: '#' },
            { text: 'Antiselülit', link: '#' },
            { text: 'Göğüs Kremi', link: '#' },
            { text: 'Sıkılaştırıcı', link: '#' },
            { text: 'Masaj Yağları/Kremleri', link: '#' },
            { text: 'Vücut Spreyi/Pudra', link: '#' },
            { text: 'Tüm Vücut Bakımı ►', link: '#' }
          ] 
        },
        // Sütun 3: Banyo Duş
        { 
          title: 'Banyo Duş', 
          links: [
            { text: 'Duş Jeli-Köpüğü', link: '#' },
            { text: 'Peeling', link: '#' },
            { text: 'Sabun', link: '#' },
            { text: 'Tüm Banyo Duş ►', link: '#' }
          ] 
        },
        // Sütun 4: El & Ayak Bakımı
        { 
          title: 'El & Ayak Bakımı', 
          links: [
            { text: 'El Kremi', link: '#' },
            { text: 'Ayak Kremi', link: '#' },
            { text: 'Tırnak Bakımı', link: '#' },
            { text: 'Tüm El & Ayak Bakımı ►', link: '#' }
          ] 
        }
      ],
      promos: [ // Promosyon ekleyelim
        { img: 'https://picsum.photos/200/100?image=308', title: 'Vücut Bakım Fırsatları', link: '#' }
      ]
    },


'Erkek Bakım Ürünleri': {
      columns: [
        // Sütun 1: Başlıksız (Ana Kategoriler)
        { 
          title: '', // Başlık yok
          links: [
            { text: 'Erkek Bakım Seti', link: '#' },
            { text: 'Erkek Cilt Bakımı', link: '#' },
            { text: 'Vücut Banyo', link: '#' },
            { text: 'Erkek Saç Bakımı', link: '#' },
          ] 
        },
        // Sütun 2: Başlıklı (Tıraş Ürünleri)
        { 
          title: 'Tıraş Ürünleri', 
          links: [
            { text: 'Tıraş Kremi / Köpüğü', link: '#' },
            { text: 'After Shave', link: '#' },
            { text: 'Tıraş Takım/Fırça', link: '#' },
            { text: 'Tüm Tıraş Ürünleri ►', link: '#' }
          ] 
        }
      ],
      promos: [ // Promosyon ekleyelim
        { img: 'https://picsum.photos/200/100?image=309', title: 'Erkek Bakım Fırsatları', link: '#' }
      ]
    },



'Güneş Koruyucular': {
      columns: [
        // // 3 linki tek bir sütuna topladık
        { 
          title: 'Güneş Bakımı', // // Bir başlık ekledik
          links: [ 
            { text: 'Güneş Kremi / Losyonu', link: '#' },
            { text: 'Bronzlaştırıcılar', link: '#' },
            { text: 'Güneş Sonrası Krem/Losyon', link: '#' },
            { text: 'Tüm Güneş Ürünleri ►', link: '#' } // // Bir "Tüm" linki ekledik
          ] 
        }
      ],
      promos: [ // Promosyon ekleyelim
        { img: 'https://picsum.photos/200/100?image=310', title: 'Güneş Korumada Fırsatlar', link: '#' }
      ]
    },

'Öne Çıkan Markalar': {
      // // 11 markayı 2 sütuna böldük (6+5)
      columns: [
        // Sütun 1
        { 
          title: '', // Başlık yok
          links: [
            { text: 'CHANEL', link: '#' },
            { text: 'Charlotte Tilbury', link: '#' },
            { text: 'Tom Ford', link: '#' },
            { text: 'Loewe', link: '#' },
            { text: 'YSL - Yves Saint Laurent', link: '#' },
            { text: 'Foreo', link: '#' },
          ] 
        },
        // Sütun 2
        { 
          title: '', // Başlık yok
          links: [
            { text: 'Maison Francis Kurkdjian', link: '#' },
            { text: 'Dolce&Gabbana', link: '#' },
            { text: 'Hermès', link: '#' },
            { text: 'Gucci', link: '#' },
            { text: 'DR. Barbara Sturm', link: '#' },
          ] 
        }
      ],
      promos: [] // Promosyon yok
    },

'Beymen Beauty Mini': {
      columns: [
        // // 4 linki tek sütuna topladık
        { 
          title: '', // Başlık yok
          links: [
            { text: 'Mini Boy Parfüm', link: '#' },
            { text: 'Mini Boy Makyaj', link: '#' },
            { text: 'Mini Boy Cilt Bakımı', link: '#' },
            { text: 'Mini Boy Saç Bakımı', link: '#' },
          ] 
        }
      ],
      promos: [] // Promosyon yok
    },

    'Set Ürünler': {
      columns: [ 
        { title: 'Hediye Setleri', links: [ {text: 'Parfüm Setleri', link:'#'}, {text: 'Makyaj Setleri', link:'#'} ] }
      ],
      promos: []
    },
  },



'Ev & Yaşam': {
    // // Yeni sol menü sıralamana göre güncellendi
    'Sofra & Mutfak': {
      columns: [ 
        { title: 'Sofra', links: [ {text: 'Yemek Takımları', link:'#'}, {text: 'Bardak Setleri', link:'#'} ] },
        { title: 'Mutfak', links: [ {text: 'Pişirme Grubu', link:'#'}, {text: 'Hazırlama', link:'#'} ] }
      ],
      promos: [ { img: 'https://picsum.photos/200/100?image=401', title: 'Yeni Sofra Koleksiyonu', link: '#' } ]
    },
    'Ev Dekorasyon': {
      columns: [ 
        { title: 'Dekorasyon', links: [ {text: 'Vazo', link:'#'}, {text: 'Mumluk', link:'#'} ] }
      ],
      promos: []
    },
    'Mobilya': {
      columns: [ 
        { title: 'Mobilya', links: [ {text: 'Sehpa', link:'#'}, {text: 'Sandalye', link:'#'} ] }
      ],
      promos: []
    },
    'Banyo': {
      columns: [ 
        { title: 'Banyo Tekstili', links: [ {text: 'Havlu', link:'#'}, {text: 'Bornoz', link:'#'} ] }
      ],
      promos: []
    },
    'Elektrik & Aydınlatma': {
      columns: [ 
        { title: 'Aydınlatma', links: [ {text: 'Aplik', link:'#'}, {text: 'Abajur', link:'#'} ] }
      ],
      promos: []
    },
    'Ev Tekstili': {
      columns: [ 
        { title: 'Yatak Odası', links: [ {text: 'Nevresim Takımı', link:'#'}, {text: 'Yastık', link:'#'} ] }
      ],
      promos: []
    },
    'Hobi & Eğlence': {
      columns: [ 
        { title: 'Hobi', links: [ {text: 'Puzzle', link:'#'}, {text: 'Müzik', link:'#'} ] }
      ],
      promos: []
    },
    'Petshop': {
      columns: [ 
        { title: 'Kedi', links: [ {text: 'Kedi Maması', link:'#'} ] },
        { title: 'Köpek', links: [ {text: 'Köpek Maması', link:'#'} ] }
      ],
      promos: [ { img: 'https://picsum.photos/200/100?image=402', title: 'Patili Dostlar', link: '#' } ]
    },
    'Gıda & İçecek': {
      columns: [ 
        { title: 'İçecek', links: [ {text: 'Kahve', link:'#'}, {text: 'Çay', link:'#'} ] }
      ],
      promos: []
    },
    'Kitap & Kırtasiye': {
      columns: [ 
        { title: 'Kitap', links: [ {text: 'Sanat Kitapları', link:'#'} ] },
        { title: 'Kırtasiye', links: [ {text: 'Defter', link:'#'} ] }
      ],
      promos: []
    },
    'Öne Çıkan Markalar': {
      columns: [ 
        { title: '', links: [ {text: 'Fornasetti', link:'#'}, {text: 'Baobab Collection', link:'#'} ] }
      ],
      promos: []
    },
  },


'Çocuk': {
    // // Yeni sol menü sıralamana göre güncellendi


'Kız Bebek': {
      columns: [
        // Sütun 1
        { 
          title: 'Dış Giyim', 
          links: [ { text: 'Tüm Dış Giyim ►', link: '#' } ] // Tekil olduğu için "Tüm" linki ekledim
        },
        {
          title: 'Kazak & Hırka', 
          links: [
            { text: 'Kazak', link: '#' },
            { text: 'Hırka', link: '#' },
            { text: 'Tüm Kazak & Hırka ►', link: '#' }
          ]
        },
        { 
          title: 'T-shirt & Sweatshirt', 
          links: [ { text: 'Tüm T-shirt & Sweatshirt ►', link: '#' } ] // Tekil olduğu için "Tüm" linki ekledim
        },
        
        // Sütun 2
        {
          title: 'Tulum & Body', 
          links: [
            { text: 'Body', link: '#' },
            { text: 'Tulum', link: '#' },
            { text: 'Tüm Tulum & Body ►', link: '#' }
          ]
        },
        { 
          title: 'Elbise', 
          links: [ { text: 'Tüm Elbise ►', link: '#' } ] // Tekil olduğu için "Tüm" linki ekledim
        },
        {
          title: 'Gömlek & Bluz', 
          links: [
            { text: 'Bluz', link: '#' },
            { text: 'Tüm Gömlek & Bluz ►', link: '#' }
          ]
        },

        // Sütun 3
        {
          title: 'Set Ürünler', 
          links: [
            { text: 'İkili Set', link: '#' },
            { text: 'Hastane Çıkışı', link: '#' },
            { text: 'Tüm Set Ürünler ►', link: '#' }
          ]
        },
        {
          title: 'Pantolon & Şort', 
          links: [
            { text: 'Tayt', link: '#' },
            { text: 'Şort', link: '#' },
            { text: 'Tüm Pantolon & Şort ►', link: '#' }
          ]
        },
        
        // Sütun 4
        {
          title: 'Aksesuar', 
          links: [
            { text: 'Müslin Bezi', link: '#' },
            { text: 'Şapka', link: '#' },
            { text: 'Tüm Aksesuar ►', link: '#' }
          ]
        },
        { 
          title: 'Eşofman', 
          links: [ { text: 'Tüm Eşofman ►', link: '#' } ] // Tekil olduğu için "Tüm" linki ekledim
        },
        { 
          title: 'Mayo', 
          links: [ { text: 'Tüm Mayo ►', link: '#' } ] // Tekil olduğu için "Tüm" linki ekledim
        }
      ],
      promos: [ 
        { img: 'https://picsum.photos/200/100?image=501', title: 'Kız Bebek Yeni Sezon', link: '#' }
      ]
    },



'Erkek Bebek': {
      columns: [
        // Sütun 1
        { 
          title: 'Dış Giyim', 
          links: [ { text: 'Tüm Dış Giyim ►', link: '#' } ] 
        },
        {
          title: 'Kazak & Hırka', 
          links: [
            { text: 'Kazak', link: '#' },
            { text: 'Hırka', link: '#' },
            { text: 'Tüm Kazak & Hırka ►', link: '#' }
          ]
        },

        // Sütun 2
        {
          title: 'T-shirt & Sweatshirt', 
          links: [
            { text: 'T-shirt', link: '#' },
            { text: 'Tüm T-shirt & Sweatshirt ►', link: '#' }
          ]
        },
        {
          title: 'Tulum & Body', 
          links: [
            { text: 'Body', link: '#' },
            { text: 'Tulum', link: '#' },
            { text: 'Tüm Tulum & Body ►', link: '#' }
          ]
        },

        // Sütun 3
        { 
          title: 'Gömlek', 
          links: [ { text: 'Tüm Gömlek ►', link: '#' } ] 
        },
        {
          title: 'Set Ürünler', 
          links: [
            { text: 'İkili Set', link: '#' },
            { text: 'Hastane Çıkışı', link: '#' },
            { text: 'Tüm Set Ürünler ►', link: '#' }
          ]
        },
        
        // Sütun 4
        { 
          title: 'Pantolon & Şort', 
          links: [ { text: 'Tüm Pantolon & Şort ►', link: '#' } ] 
        },
        {
          title: 'Aksesuar', 
          links: [
            { text: 'Şapka', link: '#' },
            { text: 'Müslin Bezi', link: '#' },
            { text: 'Tüm Aksesuar ►', link: '#' }
          ]
        },
        { 
          title: 'Mayo', 
          links: [ { text: 'Tüm Mayo ►', link: '#' } ] 
        }
      ],
      promos: [ 
        { img: 'https://picsum.photos/200/100?image=502', title: 'Erkek Bebek Yeni Sezon', link: '#' }
      ]
    },


'Kız Çocuk': {
      columns: [
        // Sütun 1
        { 
          title: 'Dış Giyim', 
          links: [ { text: 'Tüm Dış Giyim ►', link: '#' } ] 
        },
        {
          title: 'Kazak & Hırka', 
          links: [
            { text: 'Kazak', link: '#' },
            { text: 'Hırka', link: '#' },
            { text: 'Ceket', link: '#' }, // Liste buradaydı, buraya ekledim
            { text: 'Tüm Kazak & Hırka ►', link: '#' }
          ]
        },
        { 
          title: 'T-shirt & Sweatshirt', 
          links: [ { text: 'Tüm T-shirt & Sweatshirt ►', link: '#' } ] 
        },

        // Sütun 2
        {
          title: 'Gömlek & Bluz', 
          links: [
            { text: 'Bluz', link: '#' },
            { text: 'Tüm Gömlek & Bluz ►', link: '#' }
          ]
        },
        {
          title: 'Pantolon & Şort', 
          links: [
            { text: 'Şort', link: '#' },
            { text: 'Tüm Pantolon & Şort ►', link: '#' }
          ]
        },
        {
          title: 'Eşofman & Tayt', 
          links: [
            { text: 'Tayt', link: '#' },
            { text: 'Tüm Eşofman & Tayt ►', link: '#' }
          ]
        },

        // Sütun 3
        { 
          title: 'Elbise', 
          links: [ { text: 'Tüm Elbise ►', link: '#' } ] 
        },
        { 
          title: 'Etek', 
          links: [ { text: 'Tüm Etek ►', link: '#' } ] 
        },
        { 
          title: 'Pijama', 
          links: [ { text: 'Tüm Pijama ►', link: '#' } ] 
        },
        {
          title: 'Tulum & Body', 
          links: [
            { text: 'Tulum', link: '#' },
            { text: 'Tüm Tulum & Body ►', link: '#' }
          ]
        },
        
        // Sütun 4
        {
          title: 'Aksesuar', 
          links: [
            { text: 'Şapka', link: '#' },
            { text: 'Güneş Gözlüğü', link: '#' },
            { text: 'Tüm Aksesuar ►', link: '#' }
          ]
        }
      ],
      promos: [ 
        { img: 'https://picsum.photos/200/100?image=503', title: 'Kız Çocuk Yeni Sezon', link: '#' }
      ]
    },


    
'Erkek Çocuk': {
      columns: [
        // Sütun 1
        { 
          title: 'Dış Giyim', 
          links: [ { text: 'Tüm Dış Giyim ►', link: '#' } ] 
        },
        {
          title: 'Kazak & Hırka', 
          links: [
            { text: 'Hırka', link: '#' },
            { text: 'Tüm Kazak & Hırka ►', link: '#' }
          ]
        },
        {
          title: 'T-shirt & Sweatshirt', 
          links: [
            { text: 'T-Shirt', link: '#' },
            { text: 'Sweatshirt', link: '#' },
            { text: 'Tüm T-shirt & Sweatshirt ►', link: '#' }
          ]
        },

        // Sütun 2
        { 
          title: 'Gömlek', 
          links: [ { text: 'Tüm Gömlek ►', link: '#' } ] 
        },
        { 
          title: 'Pantolon & Şort', 
          links: [ { text: 'Tüm Pantolon & Şort ►', link: '#' } ] 
        },
        { 
          title: 'Eşofman', 
          links: [ { text: 'Tüm Eşofman ►', link: '#' } ] 
        },
        
        // Sütun 3
        {
          title: 'Aksesuar', 
          links: [
            { text: 'Giyim Aksesuar', link: '#' },
            { text: 'Şapka', link: '#' },
            { text: 'Güneş Gözlüğü', link: '#' },
            { text: 'Boyunluk', link: '#' },
            { text: 'Tüm Aksesuar ►', link: '#' }
          ]
        },
        { 
          title: 'Pijama', 
          links: [ { text: 'Tüm Pijama ►', link: '#' } ] 
        },

        // Sütun 4
        { 
          title: 'Takım Elbise', 
          links: [ { text: 'Tüm Takım Elbise ►', link: '#' } ] 
        },
        { 
          title: 'Eşofman Takımı', 
          links: [ { text: 'Tüm Eşofman Takımı ►', link: '#' } ] 
        },
        {
          title: 'Plaj Grubu', 
          links: [
            { text: 'Deniz Şortu', link: '#' },
            { text: 'Mayo', link: '#' }, // // HATA BURADA DÜZELTİLDİ (text:t: yerine text:)
            { text: 'Plaj Havlu', link: '#' },
            { text: 'Tüm Plaj Grubu ►', link: '#' }
          ]
        }
      ],
      promos: [ 
        { img: 'https://picsum.photos/200/100?image=504', title: 'Erkek Çocuk Yeni Sezon', link: '#' }
      ]
    }, // <-- Bu virgül, 'Ayakkabı & Çanta'dan önce geldiği için kalmalı.

    
'Ayakkabı & Çanta': {
      // // 9 linki 2 sütuna böldük (5+4)
      columns: [
        // Sütun 1
        { 
          title: '', // Başlık yok
          links: [
            { text: 'Bot', link: '#' },
            { text: 'Sneaker', link: '#' },
            { text: 'Sandalet & Terlik', link: '#' },
            { text: 'Günlük Ayakkabı', link: '#' },
            { text: 'Bebek Çantası', link: '#' },
          ] 
        },
        // Sütun 2
        { 
          title: '', // Başlık yok
          links: [
            { text: 'Babet & Patik', link: '#' },
            { text: 'Beslenme Çantası', link: '#' },
            { text: 'Sırt Çantası', link: '#' },
            { text: 'Bel Çantası', link: '#' },
          ] 
        }
      ],
      promos: [ // Promosyonları koruyoruz
         { img: 'https://picsum.photos/200/100?image=505', title: 'Çocuk Ayakkabıları', link: '#' }
      ]
    },

'Öne Çıkan Markalar': {
      // // 9 markayı 2 sütuna böldük (5+4)
      columns: [
        // Sütun 1
        { 
          title: '', // Başlık yok
          links: [
            { text: 'Moncler', link: '#' },
            { text: 'Polo Ralph Lauren', link: '#' },
            { text: 'Dolce&Gabbana', link: '#' },
            { text: 'Golden Goose', link: '#' },
            { text: 'Fendi', link: '#' },
          ] 
        },
        // Sütun 2
        { 
          title: '', // Başlık yok
          links: [
            { text: 'Gucci', link: '#' },
            { text: 'Off-White', link: '#' },
            { text: 'Stella McCartney', link: '#' },
            { text: 'Skechers', link: '#' },
          ] 
        }
      ],
      promos: [ // Promosyon ekleyelim
         { img: 'https://picsum.photos/200/100?image=506', title: 'Çocuk Markaları', link: '#' }
      ]
    },    
  },


'Anne & Bebek & Oyuncak': {
    // // Yeni sol menü sıralamana göre güncellendi


'Bebek Arabası & Oto Koltuğu': {
      columns: [
        // Sütun 1: Bebek Arabası & Puset
        { 
          title: 'Bebek Arabası & Puset', 
          links: [ 
            { text: 'Travel Sistem Bebek Arabası', link: '#' },
            { text: 'Bebek Arabası', link: '#' },
            { text: 'Kabin Boy Bebek Arabası', link: '#' },
            { text: 'Ana Kucağı', link: '#' },
            { text: 'Baston Puset', link: '#' },
            { text: 'Bebek Arabası Aksesuar', link: '#' },
            { text: 'İkiz Bebek Arabası', link: '#' },
            { text: 'Tüm Bebek Arabası & Puset ►', link: '#' }
          ] 
        },
        // Sütun 2: Bebek Oto Koltuğu
        { 
          title: 'Bebek Oto Koltuğu', 
          links: [ 
            { text: 'Bebek Oto Koltuğu Aksesua', link: '#' }, // Listenden aldım
            { text: 'Tüm Oto Koltukları ►', link: '#' } // Ekstra "Tüm" linki
          ] 
        }
      ],
      promos: [ // Promosyonları koruyoruz
        { img: 'https://picsum.photos/200/100?image=601', title: 'Bebek Arabaları', link: '#' }
      ]
    },


'Oyuncak': {
      columns: [
        // // === 1. GRUP: ALT KATEGORİLERİ OLANLAR ===
        { 
          title: 'Oyuncak Araçlar', 
          links: [ 
            { text: 'Kumandalı Oyuncaklar', link: '#' },
            { text: 'Oyuncak Arabalar', link: '#' },
            { text: 'Oyuncak Helikopter ve Uçaklar', link: '#' },
            { text: 'Oyuncak Kamyon ve İş Makineler', link: '#' },
            { text: 'Oyuncak Otobüs ve Minibüsler', link: '#' },
            { text: 'Oyuncak Tren ve Demiryolu', link: '#' },
            { text: 'Tüm Oyuncak Araçlar ►', link: '#' }
          ] 
        },
        { 
          title: 'Oyuncak Bebek', 
          links: [ 
            { text: 'Bez Bebek', link: '#' },
            { text: 'Et Bebek', link: '#' },
            { text: 'Model Bebek', link: '#' },
            { text: 'Tüm Oyuncak Bebek ►', link: '#' }
          ] 
        },
        { 
          title: 'Akülü & Pedallı Araçlar', 
          links: [ 
            { text: 'Çocuk Scooter', link: '#' },
            { text: 'Çocuk Bisikleti', link: '#' },
            { text: 'Akülü Araçlar', link: '#' },
            { text: 'Pedallı Araçlar', link: '#' },
            { text: 'Scooter Kask ve Aksesuarları', link: '#' },
            { text: 'Yürüteç', link: '#' },
            { text: 'Tüm Akülü & Pedallı Araçlar ►', link: '#' }
          ] 
        },
        { 
          title: 'Bahçe & Dış Mekan Oyuncakları', 
          links: [ 
            { text: 'Plaj Oyuncakları', link: '#' },
            { text: 'Top Havuzu ve Toplar', link: '#' },
            { text: 'Kaydırak', link: '#' },
            { text: 'Oyun Çadırı', link: '#' },
            { text: 'Oyun Parkları', link: '#' },
            { text: 'Spor Oyuncakları', link: '#' },
            { text: 'Tüm Bahçe & Dış Mekan... ►', link: '#' }
          ] 
        },
        { 
          title: 'Figür Oyuncaklar', 
          links: [ 
            { text: 'Hayvan Figür Oyuncaklar', link: '#' },
            { text: 'Karakter Figür Oyuncaklar', link: '#' },
            { text: 'Sürpriz Oyuncaklar Figürleri', link: '#' },
            { text: 'Tüm Figür Oyuncaklar ►', link: '#' }
          ] 
        },
        { 
          title: 'Bebek & Okul Öncesi Oyuncakları', 
          links: [ 
            { text: 'Ahşap Oyuncaklar', link: '#' },
            { text: 'Eğitici Oyuncaklar', link: '#' },
            { text: 'Yazı Tahtası', link: '#' },
            { text: 'Banyo Oyuncakları', link: '#' },
            { text: 'Bebek & Aktivite Oyuncakları', link: '#' },
            { text: 'Dişlik ve Çıngıraklar', link: '#' },
            { text: 'Dönence ve Projektör', link: '#' },
            { text: 'Oyun Halısı', link: '#' },
            { text: 'Puset & Mama Sandalyesi Oyuncağı', link: '#' },
            { text: 'Sallanan Oyuncaklar', link: '#' },
            { text: 'Uyku Arkadaşları', link: '#' },
            { text: 'Tüm Bebek & Okul Öncesi... ►', link: '#' }
          ] 
        },
        { 
          title: 'Oyun Setleri', 
          links: [ 
            { text: 'Evcilik ve Mutfak Setleri', link: '#' },
            { text: 'Meslek Setleri', link: '#' },
            { text: 'Müzik Oyuncakları', link: '#' },
            { text: 'Oyuncak Bilim Setleri', link: '#' },
            { text: 'Tüm Oyun Setleri ►', link: '#' }
          ] 
        },
        { 
          title: 'Cinsiyete Göre', 
          links: [ 
            { text: 'Erkek Çocuk', link: '#' },
            { text: 'Kız Çocuk', link: '#' },
            { text: 'Unisex', link: '#' }
          ] 
        },

        // // === 2. GRUP: TEKİL LİNKLER ("BOŞ" OLANLAR) ===
        // // Bu başlıklar artık en sonda ve bir arada
        { 
          title: 'Çocuk Puzzle & Yapboz', 
          links: [ { text: 'Tüm Puzzle ►', link: '#' } ]
        },
        { 
          title: 'Peluş Oyuncaklar', 
          links: [ { text: 'Tüm Peluş Oyuncaklar ►', link: '#' } ]
        },
        { 
          title: 'Lego & Yapı Oyuncakları', 
          links: [ { text: 'Tüm Lego & Yapı... ►', link: '#' } ]
        }
      ],
      promos: [ // // Promosyonlar aynı kalır
        { img: 'https://picsum.photos/200/100?image=602', title: 'Popüler Oyuncaklar', link: '#' }
      ]
    },

'Anne ve Bebek Bakım': {
      columns: [
        // Sütun 1: Bebek Beslenme ve Emzirme
        { 
          title: 'Bebek Beslenme ve Emzirme', 
          links: [ 
            { text: 'Alıştırma Bardakları', link: '#' },
            { text: 'Emzik', link: '#' },
            { text: 'Biberon', link: '#' },
            { text: 'Mama Sandalyesi', link: '#' },
            { text: 'Mama Önlüğü', link: '#' },
            { text: 'Bebek & Çocuk Sofra & Mutfak', link: '#' },
            { text: 'Beslenme Aksesuarları', link: '#' },
            { text: 'Biberon Emzik Temizleyici', link: '#' },
            { text: 'Biberon Isıtıcı & Sterilizatör', link: '#' },
            { text: 'Emzirme & Saklama Aksesuarları', link: '#' },
            { text: 'Emzirme Örtüsü', link: '#' },
            { text: 'Tüm Bebek Beslenme... ►', link: '#' }
          ] 
        },
        // Sütun 2: Bebek Bakım ve Kozmetik
        { 
          title: 'Bebek Bakım ve Kozmetik', 
          links: [ 
            { text: 'Bebek Bakım Çantası', link: '#' },
            { text: 'Bebek Bakım Örtüsü', link: '#' },
            { text: 'Bebek Diş Fırçası', link: '#' },
            { text: 'Bebek Diş Macunu', link: '#' },
            { text: 'Bebek Fırça ve Tarağı', link: '#' },
            { text: 'Bebek Güneş Ürünü', link: '#' },
            { text: 'Bebek Kremi ve Yağı', link: '#' },
            { text: 'Bebek Sağlık Ürünleri', link: '#' },
            { text: 'Bebek Şampuanı', link: '#' },
            { text: 'Damla, Serum, Sprey', link: '#' },
            { text: 'Tüm Bebek Bakım... ►', link: '#' }
          ] 
        },
        // Sütun 3: Anne Bakım
        { 
          title: 'Anne Bakım', 
          links: [ 
            { text: 'Çatlak Kremi', link: '#' },
            { text: 'Göğüs Pedi ve Koruyucu', link: '#' },
            { text: 'Göğüs Pompası', link: '#' },
            { text: 'Tüm Anne Bakım ►', link: '#' }
          ] 
        },
        // Sütun 4: Bebek & Çocuk Banyo
        { 
          title: 'Bebek & Çocuk Banyo', 
          links: [ 
            { text: 'Banyo Tekstili', link: '#' },
            { text: 'Bebek Banyo Aksesuarları', link: '#' },
            { text: 'Bebek Bornoz', link: '#' },
            { text: 'Bebek Havlu', link: '#' },
            { text: 'Bebek Küveti', link: '#' },
            { text: 'Klozet Adaptörü & Lazımlık', link: '#' },
            { text: 'Tüm Bebek & Çocuk Banyo ►', link: '#' }
          ] 
        }
      ],
      promos: [ // Promosyon ekleyelim
        { img: 'https://picsum.photos/200/100?image=603', title: 'Anne & Bebek İhtiyaçları', link: '#' }
      ]
    },


'Bebek & Çocuk Odası': {
      columns: [
        // Sütun 1: Ev Tekstili
        { 
          title: 'Bebek & Çocuk Ev Tekstili', 
          links: [ 
            { text: 'Çocuk Halısı', link: '#' },
            { text: 'Bebek & Çocuk Battaniyesi', link: '#' },
            { text: 'Bebek & Çocuk Yastık ve Kılıfı', link: '#' },
            { text: 'Bebek & Çocuk Yorgan', link: '#' },
            { text: 'Tüm Bebek & Çocuk Ev Tekstili ►', link: '#' }
          ] 
        },
        // Sütun 2: Ev Dekorasyon
        { 
          title: 'Bebek & Çocuk Ev Dekorasyon', 
          links: [ 
            { text: 'Çocuk Minderi', link: '#' },
            { text: 'Çocuk Diğer Dekoratif Aksesuarlar', link: '#' },
            { text: 'Çocuk Odası Cibinlik', link: '#' },
            { text: 'Çocuk Odası Duvar Kağıdı', link: '#' },
            { text: 'Çocuk Odası Duvar Sticker', link: '#' },
            { text: 'Çocuk Odası Kırlent ve Kılıfı', link: '#' },
            { text: 'Çocuk Odası Tablo', link: '#' },
            { text: 'Tüm Bebek & Çocuk Ev... ►', link: '#' }
          ] 
        },
        // Sütun 3: Aydınlatma
        { 
          title: 'Bebek & Çocuk Aydınlatma', 
          links: [ 
            { text: 'Çocuk Odası Aplik', link: '#' },
            { text: 'Çocuk Odası Aydınlatma', link: '#' },
            { text: 'Çocuk Odası Masa Lambası', link: '#' },
            { text: 'Tüm Bebek & Çocuk Aydınlatma ►', link: '#' }
          ] 
        },
        // Sütun 4: Bebek Odası Mobilyası
        { 
          title: 'Bebek Odası Mobilyası', 
          links: [ 
            { text: 'Beşik', link: '#' },
            { text: 'Park Yatak & Oyun Parkı', link: '#' },
            { text: 'Bebek Yatak', link: '#' },
            { text: 'Çocuk Dolap', link: '#' },
            { text: 'Çocuk Kitaplık', link: '#' },
            { text: 'Tüm Bebek Odası Mobilyası ►', link: '#' }
          ] 
        },
         // Sütun 5: Çocuk & Genç Odası Mobilyası
        { 
          title: 'Çocuk & Genç Odası Mobilyası', 
          links: [ 
            { text: 'Aktivite Masası & Merkezi', link: '#' },
            { text: 'Montesorri Çocuk Odası', link: '#' },
            { text: 'Çocuk Çalışma Sandalyesi', link: '#' },
            { text: 'Çocuk Komodin & Şifonyer', link: '#' },
            { text: 'Çocuk Çalışma Odası', link: '#' },
            { text: 'Oyuncak Dolabı', link: '#' },
            { text: 'Ranza', link: '#' }
          ] 
        }
      ],
      promos: [ // Promosyon ekleyelim
        { img: 'https://picsum.photos/200/100?image=604', title: 'Çocuk Odası Fikirleri', link: '#' }
      ]
    },

    'Portbebe & Kanguru': {
      columns: [ 
        { title: '', links: [ {text: 'Portbebe', link:'#'}, {text: 'Kanguru', link:'#'} ] }
      ],
      promos: []
    },
    'Güvenlik': {
      columns: [ 
        { title: '', links: [ {text: 'Kamera & Telsiz', link:'#'}, {text: 'Güvenlik Bariyerleri', link:'#'} ] }
      ],
      promos: []
    },


'Çocuk Kitap & Kırtasiye': {
      columns: [
        // Sütun 1: Kitap
        { 
          title: 'Kitap', 
          links: [ 
            { text: 'Çocuk ve Ebeveyn Kitapları', link: '#' },
            { text: 'Yabancı Dil Kitapları', link: '#' },
            { text: 'Aile & Çocuk Bakımı', link: '#' },
            { text: 'Çocuk & Gençlik Kitapları', link: '#' }
          ] 
        },
        // Sütun 2: Kırtasiye
        { 
          title: 'Kırtasiye', 
          links: [ 
            { text: 'Kalem Kutusu', link: '#' },
            { text: 'Etiketler', link: '#' },
            { text: 'Boyama Seti', link: '#' },
            { text: 'Kırtasiye Seti', link: '#' },
            { text: 'Boya Malzemeleri', link: '#' },
            { text: 'Bayrak', link: '#' },
            { text: 'Cetvel', link: '#' },
            { text: 'Pano', link: '#' },
            { text: 'Silgiler', link: '#' },
            { text: 'Yapıştırıcılar', link: '#' },
            { text: 'Tüm Kırtasiye ►', link: '#' }
          ] 
        }
      ],
      promos: [ // Promosyon ekleyelim
        { img: 'https://picsum.photos/200/100?image=605', title: 'Okul Alışverişi', link: '#' }
      ]
    },


'Öne Çıkan Markalar': {
      // // 11 markayı 2 sütuna böldük (6+5)
      columns: [
        // Sütun 1
        { 
          title: '', // Başlık yok
          links: [
            { text: 'Cybex', link: '#' },
            { text: 'Babybjörn', link: '#' },
            { text: 'Maxi-Cosi', link: '#' },
            { text: 'Scoot And Ride', link: '#' },
            { text: 'Mercedes-Benz', link: '#' },
            { text: 'Peg Perego', link: '#' },
          ] 
        },
        // Sütun 2
        { 
          title: '', // Başlık yok
          links: [
            { text: 'Anex', link: '#' },
            { text: 'Mamas papas', link: '#' },
            { text: 'Smoby', link: '#' },
            { text: 'Globber', link: '#' },
            { text: 'Doona', link: '#' },
          ] 
        }
      ],
      promos: [] // Promosyon yok
    },    // // Eski 'Bebek Giyim' kategorisi yeni listende yok, 
    // // 'Kız Bebek' ve 'Erkek Bebek' içinde olduğu için kaldırıldı.
  },


'Teknoloji': {
    // // Yeni sol menü sıralamana göre güncellendi


'Küçük Ev Aletleri': {
      columns: [
        // Sütun 1: Süpürge
        { 
          title: 'Süpürge', 
          links: [ 
            { text: 'Robot Süpürge', link: '#' },
            { text: 'Dik Süpürge', link: '#' },
            { text: 'Süpürge Aksesuarları', link: '#' },
            { text: 'Toz Torbalı Süpürge', link: '#' },
            { text: 'Toz Torbasız Süpürge', link: '#' },
            { text: 'Tüm Süpürge ►', link: '#' }
          ] 
        },
        // Sütun 2: Kahve Makinesi
        { 
          title: 'Kahve Makinesi', 
          links: [ 
            { text: 'Espresso & Cappuccino Makinesi', link: '#' },
            { text: 'Filtre Kahve Makinesi', link: '#' },
            { text: 'Türk Kahvesi Makinesi', link: '#' },
            { text: 'Kahve Öğütücü', link: '#' },
            { text: 'Elektronik Kahve Öğütücü', link: '#' },
            { text: 'Tüm Kahve Makinesi ►', link: '#' }
          ] 
        },
        // Sütun 3: Ütü ve Diğerleri
        { 
          title: 'Ütü', 
          links: [ 
            { text: 'Buhar Kazanlı Ütü', link: '#' },
            { text: 'Buharlı Dikey Ütü', link: '#' },
            { text: 'Buharlı Ütü', link: '#' },
            { text: 'Tüm Ütü ►', link: '#' }
          ] 
        },
        { 
          title: 'Mikser & Mikser Seti', 
          links: [ { text: 'Tüm Mikser Setleri ►', link: '#' } ]
        },
        { 
          title: 'Blender & Blender Seti', 
          links: [ { text: 'Tüm Blender Setleri ►', link: '#' } ]
        },
        { 
          title: 'Tost Makinesi', 
          links: [ { text: 'Tüm Tost Makineleri ►', link: '#' } ]
        },

        // Sütun 4: Kalanlar
        { 
          title: 'Buharlı Temizleyici', 
          links: [ { text: 'Tüm Temizleyiciler ►', link: '#' } ]
        },
        { 
          title: 'Akıllı Aydınlatma', 
          links: [ { text: 'Tüm Aydınlatma ►', link: '#' } ]
        },
        { 
          title: 'Meyve & Sebze Sıkacağı', 
          links: [ { text: 'Tüm Sıkacaklar ►', link: '#' } ]
        },
        { 
          title: 'Su Isıtıcı & Kettle', 
          links: [ { text: 'Tüm Su Isıtıcıları ►', link: '#' } ]
        },
        { 
          title: 'Doğrayıcı & Rondo', 
          links: [ { text: 'Tüm Rondolar ►', link: '#' } ]
        }
      ],
      promos: [ 
        { img: 'https://picsum.photos/200/100?image=701', title: 'Mutfak Aletleri', link: '#' }
      ]
    },


'Telefon': {
      columns: [
        // Sütun 1: Cep Telefonu
        { 
          title: 'Cep Telefonu', 
          links: [ 
            { text: 'iPhone iOS Cep Telefonları', link: '#' },
            { text: 'Android Cep Telefonları', link: '#' },
            { text: 'Tüm Cep Telefonları ►', link: '#' }
          ] 
        },
        // Sütun 2: Telefon Aksesuarları
        { 
          title: 'Telefon Aksesuarları', 
          links: [ 
            { text: 'Kapak & Kılıf', link: '#' },
            { text: 'Araç Telefon Tutucu', link: '#' },
            { text: 'Güç Ürünleri', link: '#' },
            { text: 'Ekran Koruyucular', link: '#' },
            { text: 'Airpods Kılıf', link: '#' },
            { text: 'Tüm Telefon Aksesuarları ►', link: '#' }
          ] 
        },
        // Sütun 3: Kulaklıklar (Tekil)
        { 
          title: 'Kulaklıklar', 
          links: [ 
             { text: 'Tüm Kulaklıklar ►', link: '#' }
          ] 
        }
      ],
      promos: [ // Promosyon ekleyelim
        { img: 'https://picsum.photos/200/100?image=703', title: 'Telefon Aksesuarları', link: '#' }
      ]
    },


'Kişisel Bakım Aletleri': {
      columns: [
        // Sütun 1: Başlıksız (Ana Kategoriler 1)
        { 
          title: '', // Başlık yok
          links: [ 
            { text: 'Saç Kurutma Makinesi', link: '#' },
            { text: 'Saç Düzleştirici', link: '#' },
            { text: 'Saç Maşası', link: '#' },
            { text: 'Tıraş Makinesi', link: '#' },
          ] 
        },
        // Sütun 2: Başlıksız (Ana Kategoriler 2)
        { 
          title: '', // Başlık yok
          links: [ 
            { text: 'Epilatör', link: '#' },
            { text: 'IPL Lazer Epilasyon Aleti', link: '#' },
            { text: 'Kişisel Bakım Yedek Parça', link: '#' }
          ] 
        },
        // Sütun 3: Başlıklı (Sağlık)
        { 
          title: 'Sağlık', 
          links: [ 
            { text: 'Genel Sağlık', link: '#' },
            { text: 'Masaj Aletleri', link: '#' },
            { text: 'Masaj Tabancası', link: '#' },
            { text: 'Masaj Topu', link: '#' },
            { text: 'Masaj Yağı', link: '#' }
          ] 
        }
      ],
      promos: [ // Promosyonları koruyoruz
        { img: 'https://picsum.photos/200/100?image=702', title: 'Dyson Keşfet', link: '#' }
      ]
    },


'TV, Görüntü & Ses Sistemleri': {
      columns: [
        // Sütun 1: Başlıksız (Tekil Linkler)
        { 
          title: '', // Başlık yok
          links: [ 
            { text: 'Televizyon', link: '#' },
            { text: 'Ev Sinema Hoparlörü', link: '#' },
            { text: 'Projeksiyon Cihazı', link: '#' }
          ] 
        },
        // Sütun 2: Başlıklı (Aksesuarlar)
        { 
          title: 'TV & Ses & Konsol Aksesuarları', 
          links: [ 
            { text: 'Ses Sistemleri', link: '#' },
            { text: 'Hoparlörler', link: '#' },
            { text: 'Görüntü ve Ses Kabloları', link: '#' },
            { text: 'TV Aksesuarları', link: '#' },
            { text: 'Tüm TV & Ses & Konsol Aks... ►', link: '#' }
          ] 
        },
        // Sütun 3: Başlıklı (Ev Sinema Sistemi)
        { 
          title: 'Ev Sinema Sistemi', 
          links: [ 
            { text: 'Ev Tipi Subwoofer', link: '#' },
            { text: 'Media Player', link: '#' },
            { text: 'Receiver Amfi', link: '#' },
            { text: 'Sinema Sistemi', link: '#' },
            { text: 'Soundbar', link: '#' },
            { text: 'Stereo Amfier', link: '#' },
            { text: 'Tüm Ev Sinema Sistemi ►', link: '#' }
          ] 
        }
      ],
      promos: [ // Promosyon ekleyelim
        { img: 'https://picsum.photos/200/100?image=704', title: 'Yeni Nesil TV\'ler', link: '#' }
      ]
    },

'Beyaz Eşya': {
      columns: [
        // Sütun 1: Başlıksız (Ana Cihazlar 1)
        { 
          title: '', // Başlık yok
          links: [ 
            { text: 'Buzdolabı', link: '#' },
            { text: 'Çamaşır Makinesi', link: '#' },
            { text: 'Bulaşık Makinesi', link: '#' },
            { text: 'Fırın', link: '#' },
            { text: 'Kurutma Makinesi', link: '#' },
          ] 
        },
        // Sütun 2: Başlıksız (Ana Cihazlar 2)
        { 
          title: '', // Başlık yok
          links: [ 
            { text: 'Hava Nemlendirici', link: '#' },
            { text: 'Hava Temizleyici', link: '#' },
            { text: 'Şarap Dolabı', link: '#' },
            { text: 'Davlumbazlar', link: '#' },
            { text: 'Derin Dondurucu', link: '#' },
          ] 
        },
        // Sütun 3: Başlıklı (İklimlendirme)
        { 
          title: 'Klima & Isıtıcı', 
          links: [ 
            { text: 'Klima', link: '#' },
            { text: 'Isıtıcı', link: '#' },
            { text: 'Portatif Soğutucu', link: '#' },
            { text: 'Vantilatör', link: '#' },
            { text: 'Tüm Klima & Isıtıcı ►', link: '#' }
          ] 
        }
      ],
      promos: [ // Promosyon ekleyelim
        { img: 'https://picsum.photos/200/100?image=705', title: 'Beyaz Eşya Setleri', link: '#' }
      ]
    },

'Bilgisayar & Tablet': {
      columns: [
        // Sütun 1: Başlıksız (Ana Cihazlar)
        { 
          title: '', // Başlık yok
          links: [ 
            { text: 'Laptop', link: '#' },
            { text: 'Masaüstü Bilgisayar', link: '#' },
            { text: 'Tablet', link: '#' },
            { text: 'Monitör', link: '#' },
            { text: 'Monitör PC - All in One', link: '#' },
            { text: 'Kablo & Adaptör', link: '#' },
            { text: 'Monitör Aksesuarları', link: '#' }
          ] 
        },
        // Sütun 2: Oyuncu Bilgisayarları
        { 
          title: 'Oyuncu Bilgisayarları', 
          links: [ 
            { text: 'Oyuncu Laptopları', link: '#' },
            { text: 'Oyuncu Monitör', link: '#' },
            { text: 'Tüm Oyuncu Bilgisayarları ►', link: '#' }
          ] 
        },
        // Sütun 3: Aksesuarlar
        { 
          title: 'Bilgisayar & Tablet Aksesuarları', 
          links: [ 
            { text: 'Ağ - Modem', link: '#' },
            { text: 'Akıllı Ev Sistemleri', link: '#' },
            { text: 'Çanta & Kılıflar', link: '#' },
            { text: 'Çevre Birimleri', link: '#' },
            { text: 'Kablo & Sarf Malzemeler', link: '#' },
            { text: 'Oyuncu Ekipmanları', link: '#' },
            { text: 'Veri Depolama', link: '#' },
            { text: 'Tüm Bilgisayar... Aksesuarları ►', link: '#' }
          ] 
        },
        // Sütun 4: Bileşenler
        { 
          title: 'Bilgisayar Bileşenleri', 
          links: [ 
            { text: 'Anakart', link: '#' },
            { text: 'Bilgisayar Kasası', link: '#' },
            { text: 'Ekran Kartı', link: '#' },
            { text: 'RAM', link: '#' },
            { text: 'Tüm Bilgisayar Bileşenleri ►', link: '#' }
          ] 
        }
      ],
      promos: [ // Promosyon ekleyelim
        { img: 'https://picsum.photos/200/100?image=706', title: 'Oyuncu Ekipmanları', link: '#' }
      ]
    },

'Oyun Konsolları': {
      columns: [
        // Sütun 1: Başlıksız
        { 
          title: '', // Başlık yok
          links: [ 
            { text: 'Playstation Konsol', link: '#' },
            { text: 'Xbox Konsolları', link: '#' },
            { text: 'Playstation Oyunları', link: '#' },
            { text: 'Diğer Oyun Konsolları', link: '#' }
          ] 
        }
      ],
      promos: [ // Promosyon ekleyelim
        { img: 'https://picsum.photos/200/100?image=707', title: 'En Popüler Oyunlar', link: '#' }
      ]
    },

'Fotoğraf Makinesi & Kamera': {
      columns: [
        // Sütun 1: Başlıksız (Ana Cihazlar)
        { 
          title: '', // Başlık yok
          links: [ 
            { text: 'Şipşak Fotoğraf Makinesi', link: '#' },
            { text: 'Dijital Fotoğraf Makinesi', link: '#' },
            { text: 'Video Kamera', link: '#' },
            { text: 'Aksiyon Kamerası', link: '#' },
            { text: 'Aynasız Kompakt SLR Makinesi', link: '#' },
            { text: 'Sualtı Fotoğraf Makinesi', link: '#' },
            { text: 'Drone', link: '#' }
          ] 
        },
        // Sütun 2: Başlıklı (Aksesuarlar)
        { 
          title: 'Foto & Kamera Aksesuarları', 
          links: [ 
            { text: 'Drone Aksesuarları', link: '#' },
            { text: 'Tüm Aksesuarlar ►', link: '#' } // // Bir "Tüm" linki ekledim
          ] 
        }
      ],
      promos: [ // Promosyon ekleyelim
        { img: 'https://picsum.photos/200/100?image=708', title: 'Aksiyon Kameraları', link: '#' }
      ]
    },


'Giyilebilir Teknoloji': {
      columns: [
        // Sütun 1: Başlıksız
        { 
          title: '', // Başlık yok
          links: [ 
            { text: 'Akıllı Saat', link: '#' },
            { text: 'Akıllı Bileklik', link: '#' },
            { text: 'Sanal Gerçeklik Gözlüğü - VR', link: '#' },
            { text: 'Akıllı Çocuk Saati', link: '#' },
            { text: 'Akıllı Saat Kordon', link: '#' },
            { text: 'Akıllı Saat Aksesuarları', link: '#' }
          ] 
        }
      ],
      promos: [ // Promosyon ekleyelim
        { img: 'https://picsum.photos/200/100?image=709', title: 'Akıllı Saatler', link: '#' }
      ]
    },
    
    

    'Yazıcı & Tarayıcı': {
      columns: [ 
        { title: '', links: [ {text: 'Lazer Yazıcı', link:'#'}, {text: 'Tarayıcı', link:'#'} ] }
      ],
      promos: []
    },

    
'Öne Çıkan Markalar': {
      // // 11 markayı 2 sütuna böldük (6+5)
      columns: [
        // Sütun 1
        { 
          title: '', // Başlık yok
          links: [
            { text: 'Sony', link: '#' },
            { text: 'Dyson', link: '#' },
            { text: 'Apple', link: '#' },
            { text: 'Philips', link: '#' },
            { text: 'Smeg', link: '#' },
            { text: 'Braun', link: '#' },
          ] 
        },
        // Sütun 2
        { 
          title: '', // Başlık yok
          links: [
            { text: 'Kitchenaid', link: '#' },
            { text: 'Sage', link: '#' },
            { text: 'Fujifilm', link: '#' },
            { text: 'Lenovo', link: '#' },
            { text: 'Garmin', link: '#' },
          ] 
        }
      ],
      promos: [] // Promosyon yok
    },
  },



'Spor & Outdoor': {
    // // Yeni sol menü sıralamana göre güncellendi


'Kamp & Outdoor': {
      // // 11 linki 2 sütuna böldük (6+5)
      columns: [
        // Sütun 1
        { 
          title: '', // Başlık yok
          links: [ 
            { text: 'Çadır', link: '#' },
            { text: 'Çadır Uyku Tulumu', link: '#' },
            { text: 'Termos', link: '#' },
            { text: 'Çakı & Bıçak', link: '#' },
            { text: 'Dürbün', link: '#' },
            { text: 'Kamp Sandalyesi', link: '#' },
          ] 
        },
        // Sütun 2
        { 
          title: '', // Başlık yok
          links: [ 
            { text: 'Kamp Masa & Sandalye Seti', link: '#' },
            { text: 'Outdoor Çanta & Aksesuar', link: '#' },
            { text: 'Kamp Mutfağı', link: '#' },
            { text: 'Outdoor Ayakkabı', link: '#' },
            { text: 'Outdoor Giyim', link: '#' },
          ] 
        }
      ],
      promos: [ // Promosyonları koruyoruz
        { img: 'https://picsum.photos/200/100?image=801', title: 'Outdoor Ekipmanları', link: '#' }
      ]
    },

'Fitness & Kondisyon': {
      // // 11 linki 2 sütuna böldük (6+5)
      columns: [
        // Sütun 1
        { 
          title: '', // Başlık yok
          links: [ 
            { text: 'Koşu Bantları', link: '#' },
            { text: 'Kondisyon Bisikletleri', link: '#' },
            { text: 'Ağırlık Eldiveni', link: '#' },
            { text: 'Ağırlık Kemeri', link: '#' },
            { text: 'Ağırlık Sehpaları', link: '#' },
            { text: 'Çalışma İstasyonları', link: '#' },
          ] 
        },
        // Sütun 2
        { 
          title: '', // Başlık yok
          links: [ 
            { text: 'Dambıllar ve Ağırlık Plakaları', link: '#' },
            { text: 'Egzersiz Aletleri', link: '#' },
            { text: 'Egzersiz Bandı', link: '#' },
            { text: 'El ve Ayak Ağırlıkları', link: '#' },
            { text: 'Kondisyon Küre', link: '#' },
          ] 
        }
      ],
      promos: [ // Promosyon ekleyelim
        { img: 'https://picsum.photos/200/100?image=802', title: 'Fitness Ekipmanları', link: '#' }
      ]
    },


'Ekipman & Aksesuar': {
      columns: [
        // Sütun 1: Basketbol, Futbol
        { 
          title: 'Basketbol', 
          links: [ 
            { text: 'Basketbol Malzemeleri', link: '#' },
            { text: 'Basketbol Potası', link: '#' },
            { text: 'Basketbol Topu', link: '#' }
          ] 
        },
        { 
          title: 'Futbol', 
          links: [ 
            { text: 'Amerikan Futbolu Topu', link: '#' },
            { text: 'Antreman Malzemeleri', link: '#' },
            { text: 'Futbol Topu', link: '#' }
          ] 
        },

        // Sütun 2: Golf, Av & Balıkçılık
        { 
          title: 'Golf Malzemeleri', 
          links: [ 
            { text: 'Golf Çantası', link: '#' },
            { text: 'Golf Eldiveni', link: '#' },
            { text: 'Golf Sopası', link: '#' },
            { text: 'Golf Topu', link: '#' }
          ] 
        },
        { 
          title: 'Av & Balıkçılık', 
          links: [ 
            { text: 'Balıkçılık Aksesuarları', link: '#' },
            { text: 'Olta Kamışı', link: '#' },
            { text: 'Olta Makinesi', link: '#' },
            { text: 'Suni Yem', link: '#' }
          ] 
        },

        // Sütun 3: Dalış Ürünleri
        { 
          title: 'Dalış Ürünleri', 
          links: [ 
            { text: 'Dalış Bıçağı', link: '#' },
            { text: 'Dalış Bilgisayarı', link: '#' },
            { text: 'Dalış Çantası', link: '#' },
            { text: 'Dalış Elbisesi', link: '#' },
            { text: 'Dalış Eldiveni', link: '#' },
            { text: 'Dalış Feneri', link: '#' },
            { text: 'Dalış Maskesi', link: '#' },
            { text: 'Dalış Regülatörü', link: '#' },
            { text: 'Denge Yeleği', link: '#' },
            { text: 'Maske & Şnorkel', link: '#' },
            { text: 'Palet & Patik', link: '#' }
          ] 
        },

        // Sütun 4: Kalanlar
        { 
          title: 'Tırmanış', 
          links: [ 
            { text: 'Baton', link: '#' },
            { text: 'Emniyet Malzemeleri', link: '#' }
          ] 
        },
        { 
          title: 'Voleybol', 
          links: [ 
            { text: 'Voleybol Topu', link: '#' }
          ] 
        },
        { 
          title: '', // Başlıksız
          links: [ 
            { text: 'Dart', link: '#' },
            { text: 'Okçuluk Sporu', link: '#' },
            { text: 'Yaylar', link: '#' },
            { text: 'Spor Matara', link: '#' },
            { text: 'Zıplayan Ayakkabı', link: '#' }
          ] 
        }
      ],
      promos: [ // Promosyon ekleyelim
        { img: 'https://picsum.photos/200/100?image=803', title: 'Spor Ekipmanları', link: '#' }
      ]
    },


'Su Sporu': {
      // // 10 linki 2 sütuna böldük (5+5)
      columns: [
        // Sütun 1
        { 
          title: '', // Başlık yok
          links: [ 
            { text: 'Jetski', link: '#' },
            { text: 'Sörf', link: '#' },
            { text: 'Can Yelekleri', link: '#' },
            { text: 'Deniz Gözlüğü', link: '#' },
            { text: 'Kano & Rafting', link: '#' },
          ] 
        },
        // Sütun 2
        { 
          title: '', // Başlık yok
          links: [ 
            { text: 'Su Sporu Malzemeleri', link: '#' },
            { text: 'Su Ürünleri Seti', link: '#' },
            { text: 'Yüzücü Mayoları', link: '#' },
            { text: 'Yüzücü Gözlüğü & Boneler', link: '#' },
            { text: 'Yelken Giyim & Aksesuar', link: '#' },
          ] 
        }
      ],
      promos: [ // Promosyon ekleyelim
        { img: 'https://picsum.photos/200/100?image=804', title: 'Su Sporu Ekipmanları', link: '#' }
      ]
    },


'Pilates & Yoga': {
      // // 11 linki 2 sütuna böldük (6+5)
      columns: [
        // Sütun 1
        { 
          title: '', // Başlık yok
          links: [ 
            { text: 'Pilates Topu', link: '#' },
            { text: 'Pilates Minder & Mat', link: '#' },
            { text: 'Pilates Çemberi', link: '#' },
            { text: 'Direnç Lastiği', link: '#' },
            { text: 'Bosu Topu', link: '#' },
            { text: 'Pilates Ekipmanları', link: '#' },
          ] 
        },
        // Sütun 2
        { 
          title: '', // Başlık yok
          links: [ 
            { text: 'Yoga Çorabı', link: '#' },
            { text: 'Mat Çantası', link: '#' },
            { text: 'Yoga Blok', link: '#' },
            { text: 'Yoga Ekipmanları', link: '#' },
            { text: 'Yoga Göz Bandı', link: '#' },
          ] 
        }
      ],
      promos: [ // Promosyon ekleyelim
        { img: 'https://picsum.photos/200/100?image=805', title: 'Yoga & Pilates', link: '#' }
      ]
    },


'Tenis': {
      // // 7 linki 2 sütuna böldük (4+3)
      columns: [
        // Sütun 1
        { 
          title: '', // Başlık yok
          links: [ 
            { text: 'Tenis Raketi', link: '#' },
            { text: 'Tenis Çantası', link: '#' },
            { text: 'Tenis Malzemeleri', link: '#' },
            { text: 'Masa Tenisi Masası', link: '#' },
          ] 
        },
        // Sütun 2
        { 
          title: '', // Başlık yok
          links: [ 
            { text: 'Masa Tenisi Raketi', link: '#' },
            { text: 'Tenis Giyim', link: '#' },
            { text: 'Tenis Ayakkabı & Çanta', link: '#' },
          ] 
        }
      ],
      promos: [ // Promosyon ekleyelim
        { img: 'https://picsum.photos/200/100?image=806', title: 'Tenis Ekipmanları', link: '#' }
      ]
    },


'Paten & Kaykay & Scooter': {
      columns: [
        // // 6 linki tek sütuna topladık
        { 
          title: '', // Başlık yok
          links: [ 
            { text: 'Scooter', link: '#' },
            { text: 'Elektrikli Scooter', link: '#' },
            { text: 'Hoverboard', link: '#' },
            { text: 'Kaykay', link: '#' },
            { text: 'Paten', link: '#' },
            { text: 'Buz Pateni', link: '#' },
          ] 
        }
      ],
      promos: [ // Promosyon ekleyelim
        { img: 'https://picsum.photos/200/100?image=807', title: 'Paten & Scooter', link: '#' }
      ]
    },

'Bisiklet': {
      // // 7 linki 2 sütuna böldük (4+3)
      columns: [
        // Sütun 1
        { 
          title: '', // Başlık yok
          links: [ 
            { text: 'Bisiklet', link: '#' },
            { text: 'Elektrikli Bisiklet', link: '#' },
            { text: 'Bisiklet Kaskı', link: '#' },
            { text: 'Bisiklet Gözlüğü', link: '#' },
          ] 
        },
        // Sütun 2
        { 
          title: '', // Başlık yok
          links: [ 
            { text: 'Bisiklet Ayakkabı', link: '#' },
            { text: 'Bisiklet Giyim', link: '#' },
            { text: 'Matara & Aksesuarlar', link: '#' },
          ] 
        }
      ],
      promos: [ // Promosyon ekleyelim
        { img: 'https://picsum.photos/200/100?image=808', title: 'Bisiklet Ekipmanları', link: '#' }
      ]
    },



'Kayak & Snowboard': {
      // // 11 linki 2 sütuna böldük (6+5)
      columns: [
        // Sütun 1
        { 
          title: '', // Başlık yok
          links: [ 
            { text: 'Kayak Ekipmanları', link: '#' },
            { text: 'Kayak Gözlüğü', link: '#' },
            { text: 'Kayak Kaskı', link: '#' },
            { text: 'Kayak Eldiveni', link: '#' },
            { text: 'Kayak Batonu', link: '#' },
            { text: 'Snowboard', link: '#' },
          ] 
        },
        // Sütun 2
        { 
          title: '', // Başlık yok
          links: [ 
            { text: 'Snowboard Bağlamaları', link: '#' },
            { text: 'Kayak Takımı', link: '#' },
            { text: 'Snowboard & Kayak Pantolonu', link: '#' },
            { text: 'Snowboard & Kayak Botu', link: '#' },
            { text: 'Snowboard & Kayak Montu', link: '#' },
          ] 
        }
      ],
      promos: [ // Promosyon ekleyelim
        { img: 'https://picsum.photos/200/100?image=809', title: 'Kayak Sezonu Açıldı', link: '#' }
      ]
    },


'Otomotiv & Motosiklet': {
      columns: [
        // Sütun 1: Başlıksız (Ana Kategoriler)
        { 
          title: 'Otomobil', // Başlık yok
          links: [ 
            { text: 'Otomobil', link: '#' },
            { text: 'Elektrikli Araba', link: '#' },
            { text: 'Motosiklet', link: '#' },
            { text: 'Boyunluk', link: '#' },
          ] 
        },
        // Sütun 2: Başlıklı (Ekipman & Aksesuar)
        { 
          title: 'Ekipman & Aksesuar', 
          links: [ 
            { text: 'Elektrikli Scooter & Motosiklet', link: '#' },
            { text: 'Motosiklet Ayakkabı', link: '#' },
            { text: 'Motosiklet Eldiveni', link: '#' },
            { text: 'Motosiklet Kask', link: '#' },
            { text: 'Motosiklet Montu', link: '#' },
            { text: 'Motosiklet Pantolonu', link: '#' },
          ] 
        }
      ],
      promos: [ // Promosyon ekleyelim
        { img: 'https://picsum.photos/200/100?image=810', title: 'Motosiklet Ekipmanları', link: '#' }
      ]
    },

'Öne Çıkan Markalar': {
      // // 11 markayı 2 sütuna böldük (6+5)
      columns: [
        // Sütun 1
        { 
          title: '', // Başlık yok
          links: [
            { text: 'Helly Hansen', link: '#' },
            { text: 'Wilson', link: '#' },
            { text: 'Horizon Fitness', link: '#' },
            { text: 'Port Pilates', link: '#' },
            { text: 'Bianchi', link: '#' },
            { text: 'Naturehike', link: '#' },
          ] 
        },
        // Sütun 2
        { 
          title: '', // Başlık yok
          links: [
            { text: 'Outwell', link: '#' },
            { text: 'Bowflex', link: '#' },
            { text: 'Bogner Fire & Ice', link: '#' },
            { text: 'Spalding', link: '#' },
            { text: 'Sublue', link: '#' },
          ] 
        }
      ],
      promos: [] // Promosyon yok
    },
    
    // // Eski 'Spor Giyim' kategorisi yeni listende yok,
    // // 'Kamp & Outdoor' ve diğerlerinin içine dağıtıldığı için kaldırıldı.
  },


'Outlet': {
    // // Yeni sol menü sıralamana göre güncellendi


'Giyim': {
      // // 11 linki 2 sütuna böldük (6+5)
      columns: [
        // Sütun 1
        { 
          title: '', // Başlık yok
          links: [ 
            { text: 'T-Shirt', link: '#' },
            { text: 'Sweatshirt', link: '#' },
            { text: 'Gömlek & Bluz', link: '#' },
            { text: 'Elbise & Tulum', link: '#' },
            { text: 'Ceket', link: '#' },
            { text: 'Jean Pantolon', link: '#' },
          ] 
        },
        // Sütun 2
        { 
          title: '', // Başlık yok
          links: [ 
            { text: 'Pantolon', link: '#' },
            { text: 'Etek', link: '#' },
            { text: 'Eşofman', link: '#' },
            { text: 'Bermuda & Şort', link: '#' },
            { text: 'Plaj Giyim', link: '#' }, // "Plaj Gi" düzeltildi
            { text: 'Jean Pantolon', link: '#' }, // "Plaj Gi" düzeltildi
          ] 
        }
      ],
      promos: [ // Promosyonları koruyoruz
        { img: 'https://picsum.photos/200/100?image=901', title: 'Giyim Outlet Fırsatları', link: '#' }
      ]
    },


'Ayakkabı': {
      // // 8 linki 2 sütuna böldük (4+4)
      columns: [
        // Sütun 1
        { 
          title: '', // Başlık yok
          links: [ 
            { text: 'Sneaker', link: '#' },
            { text: 'Günlük Ayakkabı', link: '#' },
            { text: 'Topuklu Ayakkabı', link: '#' },
            { text: 'Gece Ayakkabısı', link: '#' },
          ] 
        },
        // Sütun 2
        { 
          title: '', // Başlık yok
          links: [ 
            { text: 'Terlik', link: '#' },
            { text: 'Babet', link: '#' },
            { text: 'Sandalet', link: '#' },
            { text: 'Espadril', link: '#' },
          ] 
        }
      ],
      promos: [ // Promosyonları koruyoruz
        { img: 'https://picsum.photos/200/100?image=902', title: 'Ayakkabı Outlet Fırsatları', link: '#' }
      ]
    },


'Çanta': {
      columns: [
        // // 6 linki tek sütuna topladık
        { 
          title: '', // Başlık yok
          links: [ 
            { text: 'Omuz Çantası', link: '#' },
            { text: 'El Çantası', link: '#' },
            { text: 'Sırt Çantası', link: '#' },
            { text: 'Bel Çantası', link: '#' },
            { text: 'Abiye Çanta', link: '#' },
            { text: 'Bavul', link: '#' },
          ] 
        }
      ],
      promos: [ // Promosyon ekleyelim
        { img: 'https://picsum.photos/200/100?image=903', title: 'Çanta Outlet Fırsatları', link: '#' }
      ]
    },

'Aksesuar': {
      // // 7 linki 2 sütuna böldük (4+3)
      columns: [
        // Sütun 1
        { 
          title: '', // Başlık yok
          links: [ 
            { text: 'Cüzdan & Kartlık', link: '#' },
            { text: 'Takı', link: '#' },
            { text: 'Eşarp & Fular & Şal', link: '#' },
            { text: 'Kemer', link: '#' },
          ] 
        },
        // Sütun 2
        { 
          title: '', // Başlık yok
          links: [ 
            { text: 'Kravat & Poşet Mendil', link: '#' },
            { text: 'Şapka', link: '#' },
            { text: 'Güneş Gözlüğü', link: '#' },
          ] 
        }
      ],
      promos: [ // Promosyon ekleyelim
        { img: 'https://picsum.photos/200/100?image=904', title: 'Aksesuar Outlet Fırsatları', link: '#' }
      ]
    },


'Ev': {
      columns: [
        // // 4 linki tek sütuna topladık
        { 
          title: '', // Başlık yok
          links: [ 
            { text: 'Sofra Grubu', link: '#' },
            { text: 'Ev Dekorasyonu', link: '#' },
            { text: 'Banyo', link: '#' },
            { text: 'Ev Tekstili', link: '#' },
          ] 
        }
      ],
      promos: [ // Promosyon ekleyelim
        { img: 'https://picsum.photos/200/100?image=905', title: 'Ev Outlet Fırsatları', link: '#' }
      ]
    },

'Çocuk': {
      columns: [
        // // 5 linki tek sütuna topladık
        { 
          title: '', // Başlık yok
          links: [ 
            { text: 'Set&Takım', link: '#' },
            { text: 'Kız Çocuk', link: '#' },
            { text: 'Erkek Çocuk', link: '#' },
            { text: 'Bebek', link: '#' },
            { text: 'Ayakkabı & Çanta', link: '#' },
          ] 
        }
      ],
      promos: [ // Promosyon ekleyelim
        { img: 'https://picsum.photos/200/100?image=906', title: 'Çocuk Outlet Fırsatları', link: '#' }
      ]
    },

  },


'Reborn': {
    // // Yeni sol menü sıralamana göre güncellendi

'Reborn Çanta': {
      columns: [
        // // 3 linki tek sütuna topladık
        { 
          title: '', // Başlık yok
          links: [ 
            { text: 'Reborn El Portföyü', link: '#' },
            { text: 'Reborn Omuz Çantası', link: '#' },
            { text: 'Reborn Askılı/Çapraz Çanta', link: '#' },
            { text: 'Tüm Reborn Çantalar ►', link: '#' } // // Bir "Tüm" linki ekledim
          ] 
        }
      ],
      promos: [ // Promosyonları koruyoruz
        { img: 'https://picsum.photos/200/100?image=950', title: 'Vintage Çantalar', link: '#' }
      ]
    },


'Reborn Ayakkabı': {
      columns: [
        // // 5 linki tek sütuna topladık
        { 
          title: '', // Başlık yok
          links: [ 
            { text: 'Reborn Topuklu Ayakkabı', link: '#' },
            { text: 'Reborn Babet', link: '#' },
            { text: 'Reborn Loafer', link: '#' },
            { text: 'Reborn Gece Ayakkabısı', link: '#' },
            { text: 'Reborn Terlik', link: '#' },
            { text: 'Tüm Reborn Ayakkabılar ►', link: '#' } // // Bir "Tüm" linki ekledim
          ] 
        }
      ],
      promos: [ // Promosyonları koruyoruz
        { img: 'https://picsum.photos/200/100?image=951', title: 'Vintage Ayakkabılar', link: '#' }
      ]
    },


    'Reborn Başvuru': {
      columns: [ 
        { title: 'Nasıl Çalışır?', links: [ {text: 'Başvuru Formu', link:'#'}, {text: 'Süreç Hakkında', link:'#'} ] }
      ],
      promos: []
    },

    
    'Repair': {
      columns: [ 
        { title: 'Bakım & Onarım', links: [ {text: 'Çanta Bakımı', link:'#'}, {text: 'Ayakkabı Bakımı', link:'#'} ] }
      ],
      promos: []
    },
  },

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
    padding: 0 0.6rem !important; /* DÜZELTİLDİ */
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
    color: #333 !important;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.icon-group .icon-item:hover {
    color: #000 !important;
}
.icon-text {
    font-size: 0.7rem;
    color: #333 !important;
    white-space: nowrap;
}
.icon-group .icon-item i {
    font-size: 1.4rem;
    margin-bottom: 0.1rem;
    display: block;
    color: #333 !important;
}
.icon-group .icon-item:hover i,
.icon-group .icon-item:hover .icon-text {
    color: #000 !important;
}
.cart-badge {
    font-size: 0.6rem;
    padding: 0.2em 0.4em;
}
.category-bar {
    border-top: 1px solid #dee2e6;
    background-color: white;
    padding-top: 0.2rem !important;
    padding-bottom: 0.2rem !important; /* DÜZELTİLDİ (0 rem yerine 0.2rem) */
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
  border-left: 3px solid transparent;
  padding-left: calc(1rem - 3px);
  transition: all 0.1s ease-in-out;
}
.mega-menu-side-link:hover,
li.active .mega-menu-side-link {
  color: #000;
  background-color: #f8f9fa;
  border-left: 3px solid #40579e;
}
li.active .mega-menu-side-link i {
  display: none;
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