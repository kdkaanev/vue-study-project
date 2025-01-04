<script setup>
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import Productcard from '../pages/Product/components/Productcard.vue';
import { useFavoritiesStore } from '../stores/useFavoritiesStore';

const { favoriteProducts, isLoading } = storeToRefs(useFavoritiesStore());
const { loadFavorites, resetProducts } = useFavoritiesStore();

loadFavorites();

onMounted(() => resetProducts());
</script>

<template>
  <div>
    <Categories :active="activeCategory" @select="onSelect" />
  </div>
  <progress v-if="isLoading" />
  <div v-else-if="favoriteProducts.length > 0" class="products">
    <Productcard v-for="prod in favoriteProducts" :key="prod.title + prod.id" :product="prod" />
  </div>
</template>

<style scoped>
.products {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}
</style>
