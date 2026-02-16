const mongoose = require('mongoose');

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log(`DB is Connectd...........`)

    } catch (error) {
        console.log(`Error is: ${error}`)
    }
}



module.exports = connectDB