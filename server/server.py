from flask import Flask, request, jsonify
from flask_cors import CORS

from . import util
from .wavelet import w2d

app = Flask(__name__)
CORS(app)

app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

# Load model when the application starts
util.load_saved_artifacts()

@app.route('/classify_image', methods=['POST'])
def classify_image():
    image_data = request.form['image_data']

    response = jsonify(util.classify_image(image_data))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/')
def home():
    return "Sports Celebrity Image Classification API is running."


if __name__ == "__main__":
    print("Starting Python Flask Server For Sports Celebrity Image Classification")
    app.run(host="0.0.0.0", port=8000)