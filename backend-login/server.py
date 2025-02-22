from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

# Setup Gemini API
def setup_gemini():
    genai.configure(api_key="AIzaSyCNsqEuD6CE4COQzxcqhaZVbz8xnRLmuN8")

setup_gemini()
model = genai.GenerativeModel("gemini-pro")

# Connect to MongoDB
MONGO_URI = "mongodb+srv://userdb:pass123@user-expense.yibsn.mongodb.net/User-Expense?retryWrites=true&w=majority"
client = MongoClient(MONGO_URI)
db = client["User-Expense"]

users_collection = db["users"]
expenses_collection = db["expenses"]
budgets_collection = db["budgets"]

@app.route("/chatbot", methods=["POST"])
def financial_chatbot():
    data = request.json
    user_input = data.get("message", "").lower()  # Convert query to lowercase for easy processing

    if not user_input:
        return jsonify({"response": "Please enter a message."})

    response_text = "I couldn't find relevant data."

    # 1️⃣ Handle Expense-Related Queries
    if "expense" in user_input or "spent" in user_input or "transaction" in user_input:
        expenses = expenses_collection.find({}, {"_id": 0})
        expense_list = list(expenses)
        response_text = f"Here are your last few expenses:\n{expense_list[:5]}" if expense_list else "No expenses found."

    # 2️⃣ Handle Budget-Related Queries
    elif "budget" in user_input or "limit" in user_input:
        budgets = budgets_collection.find({}, {"_id": 0})
        budget_list = list(budgets)
        response_text = f"Your budget details:\n{budget_list[:5]}" if budget_list else "No budget data available."

    # 3️⃣ Handle User Information Queries
    elif "user" in user_input or "profile" in user_input:
        users = users_collection.find({}, {"_id": 0, "password": 0})  # Exclude sensitive data
        user_list = list(users)
        response_text = f"User profiles:\n{user_list[:5]}" if user_list else "No user data found."

    # 4️⃣ Pass Data to Gemini AI for Enhanced Response
    prompt = f"""
    You are a financial AI assistant. You have access to the user's financial data.
    
    Data:\n{response_text}

    Answer the following user query based on this data:
    User: {user_input}
    """

    response = model.generate_content(prompt)
    bot_response = response.text

    return jsonify({"response": bot_response})

if __name__ == "__main__":
    app.run(debug=True, port=5001)
