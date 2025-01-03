<script>
import { getProductsByIds } from '../../services/productServises';
import { useCartStore } from '../../stores/useCartStore';
import CartTableRow from './components/CartTableRow.vue';

export default {
  components: {
    CartTableRow,
  },
  setup() {
    return {
      cartStore: useCartStore(),
    };
  },
  data() {
    return {
      products: [],
      isLoading: true,
    };
  },
  computed: {
    totalPrice() {
      const total = this.products.reduce((acc, product) => {
        const quantity = this.cartStore.products.get(product.id).quantity;
        return acc + product.price * quantity;
      }, 0);
      return Math.round(total * 100) / 100;
    },
  },
  async created() {
    const response = await getProductsByIds(Array.from(this.cartStore.products.keys()));
    this.products = response;
    this.isLoading = false;
  },
  methods: {
    onDelete(productId) {
      this.products = this.products.filter(prod => prod.id !== productId);
      this.cartStore.removeFromCart(productId);
    },
  },
};
</script>

<template>
  <h1 style="text-align: center;">
    Cart
  </h1>
  <div class="pageContainer">
    <progress v-if="isLoading" />
    <article>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <CartTableRow v-for="product in products" :key="product.id" :product="product" @delete="onDelete(product.id)" />
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3">
              Total:
            </td>
            <td class="price">
              {{ totalPrice }}$
            </td>
          </tr>
        </tfoot>
      </table>
    </article>
  </div>
</template>

<style scoped>
.pageContainer {
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

}
article {
  width: 600pxs;
  
}
</style>
