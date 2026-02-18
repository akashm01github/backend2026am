require('dotenv').config();
const path = require('path');
const express = require('express');
const connectDB = require('./db/db');
const { URL } = require('./models/url.model');

const app = express();


//-------------------------------------------
//! ROUTES IMPORT
//-------------------------------------------

const urlRoutes = require('./routes/url.routes');
const staticRouter = require('./routes/static.routes');
const userRoutes = require('./routes/user.routes');



//-------------------------------------------
//! MIDDLEWARE
//-------------------------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: false }));





// ! SET THE EJS
app.set('view engine', 'ejs');

// ! SET THE PAGES
app.set('views', path.resolve('./views'));

app.use(express.static('public'));




//-------------------------------------------
//! DATABASE CONNECTED
//-------------------------------------------

connectDB();





//! ROUTES
app.use('/url', urlRoutes)

// STATIC ROUTES
app.use('/',staticRouter);


app.use('/user',userRoutes)



app.get('/url/:shortID', async (req, res) => {
    const shortID = req.params.shortID;

    const entry = await URL.findOneAndUpdate({
        shortID
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }
    })

    res.redirect(entry.redirectURL);
})




app.listen(3000, () => {
    console.log(`Server is Running on Port 3000.......`)
})