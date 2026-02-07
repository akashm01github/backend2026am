const http = require('http');

const myserver = http.createServer((req,res)=>{
    console.log(req.headers)
    res.end("Hello Form Server")
});


myserver.listen(3000,()=>{
    console.log(`Server is Runnig on Port 3000..........`)
})