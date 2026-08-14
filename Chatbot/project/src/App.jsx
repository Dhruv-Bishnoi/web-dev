import { useState ,useEffect} from "react";







export default function App() {
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState([]);
  const [chatid, setChatId] = useState('');
  const [Title, setTitle] = useState('')
  const [logs, setlogs] = useState([])
  
  

  useEffect(() => {
  const getLogs = async () => {
    const response = await fetch("http://localhost:3000/chatLogs", {
      method: "POST",
    });

    const data = await response.json();

    
    setlogs(data.allLogs);
  };
  
  getLogs();
  
}, );
useEffect(() => {
  createChat()
}, [])


console.log(logs);



const showLogs = async (id) => {
  try {
    setChatId(id);

    const loadchat = await fetch("http://localhost:3000/LoadChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    const data = await loadchat.json();

    console.log("Loaded Chat:", data);

    setChat(
      data.map((msg) => ({
        question: msg.question,
        answer: msg.answer,
      }))
    );
  } catch (error) {
    console.error("Load chat error:", error);
  }
};


const createChat = async () => {
  const res = await fetch("http://localhost:3000/newChat",{
    method: "POST",
  }); 

  const UID = await res.json();
  console.log(UID)
setChatId(UID.chatId);
setChat([])
};

 async function askAI() {
  if (!question.trim()) return;

  if (!chatid) {
    console.log("No chat ID");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        chatid,
      }),
    });

    const data = await response.json();

    console.log("AI Response:", data);

    setChat((prev) => [
      ...prev,
      {
        question,
        answer: data.answer,
      },
    ]);

    setTitle(data.TITLE);

    // 👇 Only add if this chat is not already in sidebar
    if (data.TITLE) {
      setlogs((prev) => {
        const alreadyExists = prev.some(
          (log) => log.chatID === data.chatid
        );

        if (alreadyExists) {
          return prev;
        }

        return [
          ...prev,
          {
            chatID: data.chatid,
            Title: data.TITLE,
          },
        ];
      });
    }

    setQuestion("");
  } catch (error) {
    console.error("Chat error:", error);
  }
}

return (
  <div className="flex h-screen bg-black overflow-hidden">

    {/* SIDEBAR */}
    <div className="w-[30vw] h-screen bg-black text-white flex flex-col">

      {/* New Chat */}
      <div className="p-4 shrink-0">
        <button
          onClick={createChat}
          className="bg-amber-300 text-black rounded-xl p-2"
        >
          New Chat
        </button>
      </div>

      {/* Sidebar Scroll */}
      <div className="flex-1 overflow-y-auto px-4">
        {logs.map((log) => (
          <div
            onClick={() => showLogs(log.chatID)}
            className="p-3 mb-2 rounded hover:bg-gray-800 cursor-pointer"
            key={log.chatID}
          >
            {log.Title}
          </div>
        ))}
      </div>

    </div>


    {/* CHAT AREA */}
    <div className="w-[70vw] h-screen flex flex-col">

      {/* Messages Scroll */}
      <div className="flex-1 overflow-y-auto p-6 bg-black text-white">

        {chat.map((item, index) => (
          <div key={index} className="mb-6">
            <h3>
              <b>You:</b> {item.question}
            </h3>

            <h3>
              <b>AI:</b> {item.answer}
            </h3>
          </div>
        ))}

      </div>


      {/* INPUT - fixed at bottom of chat area */}
      <div className="shrink-0 border rounded-xl p-4 bg-gray-600 flex gap-2">

        <div className="w-[90%]">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Ask anything..."
          />
        </div>

        <button
          onClick={askAI}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>

      </div>

    </div>

  </div>
);
}