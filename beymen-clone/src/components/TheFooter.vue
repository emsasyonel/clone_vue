<template>
  <div>
    <div class="footer-top-info py-4 border-bottom">
      <div class="container">
        <div class="row text-center text-md-start">
          
          <div class="col-md-4 mb-3 mb-md-0 d-flex align-items-center info-col">
            <div class="icon-circle-bg me-3">
              <i class="bi bi-truck text-white" style="font-size: 1.5rem;"></i>
            </div>
            <div>
              <h6 class="info-title">ÜCRETSİZ KARGO</h6>
              <p class="info-text mb-0">
                2000 TL ve üzeri alışverişlerinizde kargo ücretsiz. 
                The One üyelerine alt limitsiz ücretsiz kargo ayrıcalığı.
              </p>
            </div>
          </div>

          <div class="col-md-4 mb-3 mb-md-0 d-flex align-items-center info-col">
            <div class="icon-circle-bg me-3">
              <i class="bi bi-mouse text-white" style="font-size: 1.5rem;"></i>
            </div>
            <div>
              <h6 class="info-title">MAĞAZADAN TESLİM</h6>
              <p class="info-text mb-0">
                Online olarak satın aldığınız ürünleri mağazalarımızdan teslim alabilirsiniz.
              </p>
            </div>
          </div>

          <div class="col-md-4 d-flex align-items-center info-col">
            <div class="icon-circle-bg me-3">
              <i class="bi bi-box2-heart text-white" style="font-size: 1.5rem;"></i>
            </div>
            <div>
              <h6 class="info-title">KOLAY İADE</h6>
              <p class="info-text mb-0">
                Beymen.com’dan satın aldığınız ürünleri kolayca iade edebilirsiniz.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>

    <footer class="footer-main bg-dark text-white pt-5 pb-4">
      <div class="container">
        <div class="row">
          
          <div class="col-lg-2 col-md-4 col-sm-6 mb-4 footer-links">
            <h5 class="footer-title">BEYMEN HAKKINDA</h5>
            <ul class="list-unstyled">
              <li><a href="#">Markalar</a></li>
              <li><a href="#">Koşulsuz Müşteri Mutluluğu</a></li>
              <li><a href="#">The One Card</a></li>
              <li><a href="#">Özel Dikim</a></li>
              <li><a href="#">Beymen Privé – Stil Danışmanlığı</a></li>
            </ul>
          </div>

          <div class="col-lg-3 col-md-4 col-sm-6 mb-4 footer-links">
            <h5 class="footer-title">MÜŞTERİ HİZMETLERİ</h5>
            <ul class="list-unstyled">
              <li><a href="#">Bize Sorun</a></li>
              <li><a href="#">Sıkça Sorulan Sorular</a></li>
              <li><a href="#">İşlem Rehberi</a></li>
              <li><a href="#">Ücretsiz Kargo ve İade</a></li>
              <li><a href="#">Mağazadan Teslim</a></li>
            </ul>
          </div>

          <div class="col-lg-2 col-md-4 col-sm-6 mb-4 footer-links">
            <h5 class="footer-title">HESABIM</h5>
            <ul class="list-unstyled">
              <li><a href="#">Siparişlerim</a></li>
              <li><a href="#">Adreslerim</a></li>
            </ul>
            <h5 class="footer-title mt-4">MAĞAZALAR</h5>
            <ul class="list-unstyled">
              <li><a href="#">BEYMEN BLOG</a></li>
            </ul>
          </div>

          <div class="col-lg-2 col-md-6 col-sm-6 mb-4 footer-links">
            <h5 class="footer-title">ÖZEL SAYFALAR</h5>
            <ul class="list-unstyled">
              <li><a href="#">Yılbaşı</a></li>
              <li><a href="#">Sevgililer Günü</a></li>
              <li><a href="#">Anneler Günü</a></li>
              <li><a href="#">Babalar Günü</a></li>
            </ul>
          </div>
          
          <div class="col-lg-3 col-md-6 mb-4 footer-contact">
            <div class="footer-logo mb-3">
              <span class="logo-text">LUSVİON <span class="dot"></span></span>
            </div>
            
            <div class="footer-social mb-4">
              <h6 class="footer-title">BİZİ TAKİP EDİN</h6>
              <a href="#" class="text-white me-2"><i class="bi bi-facebook" style="font-size: 1.5rem;"></i></a>
              <a href="#" class="text-white me-2"><i class="bi bi-twitter" style="font-size: 1.5rem;"></i></a>
              <a href="#" class="text-white me-2"><i class="bi bi-instagram" style="font-size: 1.5rem;"></i></a>
              <a href="#" class="text-white me-2"><i class="bi bi-youtube" style="font-size: 1.5rem;"></i></a>
            </div>

            <div class="footer-app">
              <h6 class="footer-title">UYGULAMAMIZI İNDİRİN</h6>
              <a href="#" class="d-inline-block mb-2">
                <img src="https://cdn.beymen.com/assets/desktop/img/apple-icon.svg" alt="App Store" height="40">
              </a>
              <a href="#" class="d-inline-block mb-2 ms-2">
                <img src="https://cdn.beymen.com/assets/desktop/img/google-play-icon.svg" alt="Google Play" height="40">
              </a>
            </div>
          </div>
        </div>

        <div class="row mt-4 border-top border-secondary pt-3">
          <div class="col text-center text-white-50">
            &copy; {{ new Date().getFullYear() }} Beymen Klonu. Tüm Hakları Saklıdır.
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Bu bileşen için artık 'bootstrap-vue-next' GEREKMİYOR.
// <script setup> bloğu boş kalabilir.
</script>

<style scoped>
/* --- BÖLÜM 1: ÜST BİLGİ ÇUBUĞU --- */
.footer-top-info {
  background-color: #ffffff; /* Beymen'deki gibi beyaz */
}
.icon-circle-bg {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  height: 60px;
  background-color: #212529; /* Siyah */
  border-radius: 50%; /* Yuvarlak */
  flex-shrink: 0;
}
.info-title {
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  color: #212529;
  text-transform: uppercase;
}
.info-text {
  font-size: 0.8rem;
  color: #555;
  line-height: 1.4;
}
.info-col {
  /* Mobil görünümde ortala */
  justify-content: center;
}
@media (min-width: 768px) {
  /* Masaüstünde (md) sola yasla */
  .info-col {
    justify-content: flex-start;
  }
}

/* --- BÖLÜM 2: ANA FOOTER --- */
.footer-main {
  background-color: #212529;
}
.footer-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  margin-bottom: 1rem;
}
.footer-links ul {
  padding-left: 0;
}
.footer-links li {
  margin-bottom: 0.5rem;
}
.footer-links a {
  color: #adb5bd;
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.2s;
}
.footer-links a:hover {
  color: #ffffff;
  text-decoration: underline;
}
.logo-text {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    letter-spacing: 8px;
    font-size: 1.75rem;
    text-decoration: none;
    white-space: nowrap;
}
.logo-text .dot {
  color: #40579e;
  font-weight: 700;
}
.footer-social a {
  transition: opacity 0.2s;
}
.footer-social a:hover {
  opacity: 0.7;
}
.footer-app img {
  border-radius: 5px;
  transition: opacity 0.2s;
}
.footer-app a:hover {
  opacity: 0.8;
}
.border-secondary {
  border-color: #495057 !important;
}
/* Mobil Cihazlarda Linkleri Ortala */
@media (max-width: 767.98px) {
  .footer-links, .footer-contact {
    text-align: center;
  }
}
</style>