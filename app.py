# app.py
from flask import Flask, request, jsonify
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Function to get recipe suggestions
def get_recipes(ingredients):
    app_id = os.getenv('EDAMAM_APP_ID')
    app_key = os.getenv('EDAMAM_APP_KEY')
    
    url = 'https://api.edamam.com/search'
    params = {
        'q': ingredients,
        'app_id': app_id,
        'app_key': app_key,
        'from': 0,
        'to': 10,  # Limit the number of recipes returned
    }
    
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()  # Raise an error for bad responses
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f'Error fetching recipes: {e}')
        return []

# Endpoint to handle recipe requests
@app.route('/api/recipes', methods=['POST'])
def recipes():
    data = request.get_json()
    ingredients = data.get('ingredients', '')
    recipes = get_recipes(ingredients)
    return jsonify(recipes)

# Start the server
if __name__ == '__main__':
    app.run(debug=True)
