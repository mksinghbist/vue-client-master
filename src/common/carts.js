import store from '../store';

class Carts {
  constructor() {
    // Initialize cartEntries from Vuex state or local storage
    this.cartEntries = store.state.customerCart.cartEntries || JSON.parse(localStorage.getItem('customerCart')) || [];

    // Watch for changes in Vuex state and update cartEntries accordingly
    store.watch(() => store.state.customerCart.cartEntries, (newVal) => {
      this.cartEntries = newVal;
      this.updateLocalStorage();
    });
  }

  updateLocalStorage() {
    console.log(this.cartEntries);
    localStorage.setItem('customerCart', JSON.stringify(this.cartEntries));
  }

  addToCart(item) {
    if (Array.isArray(this.cartEntries)) {
      this.cartEntries.push(item);
      store.commit('addToCart', this.cartEntries);
      this.updateLocalStorage();
    } else {
      console.error('customerCart is not an array');
    }
  }

  updateQty(productId, newQty) {
    const productIndex = this.cartEntries.findIndex(entry => entry.productId === productId);

    if (productIndex !== -1) {
      this.cartEntries[productIndex].userEnterQty = newQty;
      store.commit('addToCart', this.cartEntries);
      this.updateLocalStorage();
    } else {
      console.error('Product not found in the cart.');
    }
  }

  getProductUserEnterQty(productId) {
    const product = this.cartEntries.find(entry => entry.productId === productId);
    return product?.userEnterQty || 0;
  }

  removeProductCarts(productId) {
    try {
      const productIndex = this.cartEntries.findIndex(entry => entry.productId === productId);
      if (productIndex !== -1) {
        this.cartEntries.splice(productIndex, 1);
        store.commit('addToCart', this.cartEntries);
        this.updateLocalStorage();
      }
    } catch (error) {
      console.error('Product not found in the cart.', error);
    }
  }
}

const carts = new Carts();
export default carts;
