import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Chat from "./models/Chat.js";
import logs from "./models/logs.js";
import mongoose from "mongoose";
import { randomUUID } from "crypto";
import { title } from "process";
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


app.post("/logs",async (req,res)=>{

  const allLogs = await logs.map




})

async function  getTitle () {
  
  const msgTitle =  "make a short summary of these conversation strictly in 6 words"
  let messages = []


    const title = await fetch(
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
          role: "system",
          content:
            "Generate a short chat title in maximum 6 words. Return only the title."
        },
        ...messages
      ]
      }),
    } 
  );
  
  const restitle = await title.json();
  const titleofchat = restitle.choices[0].message.content
  console.log(titleofchat)


  return titleofchat
}

app.post("/chat", async (req, res) => {




  
  
  const { question,chatid } = req.body;
 
  const history = await Chat.find({chatid})
  
  let messages = []
  
  history.forEach((msg)=>{
  
     messages.push({
          role: "user",
          content: msg.question
      });
  
      messages.push({
          role: "assistant",
          content: msg.answer
      });
  
  });
  
  messages.push({
      role: "user",
      content: question
  })
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

        messages
      }),
    }


  
  );


  console.log("working")
  const data = await response.json();
  const answer = data.choices[0].message.content

  if(history<1){
 

    const ti = await getTitle()
    console.log(ti)

    logs.create({
      chatID:chatid,
      Title:ti


    })
    console.log("done dona done")
    
    

   
  }

  await Chat.create({
    question,
    answer,
    chatid,
    
    
    
    


    
  })
  res.json({
    answer:answer,
    question,
    chatid
    
  });

});



app.listen(3000, () => {
  console.log("Server Running");
});

