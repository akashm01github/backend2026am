const express =require('express');
const multer = require('multer');
const uploadFile = require('../service/storage.service');
const songModel = require('../models/song.model');

const router = express.Router();

const upload = multer({storage:multer.memoryStorage()})

router.post('/songs',upload.single('audio'),async(req,res)=>{


    const fileData = await uploadFile(req.file);

    const song = await songModel.create({
        title:req.body.title,
        artist:req.body.artist,
        mood:req.body.mood,
        audioUrl:fileData.url
    })

    console.log(fileData);

    res.json({
        message:"Song Created Successfully",
        song:song
    })
})


router.get('/songs',async(req,res)=>{
    const {mood} = req.query;

    const songs = await songModel.find({
        mood:mood
    })

    res.json({
        message:"Songs Fetched Successfully",
        songs:songs
    })
})
module.exports = router;