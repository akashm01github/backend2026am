
const mongoose  = require("mongoose");



function connectDB(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log(`Connected to DataBase....`)
    })
}


module.exports = connectDB;