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
    const socket = new WebSocket(`wss://${process.env.VUE_APP_API_BASE_Notification}`);
    socket.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      this.notifications.push(newNotification);
    };
  }
};
</script>
