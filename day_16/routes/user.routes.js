const express = require('express');

const { getAllUser, getSingleUser, createNewUser, updateUserData, getUserDataInHTML } = require('../controllers/user.controller');

const router = express.Router();

//-----------------------------------------
//! ROUTES
//-----------------------------------------

//todo  GET USER DATA IN JSON FORMAT
router.get('/', getAllUser)


//todo GET USER DATA IN HTML FORMAT
router.get('/', getUserDataInHTML)

//todo GET SINGLE USER

router.get('/:id',getSingleUser)


//todo CREATE NEW USER
router.post('/',createNewUser)


//todo UPDATE DATA 

router.patch('/:id', updateUserData)


module.exports =router