<template>
  <div>
    <p v-for="notification in notifications" :key="notification.id">{{ notification.message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notifications: []
    };
  },
  created() {
    // Establish WebSocket connection
    const socket = new WebSocket('ws://localhost:8080');
    socket.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      this.notifications.push(newNotification);
    };
  }
};
</script>
