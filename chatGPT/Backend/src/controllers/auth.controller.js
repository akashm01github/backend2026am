const jwt = require("jsonwebtoken");
const userModel = require("../models/users.model");

const bcrypt = require('bcryptjs');


async function registerController(req, res) {
    const { fullName: { firstName, lastName }, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({ email });

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: 'User Already Registered'
        })
    }

    const user = await userModel.create({
        fullName: { firstName, lastName },
        email,
        password: await bcrypt.hash(password, 10)
    })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY)

    res.cookie("token", token);


    res.status(200).json({
        message: "User Registerd Successfully",
        user: {
            email: user.email,
            id: user._id,
            fullName: user.fullName
        },
        token
    })
}


async function loginController(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email
    })

    if (!user) {
        return res.status(409).json({
            message: 'Invalid Email or Password'
        })
    }

    const isValidPasswrod = await bcrypt.compare(password, user.password)

    if (!isValidPasswrod) {
        return res.status(409).json({
            message: 'Invalid Password'
        })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

    res.cookie("token", token);


    res.status(201).json({
        message: 'User Successfully Loggedin',
        user: {
            email: user.email,
            id: user._id,
            fullName: user.fullName
        },
    })

    console.log("User Successfully Loggedin")


}

module.exports = {
    registerController,
    loginController
}