from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
import requests
import uvicorn
from typing import List
import logging
from openai import OpenAI
import os
import dotenv
import image_classification.detect_by_url
import audio_classification.detect_audio_by_url
from api_server.cache_server import CacheServer

dotenv.load_dotenv()
print(os.getenv("OPENAI_API_KEY"))
app = FastAPI()

cache_server = CacheServer()
# Add CORS middleware to handle OPTIONS requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define a Pydantic model to handle the expected request body

class summary_text(BaseModel):
    text: str

class ImageCheckRequest(BaseModel):
    imageUrls: List[str]

class AudioCheckRequest(BaseModel):
    audioUrls: List[str]

class TextSummaryRequest(BaseModel):
    texts: List[str]
    
@app.get("/")
async def root():
    return {"message": "Welcome to the AI Ethics API!"}

    
    
async def check_image(url):
    try:
        # get the image result from gpu:
        result = random.random()
        return result
    except Exception as e:
        logging.error(f"Failed to check image: {str(e)}")
        return 0
    
@app.post("/check_images")
async def check_images(request: ImageCheckRequest):
    try:
        print(request.imageUrls)
        res = []
        distribution = {
            "ai": 0,
            "likely-ai": 0,
            "non-ai": 0
        }
        for url in request.imageUrls:
            try:
                if cache_server.check_cache(url) is None:
                    ai_probability = image_classification.detect_by_url.predict_image_from_url(url)
                    cache_server.add_cache(url, ai_probability)
                else:
                    ai_probability = cache_server.check_cache(url)
                if ai_probability > 0.5:
                    distribution["ai"] += 1
                    res.append({"isAIgenerated_prob": ai_probability, "isAIgenerated": True})
                elif ai_probability > 0.3:
                    distribution["likely-ai"] += 1
                    res.append({"isAIgenerated_prob": ai_probability, "isAIgenerated": False})
                else:
                    distribution["non-ai"] += 1
                    res.append({"isAIgenerated_prob": ai_probability, "isAIgenerated": False})

            except Exception as e:
                logging.error(f"Failed to check image: {str(e)}")
                res.append({"isAIgenerated_prob": 0, "isAIgenerated": False})

        return JSONResponse(content={
            "image_ai": res,
            "distribution": distribution
        }, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

async def check_audio(url):
    try:
        # get the audio result from gpu:
        # result = random.random()
        result = audio_classification.detect_audio_by_url.classify_audio_from_video(url)
        print(result)
        return result
    except Exception as e:
        logging.error(f"Failed to check audio: {str(e)}")
        return 0
    
@app.post("/check_audios")
async def check_audios(request: AudioCheckRequest):
    try:
        print(request.audioUrls)
        res = []
        for url in request.audioUrls:
            try:
                if cache_server.check_cache(url) is None:
                    ai_probability = audio_classification.detect_audio_by_url.classify_audio_from_video(url)
                    ai_probability = float(ai_probability)
                    cache_server.add_cache(url, ai_probability)
                else:
                    ai_probability = cache_server.check_cache(url)
                res.append(ai_probability)

            except Exception as e:
                logging.error(f"Failed to check audio: {str(e)}")
                res.append(0)
        if len(res) == 0:
            audio_ai_percentage = 0
        else:
            audio_ai_percentage = sum(res) / len(res)
        return JSONResponse(content={
            "audio_ai": res,
            "audio_ai_percentage": audio_ai_percentage
        }, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

async def summarize_text(text):
    return text
    

@app.post("/summary_text")
async def summary_text(request: TextSummaryRequest):
    text = " ".join(request.texts)
    print(text)
    if cache_server.check_cache(text) is None:
        client = OpenAI(
        api_key=os.getenv("OPENAI_API_KEY")
        )

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{
                "role": "user", 
                "content": f"This is a news about America politics: {text}\n Please summarize this article and return it as an array of strings but do not wrap then with ```. The length of array should less than 5."}
            ],
        )
        # print(f'Response: {response}')
        summary = response.choices[0].message.content
        cache_server.add_cache(text, summary)
    else:
        summary = cache_server.check_cache(text)
        
    print(f'Summary: {summary}')
    return JSONResponse(content={
        "text_summary": summary
    }, status_code=200)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=7000)
