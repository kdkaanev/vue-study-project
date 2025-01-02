import { defineStore } from 'pinia';

export const useCartStore = defineStore('cartStore', {
  state() {
    return {
      products: new Map(),
    };
  },
  actions: {
    removeFromCart(productId) {
      this.products.delete(productId);
    },

    addToCart(product) {
      if (this.products.has(product.id)) {
        const prod = this.products.get(product.id);
        if (prod) {
          prod.quantity += 1;
        }
      }
      else {
        this.products.set(product.id, {
          id: product.id,
          quantity: 1,
        });
      }
    },
    changeQuantity(product, newQuantity) {
      const prod = this.products.get(product.id);
      if (!prod)
        return;
      if (newQuantity > 0) {
        prod.quantity = newQuantity;
      }
      else {
        this.removeFromCart(product.id);
      }
    },
  },

});
