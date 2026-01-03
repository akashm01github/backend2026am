const express = require('express');

const app = express();

app.use(express.json());

let notes = [];


// GET API
app.get("/",(req,res)=>{
    res.json(notes);
})


// POST API
app.post('/notes',(req,res)=>{
    console.log(req.body)
    notes.push(req.body);
    res.send({
        message:"Notes Created Successfully",
        notes:notes
    })
})


// DELETE API
app.delete('/notes/:idx',(req,res)=>{
    const index = req.params.idx;

    delete notes[index];

     res.send({
        message:"Notes Deleted Successfully",
    })
    
})


// UPDATE API
app.patch('/notes/:idx',(req,res)=>{
    const index = req.params.idx;
    const {title} = req.body;

    notes[index].title = title;

    res.json({
        messsage : "Note Updated Successfully"
    })
})

app.listen(3000,()=>{
    console.log("Server is Running on Port 3000.....")
})