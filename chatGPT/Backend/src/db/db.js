const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('DataBase is Conneted........');
    } catch (error) {
        console.log("Error: ", error)
    }
}

module.exports = connectDB;
