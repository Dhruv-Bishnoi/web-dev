import mongoose from "mongoose";


const employeeschema = new mongoose.Schema({

    name:String,
    depart:String,
    emNo:Number,
    ismanager:Boolean
})

export const employee = new mongoose.model("employee",employeeschema)
export default employee