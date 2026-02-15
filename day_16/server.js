require('dotenv').config()
//-----------------------------------------
//! MODULES
//-----------------------------------------
const fs = require('fs');

const express = require('express');

const usersData = require('./MOCK_DATA.json')


const connectDB = require('./db/db');

const userRoutes = require('./routes/user.routes');


const app = express();


//-----------------------------------------
//! MIDDLEWARE 
//-----------------------------------------
app.use(express.json())

app.use(express.urlencoded({ extended: true }))


// app.use((req,res,next)=>{
//     console.log('Hello')
//     next()
// })

connectDB()

app.use('/users',userRoutes)



// ! START THE SERVER

app.listen(3000, () => {
    console.log(`Server is Running on Port 3000......`)
})