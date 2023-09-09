const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routerAuthentication = require("./routes/authentication.route");
const routerUser = require("./routes/user.route")
const routerChat= require("./routes/chat.route")
const corsMain = require('./middlewares/cors.middleware,');
const verifyUser = require('./middlewares/verifyUser.middleware');
const { handleError } = require('./core/error.response');
const serviceSocketOI = require('./services/socket/index.socket');

require("./models/mongodb.model")

app.use(corsMain)
app.use(bodyParser.json())
app.use(cookieParser())

app.use("/authentication", routerAuthentication)

app.use(handleError(verifyUser)) // after authentication.

app.use("/chat",routerChat)

app.use("/", routerUser)

const server = http.createServer(app);

global._io = socketIo(server,{
  cors: {
    origin: '*', 
    methods: ['GET', 'POST'],
  },
});

serviceSocketOI(global._io)

app.use((err, req, res, next)=>{
    const status=err.status || 500
    const message=err.message ||  "Internal Server"
  console.log("App.use Error End:::", err)
  res.status(status).json({
    message: message,
    status: status
  })
})
module.exports = server


// module.exports = app