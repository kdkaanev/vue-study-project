import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { getProductsByIds } from '../services/productServises'; // Adjust the import path as necessary

export const useFavoritiesStore = defineStore('favoritiesStore', () => {
  const favorites = ref(new Set([]));
  const products = ref([]);
  const isLoading = ref(false);

  const favoriteProducts = computed(() => products.value.filter(prod => favorites.value.has(prod.id)));

  function isFavourite(id) {
    return favorites.value.has(id);
  }

  function toggleFavorite(id) {
    const isFavourite = this.isFavourite(id);
    if (isFavourite) {
      favorites.value.delete(id);
    }
    else {
      favorites.value.add(id);
    }
  }
  async function loadFavorites() {
    isLoading.value = true;
    const response = await getProductsByIds(Array.from(favorites.value));
    products.value = response;
    isLoading.value = false;
  }
  function resetProducts() {
    products.value = [];
  }

  return {
    favorites,
    products,
    isLoading,
    favoriteProducts,
    isFavourite,
    toggleFavorite,
    loadFavorites,
    resetProducts,

  };
});

// export const useFavoritiesStore = defineStore('favoritiesStore', {
//   state: () => ({
//     favorites: new Set([]),
//     products: [],
//     isLoading: false,
//   }),
//   getters: {
//     favoriteProducts: state => state.products.filter(product => state.favorites.has(product.id)),
//   },
//   actions: {
//     isFavourite(id) {
//       return this.favorites.has(id);
//     },
//     toggleFavorite(id) {
//       const isFavourite = this.isFavourite(id);
//       if (isFavourite) {
//         this.favorites.delete(id);
//       }
//       else {
//         this.favorites.add(id);
//       }
//     },
//     async loadFavorites() {
//       this.isLoading = true;
//       const response = await getProductsByIds(Array.from(this.favorites));
//       this.products = response;
//       this.isLoading = false;
//     },
//     resetProducts() {
//       this.products = [];
//     },
//   },
// })
