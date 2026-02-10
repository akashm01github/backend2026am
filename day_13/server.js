const http = require('http');

//! CREATE SERVER UISNG HTTP
const myServer = http.createServer((req, res) => {
    if (req.url == '/') {
        res.end("Home Page")
    }
    else if (req.url == '/about') {
        res.end("About Page")
    }
    else if (req.url == '/contact') {
        res.end("Contact Page")
    }
    else{
        res.end('404 Page Not Found')
    }
})



myServer.listen(3000, () => {
    console.log(`Server is Running on Port 3000......`)
})