const server=require("./src/app")

const port= process.env.DEV_SERVER_PORT || 3003

console.log(port, typeof port)

server.listen(port,()=>{
    console.log("server run !")
})