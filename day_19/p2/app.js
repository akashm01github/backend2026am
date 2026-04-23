const express = require('express');

const app = express();

app.use(express.json())

const notes = [];


app.get('/',(req,res)=>{
   res.send(notes)
})

app.post('/notes',(req,res)=>{
    notes.push(req.body)
    res.status(200).json({
        message:"Notes Created"
    })
})


app.listen(3000,()=>{
    console.log(`Server is Running on port 3000.......`)
})














// ! CREATE SERCER USING HTTP 
// const http = require('http');

// const server = http.createServer((req,res)=>{
//     res.end('Hello World')
// });


// server.listen(3000,()=>{
//     console.log(`Server is Running on port 3000.....`)
// })