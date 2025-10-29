<template>
  <BContainer class="my-5">
    <BRow class="justify-content-center">
      <BCol md="6">
        <h4 class="mb-4">ÜYE OL</h4>
        
        <BForm>
          <BRow>
            <BCol md="6">
              <BFormGroup label="ADINIZ*" label-for="register-firstname" class="mb-3">
                <BFormInput
                  id="register-firstname"
                  type="text"
                  placeholder="Lütfen adınızı yazınız"
                  required
                ></BFormInput>
              </BFormGroup>
            </BCol>
            
            <BCol md="6">
              <BFormGroup label="SOYADINIZ*" label-for="register-lastname" class="mb-3">
                <BFormInput
                  id="register-lastname"
                  type="text"
                  placeholder="Lütfen soyadınızı yazınız"
                  required
                ></BFormInput>
              </BFormGroup>
            </BCol>
          </BRow>

          <BFormGroup label="E-POSTA ADRESİNİZ*" label-for="register-email" class="mb-3">
            <BFormInput
              id="register-email"
              type="email"
              placeholder="Lütfen e-posta adresinizi yazınız"
              required
            ></BFormInput>
          </BFormGroup>

          <BFormGroup label="CEP TELEFONUNUZ*" label-for="register-phone" class="mb-3">
            <BFormInput
              id="register-phone"
              type="tel"
              placeholder="555-555-55-55"
              required
            ></BFormInput>
          </BFormGroup>

          <BFormGroup label="DOĞUM TARİHİNİZ" class="mb-3">
            <BRow>
              <BCol cols="4">
                <BFormSelect id="register-day" v-model="form.day" :options="days"></BFormSelect>
              </BCol>
              <BCol cols="4">
                <BFormSelect id="register-month" v-model="form.month" :options="months"></BFormSelect>
              </BCol>
              <BCol cols="4">
                <BFormSelect id="register-year" v-model="form.year" :options="years"></BFormSelect>
              </BCol>
            </BRow>
          </BFormGroup>

          <BFormGroup label="CİNSİYETİNİZ" class="mb-3">
            <BFormRadioGroup
              id="register-gender"
              v-model="form.gender"
              :options="genderOptions"
            ></BFormRadioGroup>
          </BFormGroup>

          <BFormGroup label="ŞİFRENİZ*" label-for="register-password" class="mb-3">
            <BFormInput
              id="register-password"
              type="password"
              placeholder="Lütfen şifrenizi yazınız"
              required
            ></BFormInput>
            </BFormGroup>
          
          <p class="text-muted small">
            Lütfen üye olmadan önce <a href="#" class="text-dark">Aydınlatma Metni</a>'ni okuyunuz.
          </p>
          
          <BFormCheckbox v-model="form.marketingConsent" class="mb-2">
            <small>Kampanyalardan, avantajlardan ve yeniliklerden haberdar olmak istiyorum.</small>
          </BFormCheckbox>

          <BFormCheckbox v-model="form.termsConsent" class="mb-3" required>
            <small><a href="#" class="text-dark">Üyelik Sözleşmesini</a>, <a href="#" class="text-dark">Kişisel Verilerin İşlenmesine İlişkin Açık Rıza Metnini</a> ve <a href="#" class="text-dark">Sadakat Programı Sözleşmesini</a> okudum, onaylıyorum.</small>
          </BFormCheckbox>

          <BButton variant="dark" class="w-100 py-2">ÜYE OL</BButton>

          <div class="text-center mt-3">
            <small>Zaten üye misiniz? 
              <router-link :to="{ name: 'Login' }">Giriş Yap</router-link>
            </small>
          </div>
        </BForm>
      </BCol>
    </BRow>
  </BContainer>
</template>

<script setup>
import { ref } from 'vue';
// Gerekli importları yapıyoruz (YENİ bileşenler eklendi)
import {
  BContainer,
  BRow,
  BCol,
  BForm,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BButton,
  BFormSelect,      // <-- YENİ (Doğum tarihi için)
  BFormRadioGroup   // <-- YENİ (Cinsiyet için)
} from 'bootstrap-vue-next';

// Form verilerini tutmak için bir ref
const form = ref({
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  day: null,
  month: null,
  year: null,
  gender: null,
  password: '',
  marketingConsent: false,
  termsConsent: false
});

// Cinsiyet seçenekleri
const genderOptions = ref([
  { text: 'Kadın', value: 'female' },
  { text: 'Erkek', value: 'male' }
]);

// --- Doğum Tarihi Seçeneklerini Oluşturma ---
const days = ref(['Gün']);
for (let i = 1; i <= 31; i++) {
  days.value.push(i);
}

const months = ref([
  'Ay', 'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
]);

const years = ref(['Yıl']);
const currentYear = new Date().getFullYear();
for (let i = currentYear; i >= 1950; i--) {
  years.value.push(i);
}
</script>

<style scoped>
/* Bootstrap form etiketlerini varsayılan olarak kalın yapar, biz kaldıralım */
:deep(label) {
  font-weight: 500; /* veya 'normal' */
}
</style>