import os
import io
import time
import json
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

try:
    import google.generativeai as genai
except ImportError:
    genai = None

app = FastAPI(title="TrustDoc AI Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# You can set this in your environment variables before running the backend
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")

@app.post("/api/analyze")
async def analyze_document(file: UploadFile = File(...)):
    image_bytes = await file.read()
    
    if not GEMINI_API_KEY or genai is None:
        # ---- DEVELOPMENT MOCK FALLBACK ----
        # If API key is not in environment, or google-generativeai is not installed, show fallback.
        print("⚠️ Gemini API Key not found or google-generativeai module missing. Serving Mock Data.")
        time.sleep(2) # simulate scanning speed
        return {
            "status": "FORGED",
            "confidence": 94.2,
            "reasons": [
                {
                    "id": 1, 
                    "title": "Font Mismatch Detected", 
                    "desc": "The font tracing in the specific region does not match the baseline font signatures of the document.", 
                    "region": {"top": "35%", "left": "40%", "width": "20%", "height": "8%"}
                },
                {
                    "id": 2, 
                    "title": "Edited Region Detected", 
                    "desc": "Compression artifacts indicate that a patch was copy-pasted over the original signature block.", 
                    "region": {"top": "75%", "left": "55%", "width": "30%", "height": "15%"}
                }
            ]
        }
    
    genai.configure(api_key=GEMINI_API_KEY)
    
    # Initialize the Gemini vision-capable model
    model = genai.GenerativeModel('gemini-2.5-flash')
    
    prompt = """
    You are an expert AI document forgery detector. Analyze the provided image of a document (certificate, ID, etc.).
    Determine if this document looks GENUINE or FORGED.
    Look for any signs of tampering, font mismatch, incorrect spelling, copy-paste artifacts, digital alterations, inconsistent lighting, or misaligned text.
    Return your response purely in valid JSON format. Provide the following fields:
    - "status": string, exactly "GENUINE" or "FORGED"
    - "confidence": float, 0.0 to 100.0, your confidence score
    - "reasons": a list of objects explaining why it's forged (or genuine). Each object needs:
      - "id": integer
      - "title": string (short title)
      - "desc": string (detailed breakdown)
      - "region": an object with "top", "left", "width", "height" as percentage strings (e.g., "10%"). Give an estimated location of the issue on the document. If the document is genuine, list 1 reason saying everything looks authentic, with a region {"top": "0%", "left": "0%", "width": "100%", "height": "100%"}.
      
    Example JSON:
    {
      "status": "FORGED",
      "confidence": 98.5,
      "reasons": [
        {
          "id": 1,
          "title": "Font Mismatch",
          "desc": "The name field uses a different font weight and kerning compared to the surrounding text.",
          "region": {"top": "40%", "left": "30%", "width": "20%", "height": "5%"}
        }
      ]
    }
    """
    
    try:
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        response = model.generate_content([prompt, image])
        
        # Parse JSON from response
        # Sometimes LLMs wrap JSON in markdown blocks
        text = response.text.strip()
        if text.startswith("```json"):
            text = text[7:]
        if text.startswith("```"):
            text = text[3:]
        if text.endswith("```"):
            text = text[:-3]
            
        data = json.loads(text.strip())
        return data
        
    except Exception as e:
        print(f"Error communicating with Gemini: {e}")
        return {
            "status": "ERROR", 
            "confidence": 0, 
            "reasons": [{"id": 0, "title": "AI Error", "desc": str(e), "region": None}]
        }
