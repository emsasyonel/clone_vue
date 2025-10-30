<template>
  <BContainer class="my-5">
    <BRow class="justify-content-center">
      <BCol md="6" class="p-4 register-box">
        <h4 class="mb-4 section-title">ÜYE OL</h4>
        
        <BForm>
          <BFormGroup 
            label="ADINIZ*" 
            label-for="register-firstname" 
            class="mb-3 text-uppercase fw-bold small"
          >
            <BFormInput
              id="register-firstname"
              type="text"
              placeholder="Lütfen adınızı yazınız"
              required
              class="rounded-0"
            ></BFormInput>
          </BFormGroup>
          
          <BFormGroup 
            label="SOYADINIZ*" 
            label-for="register-lastname" 
            class="mb-3 text-uppercase fw-bold small"
          >
            <BFormInput
              id="register-lastname"
              type="text"
              placeholder="Lütfen soyadınızı yazınız"
              required
              class="rounded-0"
            ></BFormInput>
          </BFormGroup>

          <BFormGroup 
            label="E-POSTA ADRESİNİZ*" 
            label-for="register-email" 
            class="mb-3 text-uppercase fw-bold small"
          >
            <BFormInput
              id="register-email"
              type="email"
              placeholder="Lütfen e-posta adresinizi yazınız"
              required
              class="rounded-0"
            ></BFormInput>
          </BFormGroup>

          <BFormGroup 
            label="CEP TELEFONUNUZ*" 
            label-for="register-phone" 
            class="mb-3 text-uppercase fw-bold small"
          >
            <BFormInput
              id="register-phone"
              type="tel"
              placeholder="555-555-55-55"
              required
              class="rounded-0"
            ></BFormInput>
          </BFormGroup>

          <BFormGroup label="DOĞUM TARİHİNİZ" class="mb-3 text-uppercase fw-bold small">
            <BRow>
              <BCol cols="4">
                <BFormSelect id="register-day" v-model="form.day" :options="days" class="rounded-0"></BFormSelect>
              </BCol>
              <BCol cols="4">
                <BFormSelect id="register-month" v-model="form.month" :options="months" class="rounded-0"></BFormSelect>
              </BCol>
              <BCol cols="4">
                <BFormSelect id="register-year" v-model="form.year" :options="years" class="rounded-0"></BFormSelect>
              </BCol>
            </BRow>
          </BFormGroup>

          <BFormGroup label="CİNSİYETİNİZ" class="mb-3 text-uppercase fw-bold small custom-radio-group">
            <BFormRadioGroup
              id="register-gender"
              v-model="form.gender"
              :options="genderOptions"
            ></BFormRadioGroup>
          </BFormGroup>

          <BFormGroup 
            label="ŞİFRENİZ*" 
            label-for="register-password" 
            class="mb-3 text-uppercase fw-bold small"
          >
            <BFormInput
              id="register-password"
              type="password"
              placeholder="Lütfen şifrenizi yazınız"
              required
              class="rounded-0"
            ></BFormInput>
            </BFormGroup>
          
          <p class="text-muted small register-legal-text">
            Lütfen üye olmadan önce <a href="#" class="text-dark text-decoration-underline">Aydınlatma Metni</a>'ni okuyunuz. Aydınlatma metnine her zaman anasayfadaki "<a href="#" class="text-dark text-decoration-underline">Kişisel Verilerinizin Korunmasına İlişkin Aydınlatma Metni</a>" ibaresine tıklayarak da ulaşabilirsiniz.
          </p>
          
          <BFormCheckbox v-model="form.marketingConsent" class="mb-2 custom-checkbox">
            <small class="register-legal-text">Beymen'in kampanyalarından haberdar olmak istiyorum. Beymen Perakende ve Tekstil Yatırımları A.Ş.'ne tarafıma ticari elektronik ileti gönderilmesine <a href="#" class="text-dark text-decoration-underline">burada</a> da belirtilen izni veriyorum.</small>
          </BFormCheckbox>

          <BFormCheckbox v-model="form.termsConsent" class="mb-3 custom-checkbox" required>
            <small class="register-legal-text"><a href="#" class="text-dark text-decoration-underline">Üyelik Sözleşmesini</a>, <a href="#" class="text-dark text-decoration-underline">Kişiselleştirilmiş Pazarlamaya İlişkin Açık Rıza Metnini</a>, <a href="#" class="text-dark text-decoration-underline">Sadakat Programı Sözleşmesini</a> okudum onaylıyorum.</small>
          </BFormCheckbox>

          <BButton 
            variant="dark" 
            class="w-100 py-2 rounded-0 text-uppercase fw-bold"
            type="submit"
          >
            ÜYE OL
          </BButton>

          <div class="text-center mt-3">
            <small>Zaten üye misiniz? 
              <router-link :to="{ name: 'Login' }" class="text-dark text-decoration-underline">Giriş Yap</router-link>
            </small>
          </div>
        </BForm>
      </BCol>
    </BRow>
  </BContainer>
</template>

<script setup>
import { ref } from 'vue';
// Importlar doğru, hepsi manuel
import {
  BContainer,
  BRow,
  BCol,
  BForm,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BButton,
  BFormSelect,
  BFormRadioGroup
} from 'bootstrap-vue-next';

const form = ref({
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  day: 'Gün', // Placeholder olarak 'Gün' seçili olsun
  month: 'Ay', // Placeholder
  year: 'Yıl', // Placeholder
  gender: null,
  password: '',
  marketingConsent: false,
  termsConsent: false
});

const genderOptions = ref([
  { text: 'Kadın', value: 'female' },
  { text: 'Erkek', value: 'male' }
]);

// Doğum Tarihi Seçenekleri
const days = ref(['Gün']);
for (let i = 1; i <= 31; i++) {
  days.value.push({ text: i, value: i });
}

const months = ref([
  { text: 'Ay', value: 'Ay' },
  { text: 'Ocak', value: 1 }, { text: 'Şubat', value: 2 }, { text: 'Mart', value: 3 },
  { text: 'Nisan', value: 4 }, { text: 'Mayıs', value: 5 }, { text: 'Haziran', value: 6 },
  { text: 'Temmuz', value: 7 }, { text: 'Ağustos', value: 8 }, { text: 'Eylül', value: 9 },
  { text: 'Ekim', value: 10 }, { text: 'Kasım', value: 11 }, { text: 'Aralık', value: 12 }
]);

const years = ref(['Yıl']);
const currentYear = new Date().getFullYear();
for (let i = currentYear - 18; i >= 1950; i--) { // 18 yaşından büyükler için
  years.value.push({ text: i, value: i });
}
</script>

<style scoped>
/* === YENİ EKLENEN STİLLER (Login sayfasıyla aynı) === */

/* Ana Başlık (ÜYE OL) */
.section-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d2d2d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-block;
  border-bottom: 2px solid #2d2d2d;
  padding-bottom: 0.5rem;
}

/* Form Etiketleri (Zaten sınıfla halledildi ama garanti olsun) */
:deep(.form-label) {
  font-size: 0.75rem; /* 12px */
  letter-spacing: 0.5px;
  font-weight: 700;
}

/* Form Alanları (Input, Select) */
:deep(.form-control),
:deep(.form-select) {
  border-radius: 0;
  border: 1px solid #ced4da;
  padding: 0.75rem 1rem;
  color: #212529;
}
:deep(.form-control:focus),
:deep(.form-select:focus) {
  border-color: #40579e;
  box-shadow: 0 0 0 0.25rem rgba(64, 87, 158, 0.25);
}

/* Doğum tarihi placeholder'ları (Gün, Ay, Yıl) */
:deep(.form-select option[value="Gün"]),
:deep(.form-select option[value="Ay"]),
:deep(.form-select option[value="Yıl"]) {
  color: #6c757d; /* Placeholder rengi */
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
  margin-top: 0.2em; /* Yazıyla hizala */
}
:deep(.custom-checkbox .form-check-input:checked) {
  background-color: #2d2d2d;
  border-color: #2d2d2d;
}

/* Cinsiyet Radio Butonları */
:deep(.custom-radio-group .form-check) {
  display: inline-block; /* Yan yana */
  margin-right: 1.5rem;
}
:deep(.custom-radio-group .form-check-input) {
  border: 2px solid #2d2d2d;
}
:deep(.custom-radio-group .form-check-input:checked) {
  background-color: #2d2d2d;
  border-color: #2d2d2d;
}

/* Yasal Metinler */
.register-legal-text {
  font-size: 0.8rem;
  color: #555;
  line-height: 1.5;
}
.register-legal-text a {
  font-weight: 600;
}
.register-box {
  background-color: #f8f9fa; /* Bootstrap'in standart 'light' gri rengi */
}
</style>