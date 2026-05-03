const express = require('express');


const router = express.Router();


// ROUTER LEVEL MIDDLEWARE


router.get('/',(req,res)=>{
    res.status(400).json({
        message:"Welcome to the Cohort"
    })
})

module.exports = router;

