const { userModel } = require("../models/user.model");

const handleUserSignUp = async (req,res) => {
    const {userName,email,password} = req.body;

    await userModel.create({
        userName:userName,
        email:email,
        password:password
    })


    res.render('home')
}


module.exports = {
    handleUserSignUp
}