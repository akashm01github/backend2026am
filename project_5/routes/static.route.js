const express = require('express');


const router = express.Router();


router.get('/',(req,res)=>{
    return res.render('home',{ id: null })
})


// SIGN UP
router.get('/signup',(req,res)=>{
    return res.render('signup')
})


// SIGN UP
router.get('/login',(req,res)=>{
    return res.render('login')
})




module.exports = router;