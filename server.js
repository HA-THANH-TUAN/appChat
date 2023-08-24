const server=require("./src/app")

const port= process.env.DEV_SERVER_PORT

server.listen(port,()=>{
    console.log("server run !")
})