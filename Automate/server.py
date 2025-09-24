import os
import base64
import requests
from io import BytesIO
from flask import Flask, jsonify
from flask_pydantic import validate
from flask_cors import CORS
from pydantic import BaseModel, Field
from dotenv import load_dotenv
from PIL import Image

# Load env vars
load_dotenv()

HF_API_KEY = os.getenv("HF_API_KEY")
HF_MODEL = "Salesforce/blip-image-captioning-base"  # image-to-text model

app = Flask(__name__)
CORS(app)


# -------------------------------
# Input Schema
# -------------------------------
class ImageRequest(BaseModel):
    image_base64: str | None = Field(None, description="Base64 encoded image string")
    image_url: str | None = Field(
        None, description="Direct image URL (e.g. Cloudinary link)"
    )
    detection: str = Field(
        ..., description="Type of detection required (caption, ocr, objects)"
    )
    style: str = Field("informal", description="Output style (strictly 'informal')")

    class Config:
        extra = "forbid"
        validate_assignment = True


# -------------------------------
# Output Schema
# -------------------------------
class ImageResponse(BaseModel):
    title: str = Field(..., description="Short title about the image")
    description: str = Field(..., description="Long informal description of the image")


# -------------------------------
# Hugging Face API Call
# -------------------------------
def query_huggingface(image: Image.Image):
    """Send image to Hugging Face model and return caption"""
    buffered = BytesIO()
    image.save(buffered, format="PNG")
    image_bytes = buffered.getvalue()

    response = requests.post(
        f"https://api-inference.huggingface.co/models/{HF_MODEL}",
        headers={"Authorization": f"Bearer {HF_API_KEY}"},
        data=image_bytes,
    )

    if response.status_code != 200:
        print("Hugging Face error:", response.text)
        return "Unknown image"

    result = response.json()
    caption = result[0]["generated_text"] if isinstance(result, list) else "No caption"
    return caption


# -------------------------------
# Endpoint
# -------------------------------
@app.route("/analyze-image", methods=["POST"])
@validate(body=ImageRequest)
def analyze_image(body: ImageRequest):
    try:
        # Load image
        if body.image_url:
            resp = requests.get(body.image_url)
            resp.raise_for_status()
            image = Image.open(BytesIO(resp.content))
        elif body.image_base64:
            image_bytes = base64.b64decode(body.image_base64)
            image = Image.open(BytesIO(image_bytes))
        else:
            return jsonify({"error": "Provide either image_url or image_base64"}), 400

        # Generate caption
        caption = query_huggingface(image)

        return (
            jsonify(
                {
                    "title": " ".join(caption.split()[:5]),
                    "description": f"{caption}. This is an informal description as requested.",
                }
            ),
            200,
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -------------------------------
# Run server
# -------------------------------
if __name__ == "__main__":
    app.run(debug=True, port=5000)
