import React, { useState, useEffect } from "react";
import axios from "axios";
import { TbMessageChatbotFilled } from "react-icons/tb";
import { IoMdClose } from "react-icons/io"; // Import close icon
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import "./ViewAnalysis.css";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const ViewAnalysis = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

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

  useEffect(() => {
    fetchCategoryAnalytics();
    fetchMonthlyAnalytics();
  }, []);

  // Fetch category-wise analytics
  const fetchCategoryAnalytics = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/expenses/analytics/category");
      setCategoryData(response.data);
    } catch (error) {
      console.error("Error fetching category analytics:", error);
    }
  };

  // Fetch monthly trends analytics
  const fetchMonthlyAnalytics = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/expenses/analytics/monthly");
      setMonthlyData(response.data);
    } catch (error) {
      console.error("Error fetching monthly analytics:", error);
    }
  };

  return (
    <div className="view-analysis-container">
      {/* Analysis Section (Left) */}
      <div className="analysis-section">
        <h2>Admin Dashboard - Expense Analytics</h2>

        {/* Category-wise Expense Breakdown */}
        <div className="chart-container">
          <h3>Expense Breakdown by Category</h3>
          <Pie
            data={{
              labels: categoryData.map((item) => item._id),
              datasets: [
                {
                  data: categoryData.map((item) => item.totalAmount),
                  backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF9800", "#9C27B0"],
                },
              ],
            }}
          />
        </div>

        {/* Monthly Expense Trends */}
        <div className="chart-container">
          <h3>Monthly Expense Trends</h3>
          <Bar
            data={{
              labels: monthlyData.map((item) => item._id),
              datasets: [
                {
                  label: "Total Expense",
                  data: monthlyData.map((item) => item.totalAmount),
                  backgroundColor: "#36A2EB",
                },
              ],
            }}
           
          />
        </div>
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
