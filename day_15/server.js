const express = require('express');

const fs = require('fs')

const app = express();

const usersData = require('./MOCK_DATA.json');

app.use(express.urlencoded({ extended: false }));



//! GET ALL USER IN JSON FORMAT 
app.get('/api/users', (req, res) => {
    return res.json({
        message: 'Fetched Data Successfully',
        data: usersData
    })
})


//! GET ALL USER IN HTML FORMAT
app.get('/users', (req, res) => {
    const html = `
     <ul>
        ${usersData.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `
    return res.send(html)
})


//! GET SINGLE USER
app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);

    const user = usersData.find((user) => user.id == id);

    res.json({
        message: "User Found",
        user: user
    })

})



//! CREATE NEW USER 
app.post('/api/users', (req, res) => {
    const body = req.body;

    usersData.push({ ...body, id: usersData.length + 1 });

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(usersData), (err, data) => {
        return res.json({
            message: "User Created",
            user:body
        })
    })

})



//! UPDATE USER 
app.patch('/api/users/:id', (req, res) => {
    res.send('About Page')
})


//! DELETE USER
app.delete('/api/users/:id', (req, res) => {

})

app.listen(3000, () => {
    console.log(`Server is Running on Port on 3000.......`)
})