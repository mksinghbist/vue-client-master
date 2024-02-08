<template>
  <div>
    <strong>Total order : {{ notifications.length }}</strong>
    <p v-for="notification in notifications" :key="notification.id">{{ notification.message }}</p>
  </div>
</template>

<script>
import io from 'socket.io-client';
export default {
  data() {
    return {
      socket: null,
      notifications: []
    };
  },
  created() {
    // Establish WebSocket connection
    this.socket = io('http://localhost:3000'); // Adjust URL as per your server

    // Listen for newOrder event
    this.socket.on('newOrder', (data) => {
      // Handle new order data
      console.log('New order received:', data);
      this.notifications.push(data); // Add new order to the orders array
    });
  },
  unmounted() {
    // Close WebSocket connection when component is unmounted
    this.socket.disconnect();
  }
};
</script>
