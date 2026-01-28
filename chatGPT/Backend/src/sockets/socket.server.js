//-------------------------------
//! SOCKET.IO Initialization
//-------------------------------

const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../models/users.model");
const { generateResponse, generateVectors } = require("../services/Ai.Service");
const messageModel = require("../models/message.model");
const { createMemory, queryMemory } = require("../services/vector.service");



function initSocketServer(httpServer) {
    const io = new Server(httpServer, {});

    io.use(async (socket, next) => {
        const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
        if (!cookies.token) {
            next(new Error("Authentication Faild:No Token Provided"));
        }

        try {
            const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET_KEY);

            const user = await userModel.findById(decoded.id);

            socket.user = user

            next();

        } catch (error) {
            next(new Error("Authentication Faild:No Token Provided"));
        }
    })

    io.on("connection", (socket) => {
        socket.on("ai_message", async (message_payload) => {
            console.log("ai_message", message_payload)

            const [message, vectors] = await Promise.all([

                //! SAVING THE userMessage to the DB
                messageModel.create({
                    chat: message_payload.chat,
                    user: socket.user._id,
                    content: message_payload.content,
                    role: "user"
                }),

                //! CREATING VECTORS OF USER MESSAGE 
                generateVectors(message_payload.content),


            ])


            // ! CREATE MEMORY IN PINECONE
            await createMemory({
                vectors,
                messageId: message._id,
                metadata: {
                    chat: message_payload.chat,
                    user: socket.user._id,
                    text: message_payload.content
                }
            })


            // ! QUERY ON PINECONE AND MONGODB
            const [memory, chatHistory] = await Promise.all([
                queryMemory({
                    queryVector: vectors,
                    limit: 2,
                    metadata: {
                        user: socket.user._id
                    }
                }),

                messageModel.find({
                    chat: message_payload.chat
                })

            ])


            // ! SHORT TERM MEMORY
            const stm = chatHistory.map((item) => {
                return {
                    role: item.role,
                    parts: [{ text: item.content }]
                }
            });

            //! LONG TERM MEMORY 
            const ltm = [{
                role: 'user',
                parts: [{
                    text: `this is some previous from the chats use them to generate response 
                     ${memory.map(item => item.metadata.text).join("\n")}`
                }]
            }]


             // ! GENERATE AI RESPONSE USING LLM
            const response = await generateResponse([...ltm, ...stm]);

            console.log(response)

            socket.emit("ai_response", {
                content: response,
                chat: message_payload.chat
            })


            const [responseMessage, responseVectors] = await Promise.all([
                messageModel.create({
                    chat: message_payload.chat,
                    user: socket.user._id,
                    content: response,
                    role: "model"
                }),

                generateVectors(response)
            ])


            try {
                // ! SAVING THE RESPONSE IN PINECONE DATABASE
                await createMemory({
                    vectors: responseVectors,
                    messageId: responseMessage._id,
                    metadata: {
                        chat: message_payload.chat,
                        user: socket.user._id,
                        text: response
                    }
                })
                console.log("AI response saved to Pinecone successfully");
            } catch (error) {
                 console.error("Failed to save AI response to Pinecone:", error);
            }


        })
    })
}


module.exports = initSocketServer;