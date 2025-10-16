<template>
  <footer class="bg-dark text-white pt-5 pb-4">
    <b-container>
      <b-row>
        <b-col md="3" sm="6" class="mb-4">
          <h5>KURUMSAL</h5>
          <ul class="list-unstyled">
            <li><router-link to="/about" class="text-white-50">Hakkımızda</router-link></li>
            <li><router-link to="/careers" class="text-white-50">Kariyer</router-link></li>
            <li><router-link to="/stores" class="text-white-50">Mağazalarımız</router-link></li>
          </ul>
        </b-col>

        <b-col md="3" sm="6" class="mb-4">
          <h5>MÜŞTERİ HİZMETLERİ</h5>
          <ul class="list-unstyled">
            <li><router-link to="/faq" class="text-white-50">Sıkça Sorulanlar</router-link></li>
            <li><router-link to="/shipping" class="text-white-50">Teslimat</router-link></li>
            <li><router-link to="/returns" class="text-white-50">İade Koşulları</router-link></li>
          </ul>
        </b-col>

        <b-col md="3" sm="6" class="mb-4">
          <h5>BİZİ TAKİP EDİN</h5>
          <b-icon-facebook class="h4 mr-2"></b-icon-facebook>
          <b-icon-twitter class="h4 mr-2"></b-icon-twitter>
          <b-icon-instagram class="h4"></b-icon-instagram>
        </b-col>
        
        <b-col md="3" sm="6" class="mb-4">
          <h5>E-BÜLTEN</h5>
          <p class="text-white-50">Yeniliklerden haberdar olmak için.</p>
          <b-form-input type="email" placeholder="E-posta Adresiniz"></b-form-input>
          <b-button variant="light" class="mt-2 w-100">Abone Ol</b-button>
        </b-col>
      </b-row>

      <b-row class="mt-4 border-top pt-3">
        <b-col class="text-center text-white-50">
          &copy; {{ new Date().getFullYear() }} Beymen Klonu. Tüm Hakları Saklıdır.
        </b-col>
      </b-row>
    </b-container>
  </footer>
</template>