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
  async created() {
    const response = await getProductsByIds(Array.from(this.cartStore.products.keys()));
    this.products = response;
    this.isLoading = false;
  },
};
</script>

<template>
  <h1 style="text-align: center;">
    Cart
  </h1>
  <div class="container">
    <progress v-if="isLoading" />
    <article >
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
          <CartTableRow v-for="product in products" :key="product.id" :product="product"/>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3">
              Total:
            </td>
            <td class="price">
              $89
            </td>
          </tr>
        </tfoot>
      </table>
    </article>
  </div>
</template>
