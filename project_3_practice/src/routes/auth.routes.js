const express = require('express');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();

// ! REGISTER API

router.post('/register', async (req, res) => {
    const { userName, password } = req.body;


    const isUserExists = await userModel.findOne({
        userName: userName
    })

    if (isUserExists) {
        return res.status(409).json({
            message: 'User Exists Already'
        })
    }

    const user = await userModel.create({
        userName,
        password: await bcrypt.hash(password,10)
    })

    

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

    res.cookie('token',token);

    res.status(201).json({
        message: 'User Registered Successfully',
        user,
        token
    })

})


// ! LOGIN API

router.post('/login', async (req, res) => {
    const { userName, password } = req.body;

    const user = await userModel.findOne({
        userName: userName
    })

    if (!user) {
        return res.status(409).json({
            message: 'User Not Found.'
        })
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);



    if (!isPasswordValid) {
        return res.status(409).json({
            message: 'Password is incorrect.'
        })
    }


    const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY);

    res.cookie("token",token)


    res.status(201).json({
        message:'User Looged in',
        userName:user.userName
    })

    


})


module.exports = router;