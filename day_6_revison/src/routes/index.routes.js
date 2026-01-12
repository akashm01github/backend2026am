const  express = require('express');



const router = express.Router();


router.use((req,res,next)=>{
    console.log('The MiddeWare Between Route and API');
    next();
})


router.get('/',(req,res)=>{
    res.send('Hello i am get Request.')
})


module.exports = router;

