const express = require('express');


// server is Creating Here
const app = express();


app.get('/',(req,res)=>{
    res.send("Welcome To Home Page");
})

app.get('/about',(req,res)=>{
    res.send("Welcome To About Page");
})

// Server is Start
app.listen(3000,()=>{
    console.log('Server is running on port 3000....');
})