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
    const socket = new WebSocket('wss://nice-pear-swallow-hat.cyclic.app');
    socket.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      this.notifications.push(newNotification);
    };
  }
};
</script>
