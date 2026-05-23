import multer from "multer"
import express from "express"
import path from "path"
import mongoose from "mongoose"
import { fileURLToPath } from "url"
import { count } from "console"
import { get } from "http"
import strict from "assert/strict"
import { type } from "os"
import { ref } from "process"


mongoose.connect("mongodb://localhost:27017/twitter")


.then(()=>{

    console.log("Mongo Connected")

})

const postSchema = new mongoose.Schema({

    caption: String,

    image: String,



    likelist:[String],



    userid:{
        

        type:mongoose.Schema.ObjectId,

        ref:"user",
    },





    reshare:{

        type:Number,

        default:0

    },



    like:{

        type:Number,

        default:0

    },



    comment:{

        type:Number,

        default:0

    },



    createdAt: {

        type: Date,

        default: Date.now

    }

})
const userdata = new mongoose.Schema({

    username:String,

    password:String,

    gmail:String,

    PPF:String,

    BIO:String
    

})



const Post = mongoose.model("Post", postSchema)
const user = mongoose.model("user", userdata)
const app = express()

app.use(express.static("public"))

app.use(express.json())



const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)



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
        "https://i.pinimg.com/originals/74/a3/b6/74a3b6a8856b004dfff824ae9668fe9b.jpg"
        
    })
    
    
    console.log("added done")
    
    
    res.json({

        success:true,

        user:newuser

    })
    
})

app.get("/profile/:id", async(req,res)=>{
    const finduser = await Post.find({userid:req.params.id})

    res.json(finduser)
    console.log("done")
})

app.get("/login",(req,res)=>{

    res.sendFile(path.join(__dirname,"public","login.html"))

})



app.post("/finduser", async(req,res)=>{

    const curruser = await user.findById(req.body.userid)

    console.log("user found")
    
    res.json(curruser)



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
                 user:userfind
            })

        }
        else{

        res.json({

            success:false,

            message:"Invalid Credentials"

        })

        }


})


app.get("/posts" ,async (req,res)=>{
    const Posts = await Post.find() .populate("userid")
    console.log(Posts)

    res.json(Posts)
})


// CREATE POST
app.post("/create-post",

upload.single("image"),

async(req,res)=>{
    
    console.log(req.file)
    

    const newPost = await Post.create({
    
        caption: req.body.caption,

        userid:req.body.userid,
        
        image: req.file

?
`/img/${req.file.filename}`
:
""

    })
    res.json(newPost)
})

app.post("/findpost", async(req,res)=>{

    const postinfo = await Post.findById(req.body.postId)
    
    
    console.log(postinfo)



    console.log("working")


    res.json(postinfo)

})
app.post("/removelike", async(req,res)=>{

    const postinfo = await Post.findById(req.body.postId)
       postinfo.likelist.pull(req.body.userid)
       postinfo.like -=1
    await postinfo.save()
    
    console.log(postinfo)



    console.log("worked romve")


    res.json(postinfo)

})
app.post("/addlike", async(req,res)=>{

    const postinfo = await Post.findById(req.body.postId)
       postinfo.likelist.push(req.body.userid)
       postinfo.like +=1
    await postinfo.save()
    
    console.log(postinfo)



    console.log("worked added")


    res.json(postinfo)

})




app.listen(3000, ()=>{

    console.log("Server Running On Port 3000")

})