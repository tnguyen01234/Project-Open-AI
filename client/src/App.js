import logo from "./logo.svg";
import "./App.css";
import "./normal.css";
import {useState} from 'react';
import ChatMessage from "./components/ChatMessage";
import { useEffect } from "react";

function App() {

  useEffect(() => {
    getEngines();
  }, [])

const [input, setInput] = useState("");
const [models, setModels] = useState([]);
const [currentModel, setCurrentModel] = useState("ada");
const [chatLog, setChatlog] = useState([{
  user: "gpt",
  message: "How can i help you today?"
}, {
  user: "me",
  message: "I want to use ChatGPT today"
}]);

function clearChat() {
  setChatlog([]);
}


function getEngines() {
  fetch("http://localhost:3090/models")
  .then(res => res.json())
  .then(data => setModels(data.models))
}

  async function handleSubmit(e) {
    e.preventDefault();
let chatLogNew = [...chatLog, { user: "me", message: `${input}`}]
    setInput("");
    setChatlog(chatLogNew)

  const messages = chatLogNew.map((message) => message.message).join("\n")

    const response = await fetch("http://localhost:3090/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: messages,
      currentModel
    })
    });
    const data = await response.json();
    setChatlog([...chatLogNew, {user : "gpt", message: `${data.message}`}])
  }

  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="side__menu__button" onClick={clearChat}>
          <span>+</span>
          New Chat
        </div>
        <div className="models">
          <select onChange={(e) => {
            setCurrentModel(e.target.value)
          }}>
            {models.map((model, index) => (
              <option key={model.id} value={model.id} >{model.id}</option>
            ))}
          </select>
        </div>
      </aside>
      <section className="chatbox">
        <div className="chat__log">
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>
        <div className="chat__input__holder">
          <form onSubmit={handleSubmit}>
            <input rows="1" className="chat-input-textarea" value={input} onChange={(e) => setInput(e.target.value)}></input>
          </form>
        </div>
      </section>
    </div>
  );
}

export default App;
