const express = require('express');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { registerContoller, loginController } = require('../controllers/auth.controller');


const router = express.Router();


router.post('/register', registerContoller);
router.post('/login', loginController);


module.exports = router;