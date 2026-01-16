const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

async function authMiddleware(req, res,next){

    const {token}  = req.cookies;

    if (!token) {
        return res.status(409).json({
            message: 'Unauthorized'
        })
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await userModel.findOne({
            _id: decode.id
        })

        req.user = user
        
        next();

    } catch (error) {
        return res.status(401).json({
            message: 'Invalid token, Please login again.'
        })
    }

}

module.exports = authMiddleware;

