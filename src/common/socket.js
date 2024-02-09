// import io from 'socket.io-client';

// let socket = null;
// let connectionAttempted = false;

// const connectSocket = () => {
//   // Check if a connection attempt has already been made
//   if (!connectionAttempted) {
//     // Attempt to establish the WebSocket connection
//     socket = io(process.env.VUE_APP_API_BASE_Notification, {
//       withCredentials: true,
//       reconnection: true, // Enable automatic reconnection
//       reconnectionDelay: 1000, // Initial delay before attempting to reconnect (1 second)
//       reconnectionDelayMax: 5000, // Maximum delay between reconnection attempts (5 seconds)
//       randomizationFactor: 0.5, // Randomization factor for reconnection attempts (50%)
//     });

//     // Set connectionAttempted flag to true to prevent subsequent attempts
//     connectionAttempted = true;

//     // Reset connectionAttempted after 5 minutes to allow for reconnection attempts
//     setTimeout(() => {
//       connectionAttempted = false;
//     }, 5 * 60 * 1000); // 5 minutes in milliseconds
//   }
// };

// // Connect socket when the module is imported
// connectSocket();

// export default socket;
