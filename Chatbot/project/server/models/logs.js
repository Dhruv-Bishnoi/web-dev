import mongoose, { model, Schema } from "mongoose";


const logschema = mongoose.Schema(
    
    {

    chatID:String,
    Title:String

}
)

export default  mongoose.model("Logs",logschema)