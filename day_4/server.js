const express = require('express');
const connectDB = require('./src/db/db');
const noteModel = require('./src/models/note.model');

const app = express();

app.use(express.json());

connectDB();



app.get('/notes', async (req, res) => {
    const notes = await noteModel.find();

    res.json({
        message: "Note Fetched Successfully.",
        notes
    })

})




app.post('/notes', async (req, res) => {
    const { title, content } = req.body;

    await noteModel.create({
        title,
        content
    })

    res.json({
        message: "Note Created Successfully."
    })
})



app.patch('/notes/:idx', async (req, res) => {
    const idx = req.params.idx;

    const { title } = req.body;

    noteModel.findByIdAndUpdate({
        _id: idx
    }, {
        title: title
    })


     res.json({
        message: "Note Updated Successfully.",
        notes
    })
})


app.delete('/notes/:idx',async(req,res)=>{
    const idx = req.params.idx;

    await noteModel.findByIdAndDelete({
        _id:idx
    })


     res.json({
        message: "Note Deleted Successfully.",
    })
})

app.listen(3000, () => {
    console.log('Server is Running on port 3000.....')
})