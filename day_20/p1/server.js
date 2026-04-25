const express = require('express');

const app = express();

app.use(express.json());

const notes = [];

app.get('/',(req,res)=>{
    res.status(200).json({
        message:'Notes Fetched',
        notes
    })
})


app.post('/notes',(req,res)=>{
   notes.push(req.body);

    res.status(200).json({
        message:'Notes Created'
    })

})


app.listen(3000,()=>{
    console.log(`Server is Running on Port 3000......`)
})







//! SERVER USING HTTP
// const http = require('http');

// const app = http.createServer((req, res) => {
//     res.end("Hello World");
// })


// app.listen(3000, () => {
//     console.log('Server is Running on Port 3000.......');
// })