require('dotenv').config();

const express = require('express');
const urlRoutes = require('./routes/url.routes');
const connectDB = require('./db/db');
const { URL } = require('./models/url.model');

const app = express();

app.use(express.json());

connectDB();

app.use(express.urlencoded({ extended: true }));


app.use('/url', urlRoutes)

app.get('/:shortID', async (req, res) => {
    const shortID = req.params.shortID;

    const entry = await URL.findOneAndUpdate({
        shortID
    }, {
        $push: {
            visitHistory: {
                timestamp:Date.now()
            }
        }
    })

    res.redirect(entry.redirectURL);
})


app.get('/test',(req,res)=>{
    return res.end(`<h1>Hello Akash Mukherjee</h1>`)
})

app.listen(3000, () => {
    console.log(`Server is Running on Port 3000.......`)
})