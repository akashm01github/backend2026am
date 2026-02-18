const mongoose = require("mongoose");


const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },

    redirectUrl: {
        type: String,
        required: true,
    }
}, { timestamps: true })


const urlModel =  mongoose.model('urls',urlSchema);

module.exports  = {
    urlModel
}