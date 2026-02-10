const http = require('http');

const url = require('url');


//! CREATE SERVER UISNG HTTP
const myServer = http.createServer((req, res) => {
    const myUrl = url.parse(req.url,true);
    console.log(myUrl)
    if (myUrl.pathname == '/') {
        res.end("Home Page")
    }
    else if (myUrl.pathname == '/about') {
        const userName = myUrl.query.myname;
        res.end(`Hi ${userName}`,)
    }
    else if (myUrl.pathname == '/contact') {
        res.end("Contact Page")
    }
    else{
        res.end('404 Page Not Found')
    }
})



myServer.listen(3000, () => {
    console.log(`Server is Running on Port 3000......`)
})