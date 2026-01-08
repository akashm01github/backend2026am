const fs = require('fs');;


// SYNC....
// fs.writeFileSync('./test.txt',"Hey my Name is Akash Mukherjee...");


// ASYNC...
// fs.writeFile('./test.txt',"Hey my Name is Akash Mukherjee...",(err)=>{});


//todo: READ FILE.....

//! SYNC
// const result = fs.readFileSync('./contacts.txt',"utf-8")
// console.log(result)



//! ASYNC
fs.readFile('./contacts.txt',"utf-8",(err,result)=>{
    if(err){
        console.log("Error: ",err);
    }
    else{
        console.log(result)
    }
})





