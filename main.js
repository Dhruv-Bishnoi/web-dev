import mongoose from "mongoose";
import express  from "express"
import { todo } from "./model/todo.js";

let conn = await mongoose.connect("mongodb://localhost:27017/todo")
const app = express()
const port = 3000


app.get('/',  (req, res) => {

    const newtodo = new todo({name:"hello" , rollno :54,status: false})

     newtodo.save()
    
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
