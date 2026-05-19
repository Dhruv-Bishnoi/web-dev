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

    username:String,

    password:String,

    gmail:String,

    PPF:String

})



const Post = mongoose.model("Post", postSchema)
const user = mongoose.model("user", userdata)
const app = express()

app.use(express.static("public"))

app.use(express.json())



const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)



app.get("/login",(req,res)=>{

    res.sendFile(path.join(__dirname,"public","login.html"))

})

app.post("/login", async (req,res)=>{

    console.log("data received")

   const userfind = await user.findOne({
        username:req.body.username,
            password:req.body.password,
            gmail:req.body.gmail
    })


        if(userfind){
            res.json({
                success:true,
                 message:"Login Success",
            })
        }
        else{

        res.json({

            success:false,

            message:"Invalid Credentials"

        })

        }


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




// HOME PAGE
app.get("/signup",(req,res)=>{

    res.sendFile(path.join(__dirname,"public","signup.html"))

})

app.post("/signup",

upload.single("profile"),

async(req,res)=>{

    console.log("data received")


    const newuser = await user.create({

        username:req.body.username,

        password:req.body.password,

        gmail:req.body.gmail,

        PPF:req.file
        ?
        `/img/${req.file.filename}`
        :
        ""

    })


    console.log("added done")


    res.json({

        success:true,

        user:newuser

    })

})
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