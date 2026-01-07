const mongoose = require('mongoose');

const songSchema = mongoose.Schema({
    title:String,
    artist:String,
    audioUrl:String
})

const songModel = mongoose.model("songs",songSchema);


module.exports = songModel;

