<script>
import { products } from '../../../constants/products';
import { getAllProducts } from '../../../services/productServises';
import Categories from './Categories.vue';
import Productcard from './Productcard.vue';

export default {
  components: {
    Categories,
    Productcard,
  },
  data() {
    return {
      activeCategory: '',
      isLoading: true,
      products: [],
    };
  },
  computed: {
    visibleProducts() {
      return this.activeCategory === '' ? this.products : products.filter(prod => prod.category === this.activeCategory);
    },
  },
  async created() {
    this.products = await getAllProducts();
    this.isLoading = false;
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
  <progress v-if="isLoading" />
  <div v-else-if="visibleProducts.lenght > 0" class="products">
    <Productcard v-for="prod in visibleProducts" :key="prod.title + prod.id" :product="prod" />
  </div>
</template>

<style scoped>
.products {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}
</style>
