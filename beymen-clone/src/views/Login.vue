<template>
  <BContainer class="my-5">
    <BRow class="justify-content-center">
      
      <BCol md="5" class="p-4 border-end">
        <h4 class="mb-4">GİRİŞ YAP</h4>
        <BForm>
          <BFormGroup
            label="E-POSTA ADRESİNİZ*"
            label-for="login-email"
            class="mb-3"
          >
            <BFormInput
              id="login-email"
              type="email"
              placeholder="Lütfen e-posta adresinizi yazınız"
              required
            ></BFormInput>
          </BFormGroup>

          <BFormGroup
            label="ŞİFRENİZ*"
            label-for="login-password"
            class="mb-3"
          >
            <BFormInput
              id="login-password"
              type="password"
              placeholder="Lütfen şifrenizi yazınız"
              required
            ></BFormInput>
          </BFormGroup>
          
          <div class="d-flex justify-content-between align-items-center mb-3">
             <BFormCheckbox id="remember-me">
               Beni Hatırla
             </BFormCheckbox>
             <a href="#" class="small text-dark">Şifremi Unuttum</a>
          </div>

          <BButton variant="dark" class="w-100 py-2">GİRİŞ YAP</BButton>
        </BForm>
      </BCol>

      <BCol md="5" class="p-4">
        <h4 class="mb-4">ÜYE OL</h4>
        <p class="text-muted">
          Beymen.com'a üye olarak birçok avantajdan faydalanabilirsiniz. One çıkan avantajlar;
        </p>
        <ul class="list-unstyled text-muted mb-4">
          <li class="mb-2">
            <i class="bi bi-bell me-2"></i>
            Kampanyalardan öncelikli olarak haberdar olabilirsiniz.
          </li>
          <li class="mb-2">
            <i class="bi bi-phone me-2"></i>
            Beymen mobil uygulamaları ile alışveriş keyfinize telefonunuzdan devam edebilirsiniz.
          </li>
          <li class="mb-2">
            <i class="bi bi-credit-card me-2"></i>
            The One Card'ınızı kayıt edebilir ve puanlarınızı kullanabilirsiniz.
          </li>
        </ul>
        <BButton variant="outline-dark" class="w-100 py-2">ÜYE OL</BButton>
      </BCol>

    </BRow>
  </BContainer>
</template>

<script setup>
// Gerekli importları yapıyoruz
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
/* Stiller... */
</style>