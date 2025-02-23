
import React, { useState, useEffect } from "react";
import axios from "axios";
import { TbMessageChatbotFilled } from "react-icons/tb";
import { IoMdClose } from "react-icons/io"; // Import close icon
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";
import "./ViewAnalysis.css";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const ViewAnalysis = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [budgetData, setBudgetData] = useState([]);

  // Toggle chatbot visibility
  const toggleChatbot = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Initialize chatbot with welcome message when opened
  useEffect(() => {
    if (isChatOpen && messages.length === 0) {
      setMessages([{ sender: "bot", text: "Hi, Welcome to Expensify! How can I help you?" }]);
    }
  }, [isChatOpen]);

  // Send message to chatbot
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
    fetchBudgetData();
  }, []);

  const fetchCategoryAnalytics = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/expenses/analytics/category");
      setCategoryData(response.data);
    } catch (error) {
      console.error("Error fetching category analytics:", error);
    }
  };

  const fetchMonthlyAnalytics = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/expenses/analytics/monthly");
      setMonthlyData(response.data);
    } catch (error) {
      console.error("Error fetching monthly analytics:", error);
    }
  };

  const fetchBudgetData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/budgets");
      setBudgetData(response.data);
    } catch (error) {
      console.error("Error fetching budget data:", error);
    }
  };

  return (
    <div className="view-analysis-container">
      <div className="analysis-section">
        <h2>Admin Dashboard - Expense Analytics</h2>

      <div className="charts-container">
        <div className="charts-row">
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

        <div className="charts-row">
        <div className="chart-container">
          <h3>Budget vs. Actual Expense per Month</h3>
          <Bar
            data={{
              labels: monthlyData.map((item) => item._id),
              datasets: [
                {
                  label: "Budget",
                  data: budgetData.map((item) => item.monthlyBudget),
                  backgroundColor: "#4CAF50",
                },
                {
                  label: "Actual Expense",
                  data: monthlyData.map((item) => item.totalAmount),
                  backgroundColor: "#FF6384",
                },
              ],
            }}
          />
        </div>

        <div className="chart-container">
          <h3>Cumulative Expense vs. Budget Over Time</h3>
          <Line
            data={{
              labels: monthlyData.map((item) => item._id),
              datasets: [
                {
                  label: "Cumulative Expense",
                  data: monthlyData.map((item, index) => 
                    monthlyData.slice(0, index + 1).reduce((sum, d) => sum + d.totalAmount, 0)
                  ),
                  borderColor: "#FF6384",
                  borderWidth: 2,
                  fill: false,
                },
                {
                  label: "Cumulative Budget",
                  data: budgetData.map((item, index) => 
                    budgetData.slice(0, index + 1).reduce((sum, d) => sum + d.monthlyBudget, 0)
                  ),
                  borderColor: "#4CAF50",
                  borderWidth: 2,
                  fill: false,
                },
              ],
            }}
          />
        </div>
        </div>
      </div>

      
{/* Financial Insights Below */}
<div className="insights-container">
<h3>📊 Financial Insights</h3>
<div className="insights-grid">
  <div className="insight-box">
    <h4>🔹 Highest Expense Category</h4>
    <p>{categoryData.length ? categoryData[0]._id : "Loading..."}</p>
  </div>
  <div className="insight-box">
    <h4>📅 Peak Spending Month</h4>
    <p>{monthlyData.length ? monthlyData[0]._id : "Loading..."}</p>
  </div>
  <div className="insight-box">
    <h4>💰 Total Expenses This Year</h4>
    <p>₹{monthlyData.reduce((total, item) => total + item.totalAmount, 0).toLocaleString()}</p>
  </div>
  <div className="insight-box">
    <h4>📉 Lowest Spending Month</h4>
    <p>{monthlyData.length ? monthlyData[monthlyData.length - 1]._id : "Loading..."}</p>
  </div>
</div>
</div>
</div>

      {/* Chatbot Section */}
      {!isChatOpen && (
        <div className="chatbot-icon" onClick={toggleChatbot}>
          <TbMessageChatbotFilled />
        </div>
      )}

      {isChatOpen && (
        <div className="chatbot-section open">
          <div className="chatbot-header">
            <h2>ExpensiBot – Your Smart Finance Guide, Here to Help You Spend Smarter!</h2>
            <IoMdClose className="close-icon" onClick={toggleChatbot} />
          </div>
          <div className="chatbox">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input type="text" placeholder="Ask a financial question..." value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && sendMessage()} />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAnalysis;
