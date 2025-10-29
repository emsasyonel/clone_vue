<template>
  <div class="category-page container py-4">
    <h1>{{ categoryName }} Kategorisi</h1>
    <p>Şu anda <strong>{{ $route.params.slug }}</strong> slug'ına sahip kategori sayfasındasınız.</p>
    <p>Burada ilgili kategorinin ürünleri listelenecek.</p>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// URL'deki slug'ı alıp baş harfini büyük yapalım (örn: "kadin" -> "Kadın")
const categoryName = computed(() => {
  const slug = route.params.slug || '';
  return slug.charAt(0).toUpperCase() + slug.slice(1);
});
</script>

<style scoped>
.category-page {
  min-height: 400px; /* Sayfanın biraz dolu görünmesi için */
}
</style>