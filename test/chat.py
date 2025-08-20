from flask import Flask, request, jsonify
import json

app = Flask(__name__)

# Simulate the chat service logic (core chat backend)
def chat_service(messages, model="gpt-4"):
    # For example purposes, just echo the last message
    if messages:
        last_message = messages[-1].get("content", "")
        response = f"Echo: {last_message}"
    else:
        response = "No message provided."
    return {"choices": [{"message": {"content": response}}]}

@app.route("/chat/completions", methods=["POST"])
def handle_chat():
    try:
        req_data = request.json
        messages = req_data.get("messages", [])
        model = req_data.get("model", "gpt-4")
        # Delegate to service
        result = chat_service(messages, model)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)