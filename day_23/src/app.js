const express = require('express');
const indexRoutes = require('./routes/index.routes');


const app = express();

// APP LEVEL MIDDLEWARE 

app.use((req,res,next)=>{
    console.log(`This Middleware is Between App and Route`);
    next();
})

app.use('/', indexRoutes)

module.exports = app;

