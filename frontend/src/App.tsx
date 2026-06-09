import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./App.css";

type Message = {
  sender: "user" | "ai";
  text: string;
  time?: string;
};

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [sessionId, setSessionId] = useState<string | null>(
    localStorage.getItem("sessionId")
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionId) {
      loadHistory();
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const loadHistory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/chat/history/${sessionId}`
      );

      const history = response.data.map((msg: any) => ({
        sender: msg.sender,
        text: msg.text,
      }));

      setMessages(history);
    } catch (error) {
      console.error(error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
  sender: "user" as const,
  text: input,
  time: new Date().toLocaleTimeString(),
};

    setMessages((prev) => [...prev, userMessage]);

    const currentMessage = input;

    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/chat/message",
        {
          message: currentMessage,
          sessionId,
        }
      );

      if (!sessionId) {
        localStorage.setItem(
          "sessionId",
          response.data.sessionId
        );

        setSessionId(response.data.sessionId);
      }

      setMessages((prev) => [
        ...prev,
        {
      sender: "ai",
      text: response.data.reply,
      time: new Date().toLocaleTimeString(),
},
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Sorry, something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
  <div className="header">
    Spur AI Support Agent
  </div>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender}`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="message ai">
            Agent is typing...
          </div>
        )}

        <div ref={messagesEndRef}></div>
      </div>

      <div className="input-area">
        <input
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />

        <button
          onClick={sendMessage}
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;