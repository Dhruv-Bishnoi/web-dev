import multer from "multer"
import express from "express"
import path from "path"
import mongoose from "mongoose"
import { fileURLToPath } from "url"
import { count } from "console"



mongoose.connect("mongodb://localhost:27017/twitter")


.then(()=>{

    console.log("Mongo Connected")

})



const postSchema = new mongoose.Schema({

    caption: String,

    image: String,

    createdAt: {

        type: Date,

        default: Date.now

    }

})


const userdata = new mongoose.Schema({

    Username:String,
    Passward:String,
    email:String,

})



const Post = mongoose.model("Post", postSchema)
const user = mongoose.model("user", userdata)



const app = express()


app.use(express.static("public"))

app.use(express.json())



const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)




// HOME PAGE
app.get("/", (req,res)=>{

    res.sendFile()

})


app.get("/login" ,(req,res)=>{

    console.log("data receved")

})







// IMAGE STORAGE
const storage = multer.diskStorage({

    destination: (req,file,cb)=>{

        cb(null, "public/img")

    },

    filename: (req,file,cb)=>{

        cb(null, Date.now() + path.extname(file.originalname))

    }

})



const upload = multer({ storage })



const totalPosts = await Post.countDocuments()

console.log(totalPosts)



app.get("/posts" ,async (req,res)=>{
    const Posts = await Post.find() 

    res.json(Posts)
})
// CREATE POST
app.post("/create-post",

upload.single("image"),

async(req,res)=>{
    
    console.log(req.file)

    const newPost = await Post.create({

        caption: req.body.caption,
        
        image: req.file
?
`/img/${req.file.filename}`
:
""

    })
    res.json(newPost)
})





app.listen(3000, ()=>{

    console.log("Server Running On Port 3000")

})