const express = require('express');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');


const router = express.Router();


router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const user = await userModel.create({
        username,
        password
    })

    
    const token = jwt.sign({
        id:user.id
    },process.env.JWT_SECRET);


    res.cookie("token",token);

    res.status(200).json({
        message: "User Registred Successfully",
    })
})


router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await userModel.findOne({
        username
    })

    if (!user) {
        return res.status(400).json({
            message: "User Not Found",
        })
    }

    const isPasswordValid = password == user.password

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Password is Incorrect",
        })
    }
    res.status(200).json({
        message: "User Successfully Loggedin",
        user
    })
})


router.get('/user',async(req,res)=>{
    const {token} = req.cookies;


    if(!token){
        res.status(401).send({
            message:"UnAuthorized",
        })
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findOne({
            _id:decode.id
        }).select("-password")

        res.send(user)

        console.log(user)
    } catch (error) {
        throw error
    }
})


module.exports = router;