const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
async function registerContoller(req, res) {
    const { userName, password } = req.body;


    const existingUser = await userModel.findOne({
        userName: userName
    })

    if (existingUser) {
        return res.status(409).json({
            message: "User Already Registered",
        })
    }
    

    const user = await userModel.create({
        userName,
        password: await bcrypt.hash(password,10)
    })


    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);

    res.cookie("token", token)


    res.status(201).json({
        message: "User Successfully Registered.",
        user,
        token
    })

}


async function loginController(req, res) {
    const { userName, password } = req.body;

    const user = await userModel.findOne({
        userName
    })

    if (!user) {
        return res.status(400).json({
            message: "User Not Found."
        })
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "PassWord is Not Valid."
        })
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);

    res.cookie(token);

    res.status(200).json({
        message: "User Logged in Successfully.",
        userName:user.userName
    })
}

module.exports = {
    registerContoller,
    loginController
}