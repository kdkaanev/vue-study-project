<script>
import { useFavoritiesStore } from '../../../stores/useFavoritiesStore';

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {
      favoritiesStore: useFavoritiesStore(),
    };
  },
  computed: {
    isFavorite() {
      return this.favoritiesStore.isFavourite(this.product.id);
    },
  },
};
</script>

<template>
  <article>
    <img :src="product.images" :alt="product.title">
    <h2>{{ product.title }}</h2>
    <p>{{ product.description }}</p>
    <p><b>Price</b>: {{ product.price }}</p>
    <footer>
      <button type="button" class="secondary outline">
        Add to cart 🛒
      </button>
      <button type="button" class="contrast" :class="[isFavorite ? '' : 'outline']"
        @click="favoritiesStore.toggleFavorite(product.id)">
        Favorite {{ isFavorite ? '💙' : '🤍' }}
      </button>
    </footer>
  </article>
</template>
