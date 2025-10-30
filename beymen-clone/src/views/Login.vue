<template>
  <BContainer class="my-5">
    <BRow class="justify-content-center">
      
      <BCol md="5" class="p-4 me-md-5">
        <h4 class="mb-4 section-title">GİRİŞ YAP</h4>
        <BForm>
          
          <BFormGroup
            label="E-POSTA ADRESİNİZ*"
            label-for="login-email"
            class="mb-3 text-uppercase fw-bold small"
          >
            <BFormInput
              id="login-email"
              type="email"
              placeholder="Lütfen e-posta adresinizi yazınız"
              required
              class="rounded-0"
            ></BFormInput>
          </BFormGroup>

          <BFormGroup
            label="ŞİFRENİZ*"
            label-for="login-password"
            class="mb-3 text-uppercase fw-bold small"
          >
            <BFormInput
              id="login-password"
              type="password"
              placeholder="Lütfen şifrenizi yazınız"
              required
              class="rounded-0"
            ></BFormInput>
            </BFormGroup>
          
          <div class="d-flex justify-content-between align-items-center mb-3">
             <BFormCheckbox id="remember-me" class="custom-checkbox">
               Beni Hatırla
             </BFormCheckbox>
             <a href="#" class="small text-dark text-decoration-underline">Şifremi Unuttum</a>
          </div>

          <BButton variant="dark" class="w-100 py-2 rounded-0 text-uppercase fw-bold">
            GİRİŞ YAP
          </BButton>
        </BForm>
      </BCol>

      <BCol md="5" class="p-4">
        <h4 class="mb-4 section-title">ÜYE OL</h4>
        <p class="text-muted small-text">
          Beymen.com'a üye olarak birçok avantajdan faydalanabilirsiniz. Öne çıkan avantajlar;
        </p>
        <ul class="list-unstyled text-muted mb-4 icon-list">
          <li class="mb-3 d-flex align-items-center">
            <i class="bi bi-bell h4 mb-0 me-3 text-muted"></i>
            <span class="small-text">
              Kampanyalardan öncelikli olarak haberdar olabilirsiniz.
            </span>
          </li>
          <li class="mb-3 d-flex align-items-center">
            <i class="bi bi-phone h4 mb-0 me-3 text-muted"></i>
            <span class="small-text">
              Beymen mobil uygulamaları ile alışveriş keyfinize telefonunuzdan devam edebilirsiniz.
            </span>
          </li>
          <li class="mb-3 d-flex align-items-center">
            <i class="bi bi-credit-card h4 mb-0 me-3 text-muted"></i>
            <span class="small-text">
              The One Card'ınızı kayıt edebilir ve puanlarınızı kullanabilirsiniz.
            </span>
          </li>
        </ul>
        
        <BButton 
          variant="outline-dark" 
          class="w-100 py-2 rounded-0 text-uppercase fw-bold" 
          :to="{ name: 'Register' }"
        >
          ÜYE OL
        </BButton>

      </BCol>
    </BRow>
  </BContainer>
</template>

<script setup>
// Gerekli importların doğru (ve manuel)
import {
  BContainer,
  BRow,
  BCol,
  BForm,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BButton
} from 'bootstrap-vue-next';
</script>

<style scoped>
/* === YENİ EKLENEN STİLLER === */

/* Ana Başlıklar (GİRİŞ YAP / ÜYE OL) */
.section-title {
  font-family: 'Montserrat', sans-serif; /* Header'daki gibi */
  font-size: 1.25rem; /* 20px */
  font-weight: 600;
  color: #2d2d2d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  /* Alt çizgi (İsteğe bağlı, Beymen'deki gibi) */
  display: inline-block;
  border-bottom: 2px solid #2d2d2d;
  padding-bottom: 0.5rem;
}

/* Form Etiketleri */
:deep(.form-label) {
  font-weight: 700;
  font-size: 0.75rem; /* 12px */
  letter-spacing: 0.5px;
}

/* Form Alanları */
:deep(.form-control) {
  border-radius: 0;
  border: 1px solid #ced4da;
  padding: 0.75rem 1rem; /* Daha dolgun */
}
:deep(.form-control:focus) {
  border-color: #40579e; /* Beymen mavisi */
  box-shadow: 0 0 0 0.25rem rgba(64, 87, 158, 0.25);
}

/* Buton Yazıları */
.btn {
  letter-spacing: 1px;
}

/* Özel Checkbox (Hedef tasarımdaki kare) */
:deep(.custom-checkbox .form-check-input) {
  border-radius: 0 !important;
  border: 2px solid #2d2d2d;
  width: 1.25em;
  height: 1.25em;
}
:deep(.custom-checkbox .form-check-input:checked) {
  background-color: #2d2d2d;
  border-color: #2d2d2d;
}

/* Avantajlar listesi */
.small-text {
  font-size: 0.9rem; /* 14.4px */
  color: #555;
}
.icon-list i {
  color: #888;
}
</style>