<script>
import {useFavoritiesStore} from '../stores/useFavoritiesStore';
import Productcard from './Product/components/Productcard.vue';

export default {
  components: {
    Productcard,
  },
  setup() {
    return {favoritiesStore: useFavoritiesStore()};
  },

  async created() {
    await this.favoritiesStore.loadFavorites();
  },
  unmounted() {
    this.favoritiesStore.resetProducts();
  },

};
</script>

<template>
  <div>
    <Categories :active="activeCategory" @select="onSelect"/>
  </div>
  <progress v-if="favoritiesStore.isLoading"/>
  <div v-else-if="favoritiesStore.favoriteProducts.length > 0" class="products">
    <Productcard v-for="prod in favoritiesStore.favoriteProducts" :key="prod.title + prod.id" :product="prod"/>
  </div>
</template>

<style scoped>
.products {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}
</style>
