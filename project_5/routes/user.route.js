const express = require('express');
const { handleUserSignUp, handelUserLogin } = require('../controllers/user.controller');


const router = express.Router();


// SIGN UP ROUTE
router.post('/signup',handleUserSignUp)


// LOGIN
router.post('/login',handelUserLogin)



module.exports = router;