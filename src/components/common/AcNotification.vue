<template>
  <div>
    <strong>Total order : {{ notifications.length }}</strong>
    <p v-for="notification in notifications" :key="notification.id">{{ notification.message }}</p>
  </div>
</template>

<script>
import socket from '@/common/socket'; 

export default {
  data() {
    return {
      notifications: []
    };
  },
  mounted() {
    this.connectSocket();
  },
  methods: {
    connectSocket() {
      // Establish WebSocket connection
      socket.connect();
      
      // Listen for 'newOrder' events and update notifications array
      socket.on('newOrder', (data) => {
        this.notifications.push(data);
      });
    },
    disconnectSocket() {
      // Disconnect WebSocket connection when component is unmounted
      socket.disconnect();
    }
  },
  beforeUnmount() {
    this.disconnectSocket();
  }
};
</script>
