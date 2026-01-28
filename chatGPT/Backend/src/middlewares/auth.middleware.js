const jwt = require("jsonwebtoken");
const userModel = require("../models/users.model");


const authUser = async(req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(409).json({
            message: "Invalid User"
        })
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await userModel.findOne({
            _id: decode.id
        })

        req.user = user;

        next();

    } catch (error) {
        res.status(401).json({
            message: 'Unauthorized'
        })
    }



}


module.exports = {
    authUser
};