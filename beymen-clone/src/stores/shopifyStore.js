// src/stores/useShopifyStore.js

import { defineStore } from 'pinia';
import { ref, computed } from 'vue'; // Composition API için ref ve computed import ediyoruz

export const useShopifyStore = defineStore('shopify', () => {
    
    // --- STATE ---
    const products = ref([]);
    const loading = ref(false);
    const error = ref(null);

    // --- GETTERS (Computed) ---
    // Bileşenlerin kullanacağı daha temiz ve düz bir ürün listesi sunar
    const normalizedProducts = computed(() => {
        return products.value.map(product => {
            // Shopify verisinden ihtiyacımız olan alanları çıkarıyoruz
            const defaultVariant = product.variants?.edges[0]?.node;
            const defaultImage = product.images?.edges[0]?.node;

            // Fiyatı tam sayıdan ondalıklı hale getirelim (örnek: 5999 -> 59.99)
            const priceAmount = defaultVariant?.price?.amount || 0;
            const formattedPrice = (priceAmount / 100).toFixed(2); // Sahte veride bunu kullanmak için priceAmount'u sayı olarak kabul ettik

            return {
                id: product.id,
                title: product.title,
                price: parseFloat(formattedPrice),
                priceText: `${formattedPrice} TL`,
                imageUrl: defaultImage?.src || 'https://via.placeholder.com/300x400?text=No+Image'
            };
        });
    });

    // --- ACTIONS ---
    async function fetchProducts() {
        loading.value = true;
        error.value = null;

        try {
            // ------------------------------------------------------------------------------------------
            // 1. GERÇEK SHOPİFY API KISMI (Pasif)
            // ------------------------------------------------------------------------------------------
            /*
            const res = await fetch('https://yourstore.myshopify.com/api/2024-10/graphql.json', {
                method: 'POST',
                // ... headers ve body (query) kodları ...
            });
            const data = await res.json();
            products.value = data.data.products.edges.map(edge => edge.node);
            */
            
            // ------------------------------------------------------------------------------------------
            // 2. FAKE DATA KISMI (Aktif)
            // Simülasyon için 500ms bekleme ekleyelim
            await new Promise(resolve => setTimeout(resolve, 500)); 
            // ------------------------------------------------------------------------------------------
            products.value = [
                {
                    id: 'gid://shopify/Product/1',
                    title: 'Erkek Premium Deri Ceket',
                    images: { edges: [{ node: { src: 'https://picsum.photos/300/400?1' } }] },
                    variants: { edges: [{ node: { price: { amount: 599900 } } }] } // Price 5999.00 TL simülasyonu
                },
                {
                    id: 'gid://shopify/Product/2',
                    title: 'Kadın Yün Triko Kazak',
                    images: { edges: [{ node: { src: 'https://picsum.photos/300/400?2' } }] },
                    variants: { edges: [{ node: { price: { amount: 299900 } } }] } // Price 2999.00 TL simülasyonu
                },
                {
                    id: 'gid://shopify/Product/3',
                    title: 'Unisex Koşu Ayakkabısı',
                    images: { edges: [{ node: { src: 'https://picsum.photos/300/400?3' } }] },
                    variants: { edges: [{ node: { price: { amount: 449900 } } }] } // Price 4499.00 TL simülasyonu
                },
                {
                    id: 'gid://shopify/Product/4',
                    title: 'İpeksi Şal',
                    images: { edges: [{ node: { src: 'https://picsum.photos/300/400?4' } }] },
                    variants: { edges: [{ node: { price: { amount: 129900 } } }] } // Price 1299.00 TL simülasyonu
                }
            ];

        } catch (err) {
            console.error("Ürün çekme hatası:", err);
            error.value = err;
        } finally {
            loading.value = false;
        }
    }

    // Store'un dışarıya sunduğu tüm reaktif değerleri ve fonksiyonları döndürüyoruz
    return {
        products,
        loading,
        error,
        normalizedProducts, // Bileşenler bunu kullanmalı!
        fetchProducts,
    };
});