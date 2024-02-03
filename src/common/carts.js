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
    console.log(Array.isArray(this.cartEntries),typeof this.cartEntries, this.cartEntries);
    if (Array.isArray(this.cartEntries)) {
      this.cartEntries.push(item);
      store.commit('addToCart', this.cartEntries);
    } else {
      console.error('customerCart is not an array');
    }
  }
}

const carts = new Carts();
export default carts;
