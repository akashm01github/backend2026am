const express = require('express');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');


const router = express.Router();


// REGISTER API
router.post('/register',async(req,res)=>{
    const {userName,password} = req.body;

    const user = await userModel.create({
        userName,
        password
    })


    const token = jwt.sign({id:user.id},process.env.JWT_SECRET_KEY)

    res.cookie("token",token)


    res.status(201).json({
        message:'User Registered Successfully',
        user
    })

})



// LOGIN API
router.post('/login',async(req,res)=>{
    const {userName,password} = req.body;

    const user = await userModel.findOne({
        userName:userName
    })

    if(!user){
        return res.status(401).json({
            message:'User not Exists'
        })
    }

    const isPasswordValid = password === user.password

    if(!isPasswordValid){
        return res.status(401).json({
            message:'Password is not Valid'
        })
    }


    res.status(201).json({
        message:"user loggedin Successfully",
        user
    })


})


//GET USER API

router.get('/user',async(req,res)=>{
    const {token} = req.cookies;

    if(!token){
        res.status(201).json({
            message:"Unauthorized"
        })
    }

    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);

        const user = await userModel.findOne({
            _id:decode.id
        }).select("-password -__v")

        res.send(user)
    } catch (error) {
        console.log(232)
    }
   
})


module.exports = router;