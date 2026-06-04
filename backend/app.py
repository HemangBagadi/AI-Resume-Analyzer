print("APP STARTING...")

from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

from auth import (
    hash_password,
    verify_password,
    create_access_token,
    fake_users_db
)

from database import (
    users_collection,
    reports_collection
)

from hf_ai import generate_ai_summary

from resume_parser import (
    extract_text_from_pdf,
    extract_text_from_docx
)

from matcher import calculate_match_score

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.lib.styles import getSampleStyleSheet

import os

app = FastAPI()

# CORS

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Upload folder

UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)

# Skills database

SKILLS = [
    "python",
    "java",
    "javascript",
    "react",
    "node.js",
    "fastapi",
    "sql",
    "mongodb",
    "docker",
    "aws",
    "html",
    "css",
    "tailwind",
    "machine learning",
    "ai",
    "git",
    "github"
]

# HOME ROUTE

@app.get("/")
def home():

    return {
        "message": "AI Resume Analyzer Running"
    }

# SIGNUP ROUTE

@app.post("/signup")
async def signup(
    username: str = Form(...),
    password: str = Form(...)
):

    existing_user = users_collection.find_one(
        {
            "username": username
        }
    )

    if existing_user:

        return {
            "error": "User already exists"
        }

    users_collection.insert_one(
        {
            "username": username,
            "password": hash_password(password)
        }
    )

    return {
        "message": "Signup successful"
    }

# LOGIN ROUTE

@app.post("/login")
async def login(
    username: str = Form(...),
    password: str = Form(...)
):

    user = users_collection.find_one(
    {
        "username": username
    }
)

    if not user:

        return {
            "error": "User not found"
        }

    if not verify_password(
        password,
        user["password"]
    ):

        return {
            "error": "Incorrect password"
        }

    token = create_access_token({
        "sub": username
    })

    return {

    "access_token": token,

    "token_type": "bearer",

    "username": username
}
# SAVE REPORT ROUTE

@app.post("/save-report")
async def save_report(data: dict):

    reports_collection.insert_one(data)

    return {
        "message": "Report saved successfully"
    }
# GET REPORTS ROUTE

@app.get("/reports/{username}")
async def get_reports(username: str):

    reports = list(

        reports_collection.find(
            {
                "username": username
            },
            {
                "_id": 0
            }
        )
    )

    return {
        "reports": reports
    }

# ANALYZE ROUTE

@app.post("/analyze")
async def analyze_resume(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):

    try:

        print("Request received")

        # Save uploaded file

        file_path = os.path.join(
            UPLOAD_FOLDER,
            file.filename
        )

        with open(file_path, "wb") as f:

            f.write(await file.read())

        print("File saved")

        # Extract text

        if file.filename.endswith(".pdf"):

            resume_text = extract_text_from_pdf(
                file_path
            )

        elif file.filename.endswith(".docx"):

            resume_text = extract_text_from_docx(
                file_path
            )

        else:

            return {
                "error": "Unsupported file format"
            }

        print("Text extracted")

        resume_text_lower = (
            resume_text.lower()
        )

        job_description_lower = (
            job_description.lower()
        )

        matched_skills = []

        missing_skills = []

        suggestions = []

        strengths = []

        weaknesses = []

        # SKILL MATCHING

        for skill in SKILLS:

            if (
                skill in resume_text_lower
                and
                skill in job_description_lower
            ):

                matched_skills.append(skill)

                strengths.append(
                    f"Strong knowledge of {skill}"
                )

            elif (
                skill in job_description_lower
                and
                skill not in resume_text_lower
            ):

                missing_skills.append(skill)

                weaknesses.append(
                    f"Missing {skill} skill"
                )

                suggestions.append(
                    f"Consider adding {skill} projects or experience."
                )

        # EXTRA ANALYSIS

        if "github" not in resume_text_lower:

            suggestions.append(
                "Add your GitHub profile."
            )

        if "linkedin" not in resume_text_lower:

            suggestions.append(
                "Add your LinkedIn profile."
            )

        if "project" in resume_text_lower:

            strengths.append(
                "Projects section adds practical credibility."
            )

        else:

            weaknesses.append(
                "Projects section is missing."
            )

            suggestions.append(
                "Add 2-3 strong projects related to the job role."
            )

        if "education" in resume_text_lower:

            strengths.append(
                "Education details are included."
            )

        else:

            weaknesses.append(
                "Education section is missing."
            )

        if (
            "developed" in resume_text_lower
            or
            "built" in resume_text_lower
            or
            "created" in resume_text_lower
        ):

            strengths.append(
                "Resume includes action-oriented achievements."
            )

        else:

            suggestions.append(
                "Use stronger action verbs like Developed, Built, Created."
            )

        print("Skills analyzed")

        # ATS SCORE

        score = calculate_match_score(
            resume_text,
            job_description
        )

        print("Score calculated")

        # GEMINI AI

        ai_response = generate_ai_summary(
            resume_text[:1500],
            job_description[:1000]
        )

        print("Summary generated")

        # INSIGHTS

        hiring_chance = round(
            min(score + 10, 100),
            2
        )

        ats_optimization = round(
            min(score + 20, 100),
            2
        )

        keyword_relevance = round(
            min(score + 15, 100),
            2
        )

        readability = round(
            min(score + 25, 100),
            2
        )

        print("Returning result")

        return {

            "match_score": round(
                float(score),
                2
            ),

            "matched_skills": matched_skills,

            "missing_skills": missing_skills,

            "strengths": strengths,

            "weaknesses": weaknesses,

            "suggestions": suggestions,

            "summary": ai_response.get(
                "summary",
                ""
            ),

            "ai_strengths": ai_response.get(
                "strengths",
                []
            ),

            "ai_weaknesses": ai_response.get(
                "weaknesses",
                []
            ),

            "ai_suggestions": ai_response.get(
                "suggestions",
                []
            ),

            "insights": {

                "hiring_chance": hiring_chance,

                "ats_optimization": ats_optimization,

                "keyword_relevance": keyword_relevance,

                "resume_readability": readability
            }
        }

    except Exception as e:

        print("ERROR:", str(e))

        return {
            "error": str(e)
        }

# DOWNLOAD PDF REPORT

@app.post("/download-report")
def download_report(report: dict):

    file_path = "resume_report.pdf"

    doc = SimpleDocTemplate(
        file_path
    )

    styles = getSampleStyleSheet()

    content = []

    content.append(
        Paragraph(
            "AI Resume Analyzer Report",
            styles["Title"]
        )
    )

    content.append(
        Spacer(1, 20)
    )

    content.append(
        Paragraph(
            f"ATS Score: {report['match_score']}%",
            styles["Heading2"]
        )
    )

    content.append(
        Spacer(1, 15)
    )

    content.append(
        Paragraph(
            "Resume Summary",
            styles["Heading2"]
        )
    )

    content.append(
        Paragraph(
            report["summary"],
            styles["BodyText"]
        )
    )

    content.append(
        Spacer(1, 15)
    )

    content.append(
        Paragraph(
            "Matched Skills",
            styles["Heading2"]
        )
    )

    for skill in report["matched_skills"]:

        content.append(
            Paragraph(
                f"• {skill}",
                styles["BodyText"]
            )
        )

    content.append(
        Spacer(1, 15)
    )

    content.append(
        Paragraph(
            "Missing Skills",
            styles["Heading2"]
        )
    )

    for skill in report["missing_skills"]:

        content.append(
            Paragraph(
                f"• {skill}",
                styles["BodyText"]
            )
        )

    content.append(
        Spacer(1, 15)
    )

    content.append(
        Paragraph(
            "Strengths",
            styles["Heading2"]
        )
    )

    for item in report["ai_strengths"]:

        content.append(
            Paragraph(
                f"• {item}",
                styles["BodyText"]
            )
        )

    content.append(
        Spacer(1, 15)
    )

    content.append(
        Paragraph(
            "Weaknesses",
            styles["Heading2"]
        )
    )

    for item in report["ai_weaknesses"]:

        content.append(
            Paragraph(
                f"• {item}",
                styles["BodyText"]
            )
        )

    content.append(
        Spacer(1, 15)
    )

    content.append(
        Paragraph(
            "Suggestions",
            styles["Heading2"]
        )
    )

    for item in report["ai_suggestions"]:

        content.append(
            Paragraph(
                f"• {item}",
                styles["BodyText"]
            )
        )

    content.append(
        Spacer(1, 20)
    )

    content.append(
        Paragraph(
            "Generated by ResumeAI",
            styles["Italic"]
        )
    )

    doc.build(content)

    return FileResponse(
        path=file_path,
        filename="resume_report.pdf",
        media_type="application/pdf"
    )