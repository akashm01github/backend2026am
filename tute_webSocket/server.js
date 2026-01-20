const http = require("http")

const express = require('express');

const { Server } = require("socket.io");




const app = express();

const server = http.createServer(app);

//---------------------------------
//!  HANDEL THE SOCKETS 
//---------------------------------
const io = new Server(server)

io.on("connection",(socket)=>{
    console.log('A new User has Connected',socket.id)


    socket.on("user_message",(message)=>{
        console.log("A user Message:",message)

        io.emit("message",message)
    })
})



//---------------------------------
//!  HANDEL THE HTTP REQUEST
//---------------------------------
app.use(express.static("./public"))

app.get('/',(req,res)=>{
    return res.send('./public/index.html')
})

server.listen(9000,()=>{
    console.log('Server is running on port 9000.....');
})


