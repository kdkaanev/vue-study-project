import { defineStore } from 'pinia';

export const useCartStore = defineStore('cartStore', {
  state() {
    return {
      products: new Map(),
    };
  },
  actions: {
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
    changeQuantity(product, type) {
      const prod = this.products.get(product.id);
      if (!prod)
        return;
      if (type === 'increment') {
        prod.quantity += 1;
      }
      else {
        if (prod.quantity > 1) {
          prod.quantity -= 1;
        }
        else {
          this.removeFromCart(product.id);
        }
      }
    },

    removeFromCart(productId) {
      this.products.delete(productId);
    },

  },

});
