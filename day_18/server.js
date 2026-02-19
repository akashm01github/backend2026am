const express = require('express');
const path = require('path');

const multer = require('multer')

const app = express();

// const upload = multer({ dest: 'uploads/' })


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null,'./uploads')
    },
    filename: function (req, file, cb) {
        return cb(null,`${Date.now()}-${file.originalname}`)
    }
})


const upload = multer({storage})

app.set('view engine', 'ejs');

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
    res.render('home');
});


//! SINGLE FILE 
app.post('/upload', upload.single('profileImg'), (req, res) => {
    console.log(req.body);
    console.log(req.file)

    return res.redirect('/')
})



//! FOR MULTIPLE FILE
// app.post('/upload', upload.fields([{name:'profileImg'},{name:'coverImg'}]), (req, res) => {
//     console.log(req.body);
//     console.log(req.file)

//     return res.redirect('/')
// })


app.listen(3000, () => {
    console.log(`Server is Running on Port 3000.......`)
})





