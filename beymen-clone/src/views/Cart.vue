<template>
  <BContainer class="my-5">

    <div v-if="!cartStore.itemCount || cartStore.itemCount === 0">
      
      <BRow class="justify-content-center">
        <BCol md="10" lg="8" class="text-center bg-light p-5">
          <i class="bi bi-bag h1 mb-4 d-block"></i>
          <h4 class="mb-3">SEPETİNİZDE ÜRÜN BULUNMAMAKTADIR</h4>
          <p class="text-muted mb-4">
            Birbirinden seçkin markaların, binlerce ürününü hemen keşfedin
          </p>
          <BButton variant="outline-dark" size="lg" :to="{ name: 'Home' }">
            ALIŞVERİŞE BAŞLA
          </BButton>
        </BCol>
      </BRow>

      <BRow class="justify-content-center mt-5">
        <BCol md="12" lg="10">
          <BTabs pills fill content-class="mt-4">
            
            <BTab title="FAVORİ LİSTENİZ" active>
              <div class="text-center bg-light p-5">
                <i class="bi bi-heart h1 mb-4 d-block"></i>
                <h5 class="mb-3">FAVORİLERİNİZDE ÜRÜN BULUNMAMAKTADIR</h5>
                <p class="text-muted">
                  Birbirinden seçkin markaların, binlerce ürününü hemen keşfedin.
                </p>
              </div>
            </BTab>
            
            <BTab title="ÖNCEDEN EKLEDİKLERİM">
              <div class="text-center bg-light p-5">
                <i class="bi bi-clock-history h1 mb-4 d-block"></i>
                <h5 class="mb-3">ÖNCEDEN EKLEDİĞİNİZ BİR ÜRÜN YOK</h5>
                <p class="text-muted">
                  Daha önce incelediğiniz ürünleri burada bulabilirsiniz.
                </p>
              </div>
            </BTab>

          </BTabs>
        </BCol>
      </BRow>
    </div>

    <div v-else>
      <BRow>
        <BCol lg="8">
          <h4>SEPETİM ({{ cartStore.itemCount }} Ürün)</h4>
          <hr>
          <p>... Sepetteki ürünlerin listesi buraya gelecek ...</p>
        </BCol>

        <BCol lg="4">
          <h4>SİPARİŞ ÖZETİ</h4>
          <hr>
          <p>... Ara Toplam, KDV, Kargo ve Toplam Tutar buraya gelecek ...</p>
          <BButton variant="dark" class="w-100">SATIN AL</BButton>
        </BCol>
      </BRow>
    </div>

  </BContainer>
</template>

<script setup>
import {
  BContainer,
  BRow,
  BCol,
  BButton,
  BTabs,  // <-- Sekmeler için
  BTab    // <-- Sekmeler için
} from 'bootstrap-vue-next';

// Sepet durumunu almak için Pinia store'umuzu import ediyoruz
import { useShopifyStore } from '../stores/shopifyStore';

const cartStore = useShopifyStore();
</script>

<style scoped>
/* Bootstrap'in varsayılan sekme (pill) stillerini 
   Beymen'deki gibi altı çizili hale getirelim */

/* Aktif olmayan sekme */
:deep(.nav-pills .nav-link) {
  border-radius: 0;
  color: #6c757d;
  background-color: transparent;
  border-bottom: 2px solid transparent;
  font-weight: 500;
}

/* Aktif olan sekme */
:deep(.nav-pills .nav-link.active) {
  color: #000;
  background-color: transparent;
  border-bottom: 2px solid #000;
  font-weight: 600;
}
</style>
