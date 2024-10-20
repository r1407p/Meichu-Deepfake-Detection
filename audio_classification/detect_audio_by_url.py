import requests
from moviepy.editor import VideoFileClip
import os
import numpy as np
import librosa
import tensorflow as tf
from tensorflow.keras.models import load_model

# Parameters for audio processing
SAMPLE_RATE = 16000
DURATION = 5  # Duration of audio clips in seconds
N_MELS = 128  # Number of Mel frequency bins
MAX_TIME_STEPS = 109
MODEL_PATH = "audio_classifier.h5"  # Path to the saved model

# Function to download video from a URL
def download_video(video_url, output_path):
    response = requests.get(video_url, stream=True)
    with open(output_path, 'wb') as video_file:
        for chunk in response.iter_content(chunk_size=1024):
            if chunk:
                video_file.write(chunk)
    print(f"Video downloaded and saved as {output_path}")

# Function to extract audio from a video file
def extract_audio(video_file_path, wav_file_path):
    video = VideoFileClip(video_file_path)
    audio = video.audio
    audio.write_audiofile(wav_file_path, codec='pcm_s16le')
    audio.close()
    video.close()
    print(f"Audio extracted and saved as {wav_file_path}")

# Load the saved model once at the beginning
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

def classify_audio_from_video(video_url):
    video_file_path = "downloaded_video.mp4"  # Temporary path to save the video
    wav_file_path = "extracted_audio.wav"  # Output path for the audio

    try:
        # Step 1: Download the video
        download_video(video_url, video_file_path)

        # Step 2: Extract audio from the downloaded video
        extract_audio(video_file_path, wav_file_path)

        # Step 3: Check if the audio file exists
        if not os.path.isfile(wav_file_path):
            print("Audio file not found after extraction.")
            return

        # Step 4: Predict if the audio is fake or real
        predicted_class, prediction_probabilities = predict_audio(wav_file_path)
        fake_prob = prediction_probabilities[0]
        
        # Print results
        print(f"Fake probability: {fake_prob}")

        # Clean up temporary video and audio files
        os.remove(video_file_path)
        os.remove(wav_file_path)
        return fake_prob
    except Exception as e:
        print(f"An error occurred: {e}")
        return 0

# URL of the video file (replace with your video URL)
if __name__ == "__main__":
    VIDEO_URL = "https://fakewebnew.vercel.app/video/fake.mp4"  # Update this URL
    classify_audio_from_video(VIDEO_URL)
