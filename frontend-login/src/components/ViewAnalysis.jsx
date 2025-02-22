import React, { useState } from "react";
import axios from "axios";
import { TbMessageChatbotFilled } from "react-icons/tb";
import { IoMdClose } from "react-icons/io"; // Import close icon
import "./ViewAnalysis.css";

const ViewAnalysis = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatOpen(!isChatOpen);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post("http://localhost:5001/chatbot", { message: input });
      const botMessage = { sender: "bot", text: response.data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: "Error: Unable to fetch response." }]);
    }

    setInput("");
  };

  return (
    <div className="view-analysis-container">
      {/* Analysis Section (Left) */}
      <div className="analysis-section">
        <h1>View Analysis</h1>
        <p>This is a section for viewing analysis.</p>
      </div>

      {/* Chatbot Toggle Icon */}
      {!isChatOpen && (
        <div className="chatbot-icon" onClick={toggleChatbot}>
          <TbMessageChatbotFilled />
        </div>
      )}

      {/* Chatbot Section (Collapsible) */}
      {isChatOpen && (
        <div className="chatbot-section open">
          {/* Close Button */}
          <div className="chatbot-header">
            <h2>Financial Chatbot</h2>
            <IoMdClose className="close-icon" onClick={toggleChatbot} />
          </div>

          <div className="chatbox">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`}>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Field */}
          <div className="chat-input">
            <input
              type="text"
              placeholder="Ask a financial question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAnalysis;
