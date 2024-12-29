import { defineStore } from 'pinia';
import { getProductsByIds } from '../services/productServises'; // Adjust the import path as necessary

export const useFavoritiesStore = defineStore('favoritiesStore', {
  state: () => ({
    favorites: new Set([]),
    products: [],
    isLoading: false,
  }),
  getters: {
    favoriteProducts: state => state.products.filter(product => state.favorites.has(product.id)),
  },
  actions: {
    isFavourite(id) {
      return this.favorites.has(id);
    },
    toggleFavorite(id) {
      const isFavourite = this.isFavourite(id);
      if (isFavourite) {
        this.favorites.delete(id);
      }
      else {
        this.favorites.add(id);
      }
    },
    async loadFavorites() {
      this.isLoading = true;
      const response = await getProductsByIds(Array.from(this.favorites));
      this.products = response;
      this.isLoading = false;
    },
    resetProducts() {
      this.products = [];
    },
  },
});
