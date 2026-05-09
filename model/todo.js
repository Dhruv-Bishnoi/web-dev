import mongoose from "mongoose";

const todoschema =  new mongoose.Schema({

    name:String,
    rollno:Number,
    course:String,
    status: Boolean,

});

export const todo = mongoose.model('todo',todoschema);