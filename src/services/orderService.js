// // orderService.js
// import websocket from '@/common/socket';

// // Function to send order data to the backend
export function placeOrder(playload) {
    //socket.emit('order', orderData);
    console.log("I am orderData -->", playload);
    const orderData = {
        // construct your order data here
        // for example:
        id: Math.random().toString(36).substring(7), // generate a random ID
        message: playload,
        // other order properties...
      };
      console.log("I am orderData -->", orderData);
      
      // Emit the order data to the server
      // websocket.send(JSON.stringify(orderData));
}
