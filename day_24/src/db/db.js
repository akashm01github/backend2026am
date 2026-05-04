const mongoose = require("mongoose");


const connectDB = ()=>{
    mongoose.connect(process.env.MOGODB_URL)
    .then(()=>{
        console.log(`✅ DB is Connected`)
    })
}


module.exports = connectDB;
