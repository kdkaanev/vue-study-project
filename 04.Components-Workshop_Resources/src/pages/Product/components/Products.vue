<script>
import { products } from '../../../constants/products';
import Categories from './Categories.vue';
import Productcard from './Productcard.vue';

export default {
  components: {
    Categories,
    Productcard,
  },
  data() {
    return {
      products,
      activeCategory: '',
    };
  },
  computed: {
    visibleProducts() {
      return this.activeCategory === '' ? products : products.filter(prod => prod.category === this.activeCategory);
    },
  },
  methods: {
    onSelect(value) {
      this.activeCategory = this.activeCategory === value ? '' : value;
    },
  },
};
</script>

<template>
  <div>
    <Categories :active="activeCategory" @select="onSelect" />
  </div>
  <div class="products">
    <Productcard
      v-for="prod in visibleProducts"
      :key="prod.title + prod.id" :product="prod"
    />
  </div>
</template>

<style scoped>
.products {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}
</style>
