require('dotenv').config();

const http = require('http');

const app = require("./src/app");
const connectDB = require('./src/db/db');

const initSocketServer = require('./src/sockets/socket.server');



//-------------------------------
//! INITIALIZE SOCKET.IO
//-------------------------------
const httpServer = http.createServer(app);

initSocketServer(httpServer);



//-------------------------------
//! STARTING DATA BASE
//-------------------------------

connectDB();



//-------------------------------
//! STARTING SERVER
//-------------------------------
httpServer.listen(3000,()=>{
    console.log(`Server is Running on Port 3000......`);
})