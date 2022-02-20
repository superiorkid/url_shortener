from api import app
from flask import jsonify, send_from_directory


# Path for our main Svelte page
@app.route('/')
def base():
  return send_from_directory('frontend/public', 'index.html')


# Path for all the static files (compiled JS/CSS, etc.)
@app.route('/<path:path>')
def home(path):
  return send_from_directory('frontend/public', path)


@app.get('/hello')
def say_hi():
  return jsonify({'msg': 'Hello from flask'})