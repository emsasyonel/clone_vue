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
      // // Eski 'Erkek Aksesuar' içeriğini buraya taşıdık
      columns: [ { title: 'Kemer', links: [ {text: 'Deri Kemer', link: '#'} ] }, { title: 'Güneş Gözlüğü', links: [ {text: 'Tüm Gözlükler', link: '#'} ] } ],
      promos: []
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
      // // Yeni eklendi (içi boş)
      columns: [
        { title: 'Popüler Markalar', links: [{text: 'Nike', link: '#'}, {text: 'Adidas', link: '#'}] }
      ],
      promos: []
    }
    // // 'Bakım' kategorisi yeni listende olmadığı için kaldırıldı
  },
  
  
  
  'Kozmetik/BBS': {
    'Parfüm': {
      columns: [ { title: 'Parfüm', links: [ {text: 'Kadın Parfüm', link:'#'}, {text: 'Erkek Parfüm', link:'#'} ] } ],
      promos: [ { img: 'https://picsum.photos/200/100?image=301', title: 'Çok Satan Parfümler', link: '#' } ]
    },
    'Makyaj': {
      columns: [ { title: 'Makyaj', links: [ {text: 'Yüz', link:'#'}, {text: 'Göz', link:'#'} ] } ],
      promos: []
    }
  },
  'Ev & Yaşam': {
    'Sofra': {
      columns: [ { title: 'Sofra', links: [ {text: 'Yemek Takımları', link:'#'} ] } ],
      promos: []
    }
  },
  'Çocuk': {
    'Kız Çocuk': {
      columns: [ { title: 'Kız Çocuk Giyim', links: [ {text: 'Elbise', link:'#'} ] } ],
      promos: []
    }
  },
  'Anne & Bebek & Oyuncak': {
    'Bebek Giyim': {
      columns: [ { title: 'Bebek Giyim', links: [ {text: 'Zıbın', link:'#'} ] } ],
      promos: []
    }
  },
  'Teknoloji': {
    'Giyilebilir Teknoloji': {
      columns: [ { title: 'Giyilebilir', links: [ {text: 'Akıllı Saat', link:'#'} ] } ],
      promos: []
    }
  },
  'Spor & Outdoor': {
    'Spor Giyim': {
      columns: [ { title: 'Spor Giyim', links: [ {text: 'Tayt', link:'#'} ] } ],
      promos: []
    }
  },
  'Outlet': {
    'Kadın Outlet': {
      columns: [ { title: 'Kadın Giyim', links: [ {text: 'Elbise', link:'#'} ] } ],
      promos: []
    }
  },
  'Reborn': {
    'Lüks Çanta': {
      columns: [ { title: 'Markalar (Çanta)', links: [ {text: 'Chanel', link:'#'} ] } ],
      promos: []
    }
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