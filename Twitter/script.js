const multer = require("multer")
const express = require("express")
const path = require("path")
``  
const app = express()

app.use(express.static("public"))

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "public/img")

    },

    filename: (req, file, cb) => {

        cb(null, Date.now() + path.extname(file.originalname))

    }

})

const upload = multer({ storage })


// IMAGE UPLOAD

app.post("/upload", upload.single("image"), (req, res) => {

    res.json({

        imageUrl: `/img/${req.file.filename}`

    })

})

app.listen(3000, () => {

    console.log("Server Running On Port 3000")

})