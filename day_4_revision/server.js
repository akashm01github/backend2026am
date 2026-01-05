const express = require('express');
const connectDB = require('./src/db/db');
const noteModel = require('./src/model/note.model');
const { default: mongoose } = require('mongoose');

const app = express();

app.use(express.json());

connectDB();

app.get('/notes', async (req, res) => {
    const notes = await noteModel.find()

    res.json(notes)
})


app.post('/notes', async (req, res) => {
    const { title, desc } = req.body;

    await noteModel.create({
        title,
        desc
    })


    res.json({
        message: 'Notes Created Successfully'
    })
})



app.patch('/notes/:idx', async (req, res) => {
    const idx = req.params.idx;

    const { title } = req.body;

    await noteModel.findByIdAndUpdate({
        _id: idx
    }, {
        title: title
    })


    res.json({
        message:"Notes Updated Successfully"
    })
})



app.delete('/notes/:idx',async(req,res)=>{
        const idx = req.params.idx;

        await noteModel.findByIdAndDelete({
            _id:idx
        })

         res.json({
        message:"Notes Deleted Successfully"
    })
})


app.listen(3000, () => {
    console.log(`server is running on Port 3000.....`);
})