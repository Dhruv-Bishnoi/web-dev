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



let TITLE = ""


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


app.post("/LoadChat", async (req, res) => {
  try {
    const { id } = req.body;

    const chats = await Chat.find({
      chatid: id
    });

    res.json(chats);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Unable to load chat"
    });
  }
});

app.post("/chatLogs",async (req,res)=>{

  const allLogs = await logs.find()


res.json({
  allLogs
})


})

async function getTitle(question, answer) {
  try {
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
              role: "system",
              content:
                "Generate a short chat title in maximum 6 words. Return only the title.",
            },
            {
              role: "user",
              content: `Question: ${question}\nAnswer: ${answer}`,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("TITLE API RESPONSE:", data);

    if (!response.ok) {
      throw new Error(data.error?.message || "Title API failed");
    }

    const title = data.choices[0].message.content.trim();

    console.log("GENERATED TITLE:", title);

    return title;
  } catch (error) {
    console.error("TITLE ERROR:", error);
    return "New Chat";
  }
}

app.post("/chat", async (req, res) => {
  try {
    const { question, chatid } = req.body;

    const history = await Chat.find({ chatid });

    const messages = [];

    history.forEach((msg) => {
      messages.push({
        role: "user",
        content: msg.question,
      });

      messages.push({
        role: "assistant",
        content: msg.answer,
      });
    });

    messages.push({
      role: "user",
      content: question,
    });

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
          messages,
        }),
      }
    );

    const data = await response.json();

    console.log("CHAT RESPONSE:", data);

    if (!response.ok) {
      throw new Error(data.error?.message || "Groq API failed");
    }

    const answer = data.choices[0].message.content;

    let title = "";

    // First message
    if (history.length === 0) {
      title = await getTitle(question, answer);

      console.log("Saving title:", title);

      await logs.create({
        chatID: chatid,
        Title: title,
      });
    }

    await Chat.create({
      question,
      answer,
      chatid,
    });

    res.json({
      answer,
      question,
      chatid,
      TITLE: title,
    });

  } catch (error) {
    console.error("CHAT ERROR:", error);

    res.status(500).json({
      error: error.message,
    });
  }
});



app.listen(3000, () => {
  console.log("Server Running");
});

