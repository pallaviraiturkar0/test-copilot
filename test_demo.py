#!/usr/bin/env python3
"""
Demo script to test the Flask chat handler

Run the chat.py server first:
    python test/chat.py

Then run this script to test it:
    python test_demo.py
"""

import requests
import json

def test_chat_endpoint():
    """Test the /chat/completions endpoint"""
    url = "http://127.0.0.1:5000/chat/completions"
    
    # Test case from the problem statement
    test_payload = {
        "messages": [
            {"role": "user", "content": "Hello!"},
            {"role": "user", "content": "What can you do?"}
        ],
        "model": "gpt-4"
    }
    
    try:
        response = requests.post(url, json=test_payload)
        response.raise_for_status()
        
        result = response.json()
        print("✅ Test passed!")
        print(f"Input: {json.dumps(test_payload, indent=2)}")
        print(f"Output: {json.dumps(result, indent=2)}")
        
        # Verify expected output format
        expected_content = "Echo: What can you do?"
        actual_content = result["choices"][0]["message"]["content"]
        
        if actual_content == expected_content:
            print("✅ Response content matches expected format!")
        else:
            print(f"❌ Expected: {expected_content}, Got: {actual_content}")
            
    except requests.exceptions.ConnectionError:
        print("❌ Could not connect to Flask server. Make sure 'python test/chat.py' is running.")
    except Exception as e:
        print(f"❌ Test failed: {e}")

if __name__ == "__main__":
    test_chat_endpoint()