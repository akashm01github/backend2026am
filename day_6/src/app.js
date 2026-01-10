const express = require('express');
const indexRoutes = require('./routes/index.routes');

const app = express();


// MIIDDLEWARE
app.use((req,res,next)=>{
    console.log('This middleware in betwwen app and Route');
    next();
})

app.use('/',indexRoutes);



module.exports = app;

