import { useState ,useEffect} from "react";







export default function App() {
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState([]);
  const [chatid, setChatId] = useState('');

  // useEffect(() => {
  //   const id = crypto.randomUUID();
  //   console.log(id);
  //   setChatId(id);
  // }, []);



const createChat = async () => {
  const res = await fetch("http://localhost:3000/newChat", {
    method: "POST",
  }); 

  const UID = await res.json();
  console.log(UID)
setChatId(UID.chatId);};



  async function askAI() {
    if (!question.trim()) return;
        console.log(chatid)


    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        chatid
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
    <div className="flex ">
      <div   className="bg-black w-[30vw] text-white  ">

        <button onClick={()=>{createChat()}} className= "bg-amber-300 rounded-xl p-2">new chat</button>
      </div>
      <div className="min-h-screen  w-[70vw] flex flex-col">
        <div className="flex-1 h-[90vh] overflow-auto p-6 bg-red-600 ">
          {chat.map((item, index) => (
            <div key={index} className="mb-6">
              <h3><b>You:</b> {item.question}</h3>
              <h3><b>AI:</b> {item.answer}</h3>
            </div>
          ))}
        </div>

        <div className="border-t p-4 h-[10vh]  sticky  bottom-0 w-full  bg-amber-300 flex gap-2">
          <div className=" w-[90%]">
            <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1 border p-2 rounded w-[100%]  "
            placeholder="Ask anything..."
          />  
          </div> 

          <div className=" ">

          <button
            onClick={askAI}
            className="bg-blue-600 text-white px-4 py-2 rounded  "
          >
            Send
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}