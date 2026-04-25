const express = require('express');
const connectDB = require('./db/db');
const noteModel = require('./model/notes.model');

const app = express();

app.use(express.json());


const notes = [];

connectDB();

app.get('/', async (req, res) => {
    const notes = await noteModel.find();
    res.status(200).json({
        message: 'Notes Fetched',
        notes
    })
})

//! CREATE
app.post('/notes', async (req, res) => {
    const { title, content } = req.body;

    await noteModel.create({
        title,
        content
    })

    res.status(200).json({
        message: 'Notes Created',
        notes
    })
})


//! UPDATE
app.patch('/notes/:id', async (req, res) => {
    const { id } = req.params;

    const { title } = req.body;

    await noteModel.findByIdAndUpdate({
        _id: id
    }, {
        title: title
    })


    res.status(200).json({
        message: 'Notes Update'
    })
})




//! DELETE
app.delete('/notes/:id', async(req, res) => {
    const { id } = req.params;


    await noteModel.findByIdAndDelete({
        _id:id
    })
    

    res.status(200).json({
        message: 'Notes Deleted'
    })

})


app.listen(3000, () => {
    console.log(`Server is Running on Port 3000........`)
})

