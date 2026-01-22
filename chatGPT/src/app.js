const express = require('express');

const app = express();
const cookieParser = require('cookie-parser');

//-----------------------------------------
//! ROUTES
//-----------------------------------------
const authRoutes = require('./routes/auth.routes');
const chatRoutes = require('./routes/chat.routes');


//-----------------------------------------
//! USING MIDDLEWARE
//-----------------------------------------

app.use(express.json());
app.use(cookieParser());


//-----------------------------------------
//! USING ROUTES
//-----------------------------------------
app.use('/api/auth/', authRoutes);
app.use('/api/auth/', authRoutes);


app.use('/api/chat/',chatRoutes);


module.exports = app