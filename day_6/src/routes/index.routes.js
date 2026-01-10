const express = require('express');

const router = express.Router();


// MIIDDLEWARE
router.use((req,res,next)=>{
    console.log('This middleware in betwwen router and API');
    // next();
})

router.get('/',(req,res)=>{
    res.json({
        message:"Welcome to API"
    })
})

module.exports = router;

