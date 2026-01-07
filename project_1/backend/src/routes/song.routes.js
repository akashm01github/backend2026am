const express =require('express');
const multer = require('multer');
const uploadFile = require('../service/storage.service');

const router = express.Router();

const upload = multer({storage:multer.memoryStorage()})

router.post('/songs',upload.single('audio'),async(req,res)=>{


    const fileData = await uploadFile(req.file);

    console.log(fileData);

    res.json({
        message:"Song Created Successfully",
        song:req.body
    })
})

module.exports = router;