import store from '../store';

class Carts {
  constructor() {
    // Initialize customerCart as an array or an empty array if undefined
    this.cartEntries = Array.isArray(store.state.customerCart.cartEntries) ? store.state.customerCart.cartEntries : [];

    // Optionally, make customerCart reactive
    store.watch(() => store.state.customerCart.cartEntries, (newVal) => {
      this.customerCart = Array.isArray(newVal) ? newVal : [];
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

    // Check if the product is found
    if (productIndex !== -1) {
      // Update the productQty
      this.cartEntries[productIndex].userEnterQty = newQty; 
      store.commit('addToCart', this.cartEntries);
    } else {
      console.error('Product not found in the cart.');
    }
  }
  getProduct(productId) {
    const product = this.cartEntries.find(entry => entry.productId === productId);
    return product?.userEnterQty ? product?.userEnterQty : 0;
  }
}

const carts = new Carts();
export default carts;
