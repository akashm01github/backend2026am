require('dotenv').config();

const express = require('express');
const connectDB = require('./db/db');

const cookieParser = require('cookie-parser')

const path = require('path')


const urlRoutes = require('./routes/url.route');
const staticRoutes = require('./routes/static.route');
const userRoutes = require('./routes/user.route');
const { restrictToLoggedInUser } = require('./Middleware/auth.middleware');


const app = express();



//-------------------------------
//! MIDDLEWARE
//-------------------------------

app.use(express.json());

app.use(express.urlencoded({extended:false}));

app.set('view engine', 'ejs');


app.set('views', path.resolve('./views'));


app.use(express.static('public'));


app.use(cookieParser());



//-------------------------------
//! ROUTES
//-------------------------------




app.use('/url',restrictToLoggedInUser,urlRoutes)

app.use('/',staticRoutes)


app.use('/user',userRoutes);




//-------------------------------
//! DB CONNECTION
//-------------------------------

connectDB();




app.listen(3000,()=>{
    console.log(`Server is Runnig on Port 30000........`)
})