const express = require('express');

const app = express();

let  notes = []

app.use(express.json());

// notes

app.post('/notes',(req,res)=>{
    notes.push(req.body);
    res.json({
        message:'Notes Added',
        notes:notes
    })
})


app.listen(3000,()=>{
    console.log(`Server is running on port 3000......`)
})