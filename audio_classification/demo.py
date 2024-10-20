import os
import numpy as np
import librosa
import tensorflow as tf
from tensorflow.keras.models import load_model

# Parameters
SAMPLE_RATE = 16000
DURATION = 5  # Duration of audio clips in seconds
N_MELS = 128  # Number of Mel frequency bins
MAX_TIME_STEPS = 109
MODEL_PATH = "audio_classifier.h5"  # Path to the saved model
AUDIO_FILE_PATH = "extracted_audio.wav"  # Path to the audio file to evaluate

# Load the saved model
model = load_model(MODEL_PATH)

def preprocess_audio(file_path):
    """Preprocess the audio file and return the Mel spectrogram."""
    audio, _ = librosa.load(file_path, sr=SAMPLE_RATE, duration=DURATION)

    # Extract Mel spectrogram
    mel_spectrogram = librosa.feature.melspectrogram(y=audio, sr=SAMPLE_RATE, n_mels=N_MELS)
    mel_spectrogram = librosa.power_to_db(mel_spectrogram, ref=np.max)

    # Ensure all spectrograms have the same width (time steps)
    if mel_spectrogram.shape[1] < MAX_TIME_STEPS:
        mel_spectrogram = np.pad(mel_spectrogram, ((0, 0), (0, MAX_TIME_STEPS - mel_spectrogram.shape[1])), mode='constant')
    else:
        mel_spectrogram = mel_spectrogram[:, :MAX_TIME_STEPS]

    return mel_spectrogram

def predict_audio(file_path):
    """Predict if the audio is spoof or bonafide."""
    mel_spectrogram = preprocess_audio(file_path)

    # Add a new axis to match the model input shape
    mel_spectrogram = mel_spectrogram[np.newaxis, ..., np.newaxis]  # Shape: (1, height, width, channels)

    # Predict using the loaded model
    prediction = model.predict(mel_spectrogram)

    # Convert probabilities to predicted classes
    predicted_class = np.argmax(prediction, axis=1)

    return predicted_class[0], prediction[0]

def main(AUDIO_FILE_PATH):
    # Check if the audio file exists
    if not os.path.isfile(AUDIO_FILE_PATH):
        print("Audio file not found. Please check the path.")
        return

    predicted_class, prediction_probabilities = predict_audio(AUDIO_FILE_PATH)
    fake_prob = prediction_probabilities[0]
    # Define class labels
    print(f"fake probability: {fake_prob}")
    # classes = ["spoof", "bonafide"]
    # print(f"Predicted class: {classes[predicted_class]}")
    # print(f"Prediction probabilities: {prediction_probabilities}")

if __name__ == "__main__":
    main()