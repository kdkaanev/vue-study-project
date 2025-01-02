<script>
import { useCartStore } from '../../../stores/useCartStore';
import { useFavoritiesStore } from '../../../stores/useFavoritiesStore';
import { useUserStore } from '../../../stores/useUserStore';

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
      userStore: useUserStore(),
      cartStore: useCartStore(),
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

    <button type="button" class="secondary outline" @click="cartStore.addToCart(product)">
      Add to cart 🛒
    </button>
    <button
      v-if="userStore.isUserLoged"
      type="button" class="contrast" :class="[isFavorite ? '' : 'outline']"
      @click="favoritiesStore.toggleFavorite(product.id)"
    >
      Favorite {{ isFavorite ? '💙' : '🤍' }}
    </button>
  </article>
</template>
