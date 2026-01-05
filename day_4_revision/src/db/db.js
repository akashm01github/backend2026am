const mongoose = require("mongoose");


function connectDB(){
    mongoose.connect(`mongodb+srv://whoakashmukherjee_db_user:9pHvnIDPi7Xwa8FL@cluster0.2ekc6nf.mongodb.net/todos`)

    .then(()=>{
        console.log('Connected to DB......')
    })
}



module.exports = connectDB;