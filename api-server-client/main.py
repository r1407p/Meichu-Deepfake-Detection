from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import uvicorn
from demo import load_model, predict_synthetic

app = FastAPI()

# Add CORS middleware to handle OPTIONS requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define a Pydantic model to handle the expected request body


class ImageCheckRequest(BaseModel):
    imageUrl: str

# init demo.py for images and videos.


@app.post("/request")
async def check_image(request: ImageCheckRequest):
    try:
        print(request.imageUrl)
        response = requests.get(request.imageUrl)
        if response.status_code == 200:
            content_type = response.headers['Content-Type']
            print(content_type)
            if content_type.startswith('image/'):
                # 想辦法把 return 的部分接到 model
                image_data = response.content
                prob = predict_synthetic(image_data, model)
                is_ai_generated = prob > 0.5
                return JSONResponse(content={
                    "isAIgenerated": is_ai_generated,
                    "probability": prob
                }, status_code=200)
                # return JSONResponse(content={"isAIgenerated": True}, status_code=200)
            else:
                return JSONResponse(content={"error": "The URL does not point to an image"}, status_code=400)
        else:
            return JSONResponse(content={"error": "Failed to download the image"}, status_code=400)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
