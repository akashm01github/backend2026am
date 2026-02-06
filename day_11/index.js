// -------------------------------------
//! API ENDPOINTS 
// https://fakestoreapi.com/products
//--------------------------------------



//! FETCH 
// fetch(`https://fakestoreapi.com/products`)
// .then((raw)=>{
//     return raw.json()
// })
// .then((result)=>console.log(result))




//todo AXIOS 
// axios.get('https://fakestoreapi.com/products')
// .then((result)=>{
//     console.log(result.data)
// })


//---------------------------------------------
//! PROMISE
//---------------------------------------------

// const parchi = new Promise(function(resolve,reject){
//     fetch('https://fakestoreapi.com/products')
//     .then(raw=>raw.json())
//     .then((result)=>{
//         if(!result){
//             reject()
//         }
//         else{
//             resolve(result);
//         }
//     })

// })


// parchi.then((data)=>{
//     console.log(data)
// })
// .catch(()=>{
//     console.log("Error")
// })



//---------------------------------------------
//! CALLBACK
//---------------------------------------------


// function abcd(a,b){
//     b();
// }

// abcd(1,function(){console.log('Callback')})



// function doSomeThing(url,cb){
//     fetch(url)
//     .then(raw=>raw.json())
//     .then((result)=>{
//         cb(result)
//     })
// }


// doSomeThing(`https://fakestoreapi.com/products`,function(result){
//     console.log(result)
// })


// async function abcd(url) {
//     const data = await fetch(url);

//     const result = await data.json()

//     return result
// }



// async function hh(){
//     const data = await abcd(`https://fakestoreapi.com/products`)
//     console.log(data)
// }


// hh()



async function fetchStoreData() {
    try {
        const [products,singleProduct,catagories] = await Promise.all([
            fetch(`https://fakestoreapi.com/products`).then(raw=>raw.json()),
            fetch(`https://fakestoreapi.com/products/1`).then(raw=>raw.json()),
            fetch(`https://fakestoreapi.com/products/categories`).then(raw=>raw.json())
        ])

        console.log("All Products: ",products)
        console.log("Single Products: ",singleProduct)
        console.log("Catagories: ",catagories)
    } catch (error) {
        console.log('Error',error)
    }
}

fetchStoreData()



