const  express = require('express');
const indexRoutes = require('./routes/index.routes');


const app = express();

app.use((req,res,next)=>{
    console.log('The MiddeWare Between APP and Route');
    next();
})

app.use('/',indexRoutes);

module.exports = app;