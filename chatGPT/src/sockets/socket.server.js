//-------------------------------
//! SOCKET.IO Initialization
//-------------------------------

const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../models/users.model");
const generateResponse = require("../services/Ai.Service");
const messageModel = require("../models/message.model");



function initSocketServer(httpServer){
    const io = new Server(httpServer,{});

    io.use(async(socket,next)=>{
        const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
        if(!cookies.token){
            next(new Error("Authentication Faild:No Token Provided"));
        }

        try {
            const decoded = jwt.verify(cookies.token,process.env.JWT_SECRET_KEY);

            const user = await userModel.findById(decoded.id);

            socket.user = user

            next();
            
        } catch (error) {
            next(new Error("Authentication Faild:No Token Provided"));
        }
    })

    io.on("connection",(socket)=>{
        socket.on("ai_message",async(message_payload)=>{
            console.log("ai_message",message_payload)

           

            await messageModel.create({
                chat:message_payload.chat,
                user:socket.user._id,
                content:message_payload.content,
                role:"user"
            })

            const chatHistory = await messageModel.find({
                chat:message_payload.chat
            })

            

            const response = await generateResponse(chatHistory.map((item)=>{
                    return {
                        role:item.role,
                        parts:[{text:item.content}]
                    }
            }));


             await messageModel.create({
                chat:message_payload.chat,
                user:socket.user._id,
                content:response,
                role:"model"
            })

            socket.emit("ai_response",{
                content:response,
                chat:message_payload.chat
            })
        })
    })
}


module.exports = initSocketServer;