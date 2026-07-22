import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },

    
    chatid: String
    
  },
  {
    timestamps: true,
  }

);

export default mongoose.model("Chat", ChatSchema);