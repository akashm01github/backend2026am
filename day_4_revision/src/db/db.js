const mongoose = require("mongoose");


function connectDB(){
    mongoose.connect(``)

    .then(()=>{
        console.log('Connected to DB......')
    })
}



module.exports = connectDB;