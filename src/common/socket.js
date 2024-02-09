import io from 'socket.io-client';

let socket = null;
let connectionAttempted = false;

const connectSocket = () => {
  if (!connectionAttempted) {
    // Attempt to establish the WebSocket connection
    socket = io(process.env.VUE_APP_API_BASE_Notification, {
        withCredentials: true,
    });

    // Set connectionAttempted flag to true to prevent subsequent attempts
    connectionAttempted = true;

    // Reset connectionAttempted after 5 minutes to allow for reconnection
    setTimeout(() => {
      connectionAttempted = false;
    }, 30 * 60 * 1000); // 5 minutes in milliseconds
  }
};

// Connect socket when the module is imported
connectSocket();

export default socket;
