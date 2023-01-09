import logo from "./logo.svg";
import "./App.css";
import "./normal.css";
import {useState} from 'react';
import ChatMessage from "./components/ChatMessage";
import { useEffect } from "react";

function App() {

const [input, setInput] = useState("")
const [chatLog, setChatlog] = useState([{
  user: "gpt",
  message: "How can i help you today?"
}, {
  user: "me",
  message: "I want to use ChatGPT today"
}]);


  async function handleSubmit(e) {
    e.preventDefault();
    setChatlog([...chatLog, { user: "me", message: `${input}`}])
    setInput("");
    const response = await fetch("http://localhost:3080", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: chatLog.map((message) => message.message).join("")
    })
    });
    const data = await response.json();
    console.log(data)
  }

  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="side__menu__button">
          <span>+</span>
          New Chat
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
