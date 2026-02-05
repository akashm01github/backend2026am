const fs = require('fs');


// SYNC CALL
// fs.writeFileSync('./test.txt',"My Name is Akash Mukherjee and i am a Developer")



// ASYNC
// fs.writeFile('./test.txt',"My Name is Akash Mukherjee and i am a Developer", (err)=>{})


// READ FILE
// const result = fs.readFileSync('./contact.txt',"utf-8")

// console.log(result)


// ASYNC
// fs.readFile('./contact.txt','utf-8',(err,res)=>{
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log(res)
//     }
// })


// SYNC
fs.appendFileSync('./test.txt','Thank You!!\n');

