import mongoose from "mongoose";
import express from "express"
import ejs from 'ejs';
import employee from "./model/genrate.js";

mongoose.connect("mongodb://localhost:27017/company")


const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
    res.render('index', {
        foo: "FOO"
    })

})


app.get('/clearall', async (req,res)=>{
    await employee.deleteMany({})
    console.log("deleted all documents")
})

app.get('/genrate', async (req, res) => {
    
    let names =["dhruv","mohit","aaryan","anurag","rishab","harry"]
    let depname = ["web deb" , "software eng" , "devloper","tester"]
    let manager = ["true","false"]
    

    for (let index = 0; index < 10; index++) {

        let e = await employee.create({
            name: names[Math.floor(Math.random() * (5 - 0) + 0)],
            depart: depname[Math.floor(Math.random() * (4 - 0) + 0)],
            emNo: Math.floor(Math.random() * (100000 - 10000) + 10000),
            ismanager: manager[Math.floor(Math.random())]
        })

        console.log(e)
    }

    res.render('index', {
        foo: "FOO"
    })

})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})