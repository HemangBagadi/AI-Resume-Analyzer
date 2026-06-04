# AI Resume Analyzer

An AI-powered Resume Analyzer that evaluates resumes against job descriptions, calculates ATS compatibility scores, identifies strengths and weaknesses, generates AI-driven insights, and stores analysis history.

## Features

### Resume Analysis

* Upload Resume (PDF/DOCX)
* ATS Score Calculation
* Resume Preview
* Skill Matching Analysis
* Missing Skills Detection

### AI Insights

* AI Resume Summary
* Strengths Analysis
* Weakness Analysis
* Improvement Suggestions
* Hiring Chance Estimation

### User Features

* Login & Signup Authentication
* Secure JWT Authentication
* Analysis History
* Download PDF Reports
* Dark Mode Support

### Dashboard

* ATS Score Visualization
* AI Insights Charts
* Analysis History Tracking
* Responsive Modern UI

---

## Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios
* Recharts
* Lucide React

### Backend

* FastAPI
* Python
* Sentence Transformers
* ReportLab

### Database

* MongoDB Atlas

### AI & NLP

* Sentence Transformers
* Google Gemini AI
* SpaCy

---

## Project Architecture

AI Resume Analyzer

├── Frontend (React)

│ ├── Authentication

│ ├── Resume Upload

│ ├── Dashboard

│ ├── ATS Score Visualization

│ └── History Tracking

│

├── Backend (FastAPI)

│ ├── Resume Processing

│ ├── AI Analysis

│ ├── ATS Scoring

│ ├── PDF Generation

│ └── Authentication

│

└── MongoDB Atlas

├── Users

└── Reports

---

## Screenshots

### Home Page

![Home](screenshots/home.png)

### Resume Upload

![Upload](screenshots/upload.png)

### ATS Analysis Results

![Results](screenshots/results.png)

### Analysis History

![History](screenshots/history.png)

---

## Installation

### Clone Repository

```bash
git clone https://github.com/HemangBagadi/AI-Resume-Analyzer.git

cd AI-Resume-Analyzer
```

### Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python -m uvicorn app:app --reload
```

Backend runs on:

```text
http://127.0.0.1:8000
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## ATS Scoring Logic

The ATS Score is calculated using:

* Semantic Similarity (70%)
* Skill Match Percentage (30%)

This provides a more realistic ATS compatibility score by combining AI understanding and keyword matching.

---

## Future Improvements

* Resume Optimization Suggestions
* Multi-Resume Comparison
* Recruiter Dashboard
* Cloud Deployment
* LinkedIn Profile Analysis
* Resume Version Management
* Advanced ATS Simulation

---

## Author

### Hemang Bagadi

Aspiring Full Stack Developer

Skills:

* React
* FastAPI
* MongoDB
* Python
* AI Integration
* NLP

## Live Demo

Frontend:
https://ai-resume-analyzer-beta-olive.vercel.app/

## Note

This project's frontend is publicly deployed using Vercel.

The backend (FastAPI, MongoDB, ATS analysis, and AI processing) is configured for local development and is not currently hosted online due AI model memory requirements.

For a complete demonstration, please refer to the screenshots and demo video.


GitHub:
https://github.com/HemangBagadi

---

## License

This project is created for learning, portfolio, and educational purposes.
