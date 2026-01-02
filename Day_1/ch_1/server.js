const http = require('http');


// Server Created 
const server = http.createServer((req,res)=>{
    res.end("Hello World Server is Running..");
}) 


// Server Start Line 
server.listen(3000,()=>{
    console.log('Server is Running on port 3000.....')
})