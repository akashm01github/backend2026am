const express = require('express');
const userModel = require('../models/user.model');


const router = express.Router();



router.post('/register', async (req, res) => {
    const { userName, password } = req.body;

    const user = await userModel.create({
        userName,
        password
    })


    res.json({
        message: "user Registered",
        user
    })
})


router.post('/login', async (req, res) => {
    const { userName, password } = req.body;

    const user =await userModel.findOne({
        userName: userName
    })

    if (!user) {
        return res.json({
            message:"User Not Exists"
        })
    }

    const isValidPassword = password === user.password;

     if (!isValidPassword) {
        return res.json({
            message:"User Password is Incorrect"
        })
    }

    res.status(200).json({
        message:'User Logged in Successfully'
    })
})


module.exports = router;

