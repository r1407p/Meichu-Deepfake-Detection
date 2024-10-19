from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import uvicorn
from typing import List
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
    imageUrls: List[str]
    videoUrls: List[str]

@app.post("/check")
async def check_image(request: ImageCheckRequest):
    try:
        print(request.imageUrls)
        res = []
        for url in request.imageUrls:
            # response = requests.get(url)
            if True:
                res.append({"isAIgenerated": True})
                continue
                content_type = response.headers['Content-Type']
                if content_type.startswith('image/'):
                    res.append({"isAIgenerated": True})
                else:
                    res.append({"isAIgenerated": False})
        for url in request.videoUrls:
            print(url)
        if True:
            return JSONResponse(content={
                "data":res,                                     
                "histogramData": [30, 45, 25],
                "donutData": {
                "aiPercentage": 40,
                "nonAiPercentage": 60
            }}, status_code=200)

        else:
            return JSONResponse(content={"error": "Failed to download the image"}, status_code=400)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=7000)
