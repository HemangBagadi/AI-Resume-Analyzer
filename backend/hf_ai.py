import google.generativeai as genai

from dotenv import load_dotenv

import os
import json

# Load env

load_dotenv()

# Configure Gemini

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

# Load model

model = genai.GenerativeModel(
    "models/gemini-2.5-flash"
)

def generate_ai_summary(
    resume_text,
    job_description=""
):

    try:

        prompt = f"""
        You are an ATS Resume Analyzer AI.

        Analyze the resume professionally.

        Resume:
        {resume_text}

        Job Description:
        {job_description}

        Return ONLY valid JSON.

        Example format:

        {{
          "summary": "...",
          "strengths": [
            "...",
            "..."
          ],
          "weaknesses": [
            "...",
            "..."
          ],
          "suggestions": [
            "...",
            "..."
          ]
        }}
        """

        response = model.generate_content(
            prompt
        )

        text = response.text.strip()

        # Remove markdown if Gemini adds it

        text = text.replace(
            "```json",
            ""
        )

        text = text.replace(
            "```",
            ""
        )

        parsed = json.loads(text)

        return parsed

    except Exception as e:

        print(
            "GEMINI ERROR:",
            str(e)
        )

        return {

            "summary":
            "AI analysis unavailable.",

            "strengths": [],

            "weaknesses": [],

            "suggestions": []
        }