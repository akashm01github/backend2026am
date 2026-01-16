const express = require('express');

//! Routes
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const cookieParser = require('cookie-parser');




// ! Middleware
const app = express();

app.use(express.json());

app.use(cookieParser());


// ! API

app.use('/api/auth',authRoutes);

app.use('/api/posts',postRoutes);





module.exports = app;