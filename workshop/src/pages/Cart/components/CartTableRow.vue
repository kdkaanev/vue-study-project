<script>
import { useCartStore } from '../../../stores/useCartStore';

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {
      cartStore: useCartStore(),
    };
  },
  computed: {
    quantity() {
      return this.cartStore.products.get(this.product.id).quantity;
    },
    totalPrice() {
      return (this.product.price * 100) / 100 * this.quantity;
    },
  },
  methods: {
    onQuantityChange(event) {
      this.cartStore.changeQuantity(this.product.id, Number.parseInt(event.target.value, 10));
    },
  },
};
</script>

<template>
  <tr>
    <td>
      <div style="aspect-ratio: 1/1; width: 5rem; border-radius: 0.5rem; overflow: hidden;">
        <img
          style="object-fit: cover; width: 100%; height: 100%;"
          :src="product.images[0]"
          :alt="product.images.title"
        >
      </div>
    </td>
    <td>
      <p style="font-size: 1.25rem;">
        {{ product.images.title }}
      </p>
      <p style="font-size: 0.75rem;">
        Product price:{{ product.price }}$
      </p>
    </td>
    <td>
      <input type="number" min="0" value="quantity" style="width: 5rem;" @change="onQuantityChange">
    </td>
    <td class="price">
      {{ totalPrice }}$
    </td>
    <td class="price">
      <button
        type="button"
        class="secondary outline"
        @click="cartStore.removeFromCart(product.id)"
      >
        🗑️
      </button>
    </td>
  </tr>
</template>
