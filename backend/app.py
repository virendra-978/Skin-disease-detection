from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)  # Allow React frontend to connect

model = load_model(r"C:\Users\Virendra\OneDrive\Documents\Demo\Skin-Disease\backend\skin_disease_model.h5")

#model = load_model("skin_disease_model.h5")
IMG_SIZE = (128, 128)

# Match to your train_gen.class_indices
labels = ['actinic_keratoses', 'basal_cell_carcinoma', 'benign_keratosis',
          'dermatofibroma', 'melanocytic_nevi', 'melanoma', 'vascular_lesions']

@app.route('/')
def home():
    return "<h1>Hello<h1>"

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'}), 200


@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    
    file = request.files['image']
    filename = secure_filename(file.filename)
    filepath = os.path.join("uploads", filename)
    os.makedirs("uploads", exist_ok=True)
    file.save(filepath)

    img = load_img(filepath, target_size=IMG_SIZE)
    img_array = img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0

    prediction = model.predict(img_array)
    predicted_index = np.argmax(prediction)
    confidence = float(np.max(prediction))

    return jsonify({
        'predicted_class': labels[predicted_index],
        'confidence': round(confidence, 3)
    })

if __name__ == '__main__':
    app.run(debug=True)
