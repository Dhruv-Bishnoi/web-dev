import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'



 export function App() {
const [answer, setanswer] = useState()
const [question, setquestion] = useState("")


  async function askAI() {
const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
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
});

const data = await response.json();

setanswer(data.choices[0].message.content)
  }
  return (
    <div className="flex min-h-screen">
     <div className="w-[20vw] bg-amber-700"></div>
<div className="w-[80vw] bg-amber-200">

<input
  type="text"
  value={question}
  onChange={(e) => setquestion(e.target.value)}
  className="border p-2 rounded w-96"
  placeholder="Ask anything..."
/>

<button className=' bg-body' onClick={askAI}>Send</button>

<p className=' bg-body'>{answer}</p>

</div>
    </div>
  );


  
}

export default App
