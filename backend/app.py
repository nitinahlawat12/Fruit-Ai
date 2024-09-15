from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import datetime
from bson import ObjectId
from googletrans import Translator

app = Flask(__name__)
CORS(app)
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'  # Change this to a secure secret key

# Initialize JWT manager
jwt = JWTManager(app)

# Initialize MongoDB client
client = MongoClient('mongodb://localhost:27017/')
db = client['fruit_ai']
users_collection = db['users']
messages_collection = db['messages']
faqs_collection = db['faqs']

# Initialize the translator
translator = Translator()

# Helper function to convert string to MongoDB ObjectId
def str_to_objectid(id_str):
    try:
        return ObjectId(id_str)
    except Exception:
        return None

# User Registration
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Check if username and password are provided
    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400

    # Check if user already exists
    if users_collection.find_one({'username': username}):
        return jsonify({'message': 'User already exists'}), 400

    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    # Insert new user into the database
    users_collection.insert_one({'username': username, 'password': hashed_password})
    
    return jsonify({'message': 'User registered successfully'}), 201

# User Login
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Find the user in the database
    user = users_collection.find_one({'username': username})

    # Validate user credentials
    if not user or not bcrypt.checkpw(password.encode('utf-8'), user['password']):
        return jsonify({'message': 'Invalid username or password'}), 401

    # Create a JWT access token
    access_token = create_access_token(identity={'username': username})
    
    return jsonify(access_token=access_token), 200

# Protected Route Example
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

# Post a Message
@app.route('/messages', methods=['POST'])
@jwt_required()
def post_message():
    data = request.json
    message = data.get('message')
    current_user = get_jwt_identity()

    if not message:
        return jsonify({'message': 'Message is required'}), 400

    # Insert the message into the database
    messages_collection.insert_one({
        'message': message,
        'user': current_user['username'],
        'timestamp': datetime.utcnow()
    })
    
    return jsonify({'message': 'Message sent successfully'}), 201

# Get All Messages
@app.route('/messages', methods=['GET'])
@jwt_required()
def get_messages():
    messages = list(messages_collection.find({}, {'_id': 0}).sort('timestamp', 1))
    return jsonify(messages), 200

# CRUD operations for FAQs

# Create a new FAQ
@app.route('/faqs', methods=['POST'])
@jwt_required()
def create_faq():
    data = request.json
    question = data.get('question')
    answer = data.get('answer')

    if not question or not answer:
        return jsonify({'message': 'Question and answer are required'}), 400

    # Insert the FAQ into the database
    faqs_collection.insert_one({
        'question': question,
        'answer': answer,
        'timestamp': datetime.utcnow()
    })
    
    return jsonify({'message': 'FAQ created successfully'}), 201

# Get all FAQs
@app.route('/faqs', methods=['GET'])
@jwt_required()
def get_faqs():
    faqs = list(faqs_collection.find({}, {'_id': 0}))
    return jsonify(faqs), 200

# Update an existing FAQ
@app.route('/faqs/<string:faq_id>', methods=['PUT'])
@jwt_required()
def update_faq(faq_id):
    data = request.json
    question = data.get('question')
    answer = data.get('answer')

    if not question or not answer:
        return jsonify({'message': 'Question and answer are required'}), 400

    faq_id = str_to_objectid(faq_id)
    if not faq_id:
        return jsonify({'message': 'Invalid FAQ ID'}), 400

    # Update the FAQ in the database
    result = faqs_collection.update_one({'_id': faq_id}, {'$set': {'question': question, 'answer': answer}})
    if result.matched_count == 0:
        return jsonify({'message': 'FAQ not found'}), 404
    
    return jsonify({'message': 'FAQ updated successfully'}), 200

# Delete an FAQ
@app.route('/faqs/<string:faq_id>', methods=['DELETE'])
@jwt_required()
def delete_faq(faq_id):
    faq_id = str_to_objectid(faq_id)
    if not faq_id:
        return jsonify({'message': 'Invalid FAQ ID'}), 400

    # Delete the FAQ from the database
    result = faqs_collection.delete_one({'_id': faq_id})
    if result.deleted_count == 0:
        return jsonify({'message': 'FAQ not found'}), 404
    
    return jsonify({'message': 'FAQ deleted successfully'}), 200

# Translation Endpoint
@app.route('/translate', methods=['POST'])
def translate():
    data = request.json
    text = data.get('text')
    target_language = data.get('target_language', 'en')  # Default to English if not specified

    if not text:
        return jsonify({'message': 'Text is required'}), 400

    try:
        # Translate the text
        translated = translator.translate(text, dest=target_language)
        return jsonify({
            'original_text': text,
            'translated_text': translated.text,
            'detected_language': translated.src,
            'target_language': target_language
        }), 200
    except Exception as e:
        return jsonify({'message': 'Translation failed', 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
