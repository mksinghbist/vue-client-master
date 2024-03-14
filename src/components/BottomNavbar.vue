<template>
  <div id="app-shell" class="fixed bottom-0 w-full h-16 bg-primary flex justify-around items-center">
    <router-link exact to="/">
      <svg class="icon" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17h-2v-2h2v2zm0-4h-2v-5h2v5zm4 4h-3v-2h-2v-2h-2v-2h2V9c0-.56.45-1 1-1s1 .44 1 1v3h3v2h-3v2h3v2zm4-6h-2v2h2v-2z"/>
      </svg>
      <span class="icon-label">Home</span>
    </router-link>
    <router-link exact to="/shop">
      <svg class="icon" viewBox="0 0 24 24">
        <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 14H4V6h16v11z"/>
      </svg>
      <span class="icon-label">Shop</span>
    </router-link>
    <router-link class="cart-router-link" exact to="/checkout">
      <svg class="icon" enable-background="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path d="m337.034 420.796c.835.139 1.665.207 2.484.207 7.2 0 13.555-5.2 14.778-12.537l15-90c1.362-8.171-4.158-15.9-12.33-17.262-8.172-1.366-15.9 4.158-17.262 12.33l-15 90c-1.362 8.172 4.158 15.901 12.33 17.262z"/>
          <path d="m158.704 408.466c1.223 7.337 7.577 12.537 14.778 12.537.819 0 1.649-.067 2.484-.207 8.172-1.362 13.692-9.09 12.33-17.262l-15-90c-1.362-8.172-9.089-13.691-17.262-12.33-8.172 1.362-13.692 9.09-12.33 17.262z"/>
          <path d="m497 181h-52.791l-115.496-144.37c-5.174-6.467-14.613-7.518-21.083-2.342-6.469 5.175-7.518 14.614-2.342 21.083l100.503 125.629h-299.582l100.504-125.629c5.175-6.469 4.126-15.909-2.342-21.083-6.47-5.176-15.909-4.126-21.083 2.342l-115.497 144.37h-52.791c-8.284 0-15 6.716-15 15v60c0 8.284 6.716 15 15 15h18.686l56.892 199.121c1.839 6.44 7.725 10.879 14.422 10.879h302c6.697 0 12.583-4.439 14.423-10.879l56.891-199.121h18.686c8.284 0 15-6.716 15-15v-60c0-8.284-6.716-15-15-15zm-101.314 270h-279.372l-51.428-180h382.229zm86.314-210c-51.385 0-403.32 0-452 0v-30h452z"/>
          <path d="m256 421c8.284 0 15-6.716 15-15v-90c0-8.284-6.716-15-15-15s-15 6.716-15 15v90c0 8.285 6.716 15 15 15z"/>
        </g>
      </svg>
      <p class="icon-label">Cart</p>
      <span v-if="itemsInCart">{{itemsInCart}}</span>
    </router-link>
    <router-link exact to="/userDetails">
      <svg class="icon" viewBox="0 0 24 24">
        <path d="M20 17v1h-2v2h-1v-2h-2v-1h2v-2h1v2h2zm-9-4c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 6c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm8-11v2h-2v2h-2V7h-2V5h2V3h2v2h2zm-8 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8 12h-2v-2h-2v-2h2v-2h2v2h2v2h-2v2z"/>
      </svg>
      <span class="icon-label">User</span>
    </router-link>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  export default {
    components: {},
    computed: { 
      ...mapGetters(['itemsInCart']) 
    }
  };
</script>
  <style lang="scss" scoped>
  @import '../assets/sass/_variables.scss';
  #app-shell {
    position: fixed;
    left: 0px;
    bottom: -1px;
    height: 3.4rem;
    width: 100%;
    background: $colour-pri;
    font-size: 2rem;
    z-index: 20;
    display: flex;
    justify-content: space-around;
    align-items: center;
    svg {
      fill: #fff;
      margin: 0;
      width: 1.6rem;
      height: 1.6rem;
    }
    a {
      padding: 0.3rem 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #fff;
      text-decoration: none;
      &.router-link-active {
        background: darken($colour-pri, 100%);
        height: 100%;
        display: flex;
        padding: 0.3rem 1rem;
      }
      .icon-label {
        font-size: 0.7rem;
        font-weight: 600;
        margin-top: 5px;
        margin-bottom: 0;
        color: #fff;
      }
    }
    .cart-router-link {
      position: relative;
      span {
        position: absolute;
        top: 0px;
        right: 9px;
        color: #fff;
        font-size: 1rem;
        background: #000;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: 1px solid #fff;
      }
    }
  }
  @media (min-width: 765px) {
    #app-shell {
      display: none;
    }
  }
  </style>