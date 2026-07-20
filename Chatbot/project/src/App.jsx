import { useState } from "react";

export default function App() {
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState([]);


  async function askAI() {
    if (!question.trim()) return;

    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
      }),
    });

    const data = await response.json();
    

    setChat((prev) => [
      ...prev,
      {
        question,
        answer: data.answer,
      },
    ]);

    setQuestion("");
    
  }

  return (
   <div className="min-h-screen flex flex-col">
  <div className="flex-1 overflow-y-auto p-6 bg-red-600">
    {chat.map((item, index) => (
      <div key={index} className="mb-6">
        <h3><b>You:</b> {item.question}</h3>
        <h3><b>AI:</b> {item.answer}</h3>
      </div>
    ))}
  </div>

  <div className="border-t p-4 flex gap-2">
    <input
      value={question}
      onChange={(e) => setQuestion(e.target.value)}
      className="flex-1 border p-2 rounded"
      placeholder="Ask anything..."
    />

    <button
      onClick={askAI}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Send
    </button>
  </div>
</div>
  );
}