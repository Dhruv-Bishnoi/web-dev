import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Chat from "./models/Chat.js";
import mongoose from "mongoose";
import { randomUUID } from "crypto";
dotenv.config();

const app = express();




console.log("THIS IS MY SERVER");

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(console.error);



app.get("/", (req, res) => {
  res.send("Server is Running 🚀");
});

app.post("/newChat", async (req,res)=>{
 const chatId = randomUUID();

  res.json({
    chatId,
  });
});

app.post("/chat", async (req, res) => {


  const { question } = req.body;
 

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "user",
            content: question,
          },
        ],
      }),
    }


  
  );

  console.log("working")
  const data = await response.json();
  const answer = data.choices[0].message.content

  await Chat.create({
    question,
    answer,
  })
  res.json({
    answer:answer,
    
  });

});



app.listen(3000, () => {
  console.log("Server Running");
});