import requests
from moviepy.editor import VideoFileClip
import os
import torch

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

# Function to detect if the audio is fake
def detect_audio(audio_file_path):
    # Load your pre-trained model (replace with your model's loading code)
    model = torch.load('path_to_your_model.pth')  # Update this path
    model.eval()

    # Load and process the audio file (replace this with your actual processing code)
    # This is just a placeholder for loading audio and preparing for prediction
    waveform, sample_rate = torchaudio.load(audio_file_path)  # Update this based on your audio processing

    # Make the prediction
    with torch.no_grad():
        prediction = model(waveform.unsqueeze(0))  # Update this based on your model's input shape
        is_fake = prediction.argmax().item()  # Example: 0 for real, 1 for fake

    if is_fake == 1:
        print("The audio is detected as FAKE.")
    else:
        print("The audio is detected as REAL.")

# Main function
def main(video_url):
    video_file_path = "downloaded_video.mp4"  # Temporary path to save the video
    wav_file_path = "extracted_audio.wav"  # Output path for the audio

    try:
        # Step 1: Download the video
        download_video(video_url, video_file_path)

        # Step 2: Extract audio from the downloaded video
        extract_audio(video_file_path, wav_file_path)

        # Step 3: Detect if the audio is fake
        detect_audio(wav_file_path)

        # Clean up temporary video file
        os.remove(video_file_path)

    except Exception as e:
        print(f"An error occurred: {e}")

# URL of the video file (replace with your video URL)
VIDEO_URL = "https://fakewebnew.vercel.app/video/fake.mp4"  # Update this URL
main(VIDEO_URL)
