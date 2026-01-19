require('dotenv').config()
const app = require("./src/app");

const { createServer } = require("http");
const { Server } = require("socket.io");
const generateResponse = require('./src/services/Ai.service');


const httpServer = createServer(app);
const io = new Server(httpServer, {
   cors: {
      origin: "http://localhost:5173", // Your React dev server
      methods: ["GET", "POST"]
   }
});

const chatHistory = [
   {
      role: "user",
      parts: [{ text: 'What is the Capital of India?' }]
   },
   {
      role: "model",
      parts: [
         {
            text: 'The capital of India is **New Delhi**.'
         }
      ]
   }
];


io.on("connection", (socket) => {
   console.log('A user Connected...')


   socket.on('disconnect', () => {
      console.log('A user is Disconnected.....')

   })


   //! AI MESSAGE  
   socket.on("ai_message", async (data) => {

      chatHistory.push({
         role: 'user',
         parts: [{ text: data }]
      })
      const response = await generateResponse(chatHistory);

      chatHistory.push({
         role: 'model',
         parts: [{ text: response }]
      })

      socket.emit("ai_message-response", { response })
   })
});


httpServer.listen(3000, () => {
   console.log(`Server is running on port 3000......`);

})