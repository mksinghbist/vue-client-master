<template>
  <div>
    <strong>Total order : {{ notifications.length }}</strong>
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
  mounted() {
    // Listen for 'newOrder' event
    // socket.on('newOrder', (data) => {
    //   this.notifications.push(data); // Update notifications array
    // });
  },
  beforeUnmount() { // Changed from beforeDestroy to beforeUnmount
    // Clean up socket event listener to prevent memory leaks
    //socket.off('newOrder');
  }
};
</script>
