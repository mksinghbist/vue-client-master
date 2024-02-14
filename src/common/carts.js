import store from '../store';

class Carts {
  constructor() {
    // Initialize customerCart as an array or an empty array if undefined
    this.cartEntries = Array.isArray(store.state.customerCart.cartEntries) ? store.state.customerCart.cartEntries : [];

    // Optionally, make customerCart reactive
    store.watch(() => store.state.customerCart.cartEntries, (newVal) => {
      this.customerCart = Array.isArray(newVal) ? newVal : [];
    });
    store.watch(() => store.state.isAuthenticated, (newUser, oldUser) => {
      if (newUser !== oldUser) {
          // Reset cartEntries when the user changes
          this.cartEntries = Array.isArray(store.state.customerCart.cartEntries) ? store.state.customerCart.cartEntries : [];
      }
  });
  }

  addToCart(item) {
    if (Array.isArray(this.cartEntries)) {
      this.cartEntries.push(item);
      store.commit('addToCart', this.cartEntries);
    } else {
      console.error('customerCart is not an array');
    }
  }
  updateQty(productId,newQty) {
    const productIndex = this.cartEntries.findIndex(entry => entry.productId === productId);

    if (productIndex !== -1) {
      this.cartEntries[productIndex].userEnterQty = newQty; 
      store.commit('addToCart', this.cartEntries);
    } else {
      console.error('Product not found in the cart.');
    }
  }
  getProductUserEnterQty(productId) {
    const product = this.cartEntries.find(entry => {
      return entry.productId == productId
    });
    return product?.userEnterQty ? product?.userEnterQty : 0;
  }
  removeProductCarts(productId) {
    try {
      const productIndex = this.cartEntries.findIndex(entry => entry.productId === productId);
      if (productIndex !== -1) {
        this.cartEntries.splice(productIndex, 1);
        store.commit('addToCart', this.cartEntries);
      }
    } catch(error) {
      console.error('error not found in the cart.', error);
    }
  }

}

const carts = new Carts();
export default carts;
