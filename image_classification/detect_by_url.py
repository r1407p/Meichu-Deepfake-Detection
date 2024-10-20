import tensorflow as tf
import numpy as np
import requests
from PIL import Image
from io import BytesIO
from tensorflow.keras.preprocessing import image

model_path = 'binary_classification_model_small.h5'
model = tf.keras.models.load_model(model_path)

def preprocess_image(img):
    img = img.resize((150, 150))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0  
    return img_array

def predict_image_from_url(img_url):
    try:
        response = requests.get(img_url)
        img = Image.open(BytesIO(response.content))
        
        img_array = preprocess_image(img)
        
        prediction = model.predict(img_array)
        probability = float(prediction[0][0]) # probability of being natural image
        return 1 - probability  
    except Exception as e:
        print(f"Error processing the image: {e}")
        return 1

if __name__ == "__main__":
    img_url = 'https://fakewebnew.vercel.app/img/fake5.png'
    probability = predict_image_from_url(img_url)
    if probability is not None:
        print(f'The probability of the image being AI-generated is: {probability:.4f}')