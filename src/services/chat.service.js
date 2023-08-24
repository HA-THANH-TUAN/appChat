// class Chat {
//     connection(socket){

        
//             console.log('A user connected', socket.id);
          
//             // Listen for messages from clients
//             socket.on('message', message => {
//               console.log("socket id:::",socket.id)
//               console.log('Message:', message);
//               // Broadcast the message to all connected clients
//               socket.emit('message', "OKE nef");
//             });
          
//             socket.on('disconnect', () => {
//               console.log('A user disconnected');
//             });
          
//     }
// }
// module.exports = new Chat()