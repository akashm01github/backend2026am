const express = require('express');
const morgan = require('morgan');


const app = express();


app.use(express());

app.use(morgan('dev'));


app.set('view engine', "ejs");

app.post('/api/auth/register', (req, res) => {
    res.status(400).json({
        message: 'Registered Successfully'
    })
});


app.get('/', (req, res) => {
    res.render('index',{message:"Hello Form EJS"})
})

module.exports = app;