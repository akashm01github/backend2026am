const express = require('express');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');


const router = express.Router();




// REGISTER API 

router.post('/register', async (req, res) => {
    const { userName, password } = req.body;

    const user = await userModel.create({
        userName,
        password
    })


    const token = jwt.sign({
        id:user.id
    },process.env.JWT_SECRET)


    res.cookie('token',token);

    res.status(201).json({
        message: "user Registered",
        user
    })
})



// LOGIN API 
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

    res.status(201).json({
        message:'User Logged in Successfully'
    })
})



router.get('/user',async(req,res)=>{
    const {token} = req.cookies;

    if(!token){
        res.status(401).json({
            message:'Unauthorized'
        })
    }

    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findOne({
            _id:decode.id
        }).select("-password")

        res.send(user)


    } catch (error) {
        return res.status(401).json({
            message:"Invalid Token"
        })
    }

})

module.exports = router;

