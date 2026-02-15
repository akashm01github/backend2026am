const userModel = require("../models/user.model")


//todo GET ALL USERS DETAILS 
const getAllUser = async (req, res) => {
    res.setHeader("myName", "Akashm")
    console.log(req.headers)

    const userDetails = await userModel.find({})
    res.json({
        users: userDetails
    })
}


//todo GET USER DATA IN HTML FORMAT

const getUserDataInHTML = async (req, res) => {


    const userDetails = await userModel.find({})


    // const html = `
    //  <ul>
    //      ${usersData.map((user) => `<li>${user.first_name}</li>`).join("")}
    //  </ul >
    // `


    const html = `
     <ul>
         ${userDetails.map((user) => `<li>${user.first_name}</li>`).join("")}
     </ul >
    `

    res.send(html)
}





//todo GET SINGLE USER

const getSingleUser = async (req, res) => {
    // const id = Number(req.params.id);


    // ! DATA COMING FROM LOCAL FILE
    // const user = usersData.find((user) => user.id == id);

    //! DATA COME FROM DB


    //! MONGO DB
    const id = req.params.id;

    const user = await userModel.findOne({
        _id: id
    })

    res.json({
        message: "User Found",
        user: user
    })
}



//todo CREATE NEW USER
const createNewUser =  async (req, res) => {
    const newUser = req.body;


    // ! USING LOCAL FILE 

    // usersData.push({ ...newUser, id: usersData.length + 1 })


    // fs.writeFile('./MOCK_DATA.json', JSON.stringify(usersData), (err) => {
    //     return res.json({
    //         message: 'New User Created',
    //         user: newUser
    //     })
    // })


    // ! USING DATA BASE
    await userModel.create({
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        gender: newUser.gender,
        job_title: newUser.job_title
    })


    res.status(201).json({
        message: "New User Created",
        newUser
    })



}


//todo UPDATE DATA 
const updateUserData = async (req, res) => {
    // ! USING LOCAL JSON DATA
    // const id = Number(req.params.id);

    // const updateIndex = usersData.findIndex((user) => user.id == id);

    // if (updateIndex == -1) {
    //     return res.json({
    //         message: "No Data Found"
    //     })
    // }

    // usersData[updateIndex] = { ...usersData[updateIndex], ...updatedData }


    // fs.writeFile('./MOCK_DATA.json', JSON.stringify(usersData), (err) => {
    //     res.json({
    //         message: "User Updated",
    //         updatedData
    //     })
    // })



    //! USING DB
    const id = req.params.id;

    let updatedData = req.body

    await userModel.findByIdAndUpdate(
        id,
        updatedData,
        { new: true }
    )

    res.json({
        message: 'Data Updated'
    })

}





module.exports = { getAllUser,getUserDataInHTML, getSingleUser,createNewUser,updateUserData }