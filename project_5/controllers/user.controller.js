const userModel = require("../models/user.model");

const { v4: uuidv4 } = require('uuid');
const { setUser } = require("../service/auth.service");

const handleUserSignUp = async (req, res) => {
    const { userName, email, password } = req.body;

    await userModel.create({
        userName,
        password,
        email
    })


    return res.redirect('/')
}



const handelUserLogin = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email: email,
        password: password
    })

    if (!user) {
        return res.render('login')
    }


    const token = setUser(user);

    res.cookie("uid", token);

    return res.redirect('/')
}


module.exports = { handleUserSignUp, handelUserLogin }