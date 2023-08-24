const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const bodyParser = require('body-parser');

const routerAuthentication = require("./routes/authentication.route");
const routerUser = require("./routes/user.route")
const corsMain = require('./middlewares/cors.middleware,');
const verifyUser = require('./middlewares/verifyUser.middleware');
const { handleError } = require('./core/error.response');
require("./configs/redis.config")
const chatService= require("./services/chat.service")



require("./models/mongodb.model")


app.use(corsMain)
app.use(bodyParser.json())
app.use("/authentication", routerAuthentication)

app.use(handleError(verifyUser)) // after authentication.
// app.use((req, res, next) => {
//   console.log('Time:', Date.now())
  
//   next()
// })
// app.use(async(req, res, next) => {
//   console.log("after")
//   next()
// })


app.use("/", routerUser)

const server = http.createServer(app);

global._io = socketIo(server,{
  cors: {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'],
  },
});

global._io.use(async(socket, next)=>{
  console.log("use Socket nè")
  // const sessionID = socket.handshake.auth.sessionID
  
  // console.log("socket:::",socket)
  next()
  
} );



global._io.on('connection', async(socket)=>{
  
  // console.log("this is Socket id :::", socket.id)
  // console.log("this is List Socket:::", socket.client.sockets.keys())
  // console.log("global io:: list Keys",global._io.sockets.sockets.keys())
  // console.log("global io Map Socket::",global._io.sockets.sockets)
  
  socket.on("disconnect", (reason) => {
    if (reason === "io server disconnect") {
      // the disconnection was initiated by the server, you need to reconnect manually
      // console.log("disconnect===> if")
      socket.connect();
    }
    // console.log("disconnect===>Id out: ", reason)
    // else the socket will automatically try to reconnect
  });
  
  // socket.on(("message", (stream)=>{
  //   console.log("mesage ======>>>", stream)
  // }))
  
  // socket.on(("disconnect", ()=>{
    //   console.log("disconnect ======>>>")
    // }))
    
    
    
  });
  
  
  
  app.use((err, req, res, next)=>{
    
    const status=err.status || 500
    const message=err.message ||  "Internal Server"
  console.log("App.use End:::", err)

  res.status(status).json({
    message: message,
    status: status
  })

})


module.exports = server


// module.exports = app