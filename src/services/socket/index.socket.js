const jwt =require("jsonwebtoken");
const conversationModel = require("../../models/conversation..model");
const client = require("../../models/redis.model");
const MessageModel = require("../../models/message.model")
const algorithmRefreshToken= process.env.DEV_ALIGORITHM_REFRESHTOKEN
const serviceSocketOI = (io)=>{
    
  io.use(async(socket, next)=>{
    
    socket.id=undefined
    console.log("-----------user IO" ,socket.handshake.auth)
    try {
      const access_token = socket.handshake.auth.access_token
      // console.log("++++>",access_token?.length)
      if(!access_token){
        console.log("error io not find tokens==>",)
        // next(new Error("error auth !")) 
      }
      const resultDecode= jwt.decode(access_token)

      console.log(resultDecode)
      const publickey = await client.hGet(`tokens:${resultDecode.id}:${resultDecode.deviceId}`, "publicKey")

      if(publickey=== null){
        // check refeshe token
        console.log("error io not find public==>",)
        // next(new Error("error auth !")) 
      }

      console.log("algorithmRefreshToken",algorithmRefreshToken)
      const resultVerify=jwt.verify(access_token, publickey,{algorithms:["PS256"]} )
      // socket.id=resultDecode.id
      // console.log("resultVerify:::",resultVerify)
      socket.id=resultVerify.id
      next()
      console.log("next==>")
    } catch (error) {
      console.log("error io catch==>",error)
      // next(new Error("error auth !")) 
    }

  } );
  
  
  
  io.on('connection', async(socket)=>{
    console.log("connection nha !!! " ,socket.id)
    if(socket.id){
      // Add conversation ..... start
      const resultCoversationsBd = await conversationModel.find({
        members: {
            $elemMatch: { userId: socket.id }
          }
        },"-__v -name -order -statusConversation -type -members").lean()
        const listRoomId = resultCoversationsBd.map((conversation)=>(conversation._id.toString()))
        console.log("Số lượng cuộc trò chuyện:::",listRoomId.length    )
        listRoomId.forEach(roomId => {
          socket.join(roomId)
          // socket.to(roomId).emit("active", socket.id)
        });
        // ------------------------------------------------------
        // const rooms  = io.sockets.adapter.rooms

        // console.log("rooms::::",rooms)
  

        // ------------------------------------------------------
      // Add conversation ..... end

    } 
    socket.on("requestCall", async({sessionRTC, roomId})=>{
      if(sessionRTC){
        console.log("server receive sessionRTC",sessionRTC)
        console.log("server receive roomId",roomId)
        socket.to(roomId).emit("requestCall", {
          sessionRTC:sessionRTC
        })
      }

    })
        
        
        
        
        // console.log("this is Socket id :::", socket.id)
        // console.log()
        // console.log()
        // console.log("==>item socket:::", {id: socket.id, keySocket:socket.client.sockets.keys()})
    // console.log()
    // console.log("==>keys socket:::",io.sockets.sockets.keys())
    // console.log()
    
    // console.log()
    // console.log("==>rooms:::",io.sockets.adapter.rooms)

    
    socket.on("message", async ({roomId, message ,user:{id,name}})=>{
      try {
        const resultInsert= await MessageModel.create({
          conversationId:roomId,
          senderId:socket.id,
          message:{
            content: message,
          }
        })
        // console.log("==> rooms:::",io.sockets.adapter.rooms)
        console.log(`message from ${socket.id}`, message )

        io.to(socket.id).emit('responseSendMessage', resultInsert )

        socket.to(roomId).emit("message",resultInsert)

      } catch (error) {
        console.log("tin nhan khong hop le nha ! ") 
      }
    })
    
    socket.on("disconnect", (reason) => {
      if (reason === "io server disconnect") {
        // the disconnection was initiated by the server, you need to reconnect manually
        // console.log("disconnect===> if")
        socket.connect();
  
      }
      console.log("==> disconnect rooms:::",io.sockets.adapter.rooms)
      console.log("disconnect===>Id out: ", socket.id)
      // else the socket will automatically try to reconnect
    });
    
    // socket.on(("message", (stream)=>{
      //   console.log("mesage ======>>>", stream)
      // }))
      
      // socket.on(("disconnect", ()=>{
        //   console.log("disconnect ======>>>")
        // }))
        
        
        
      });
      
      
      
} 

module.exports =serviceSocketOI