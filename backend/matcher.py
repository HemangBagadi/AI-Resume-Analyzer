from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

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


def calculate_match_score(
    resume_text,
    job_description
):

    embeddings = model.encode([
        resume_text,
        job_description
    ])

    semantic_score = (
        cosine_similarity(
            [embeddings[0]],
            [embeddings[1]]
        )[0][0]
        * 100
    )

    resume_lower = resume_text.lower()

    job_lower = job_description.lower()

    required_skills = [
        skill
        for skill in SKILLS
        if skill in job_lower
    ]

    matched_skills = [
        skill
        for skill in required_skills
        if skill in resume_lower
    ]

    if len(required_skills) == 0:

        skill_score = 100

    else:

        skill_score = (
            len(matched_skills)
            /
            len(required_skills)
        ) * 100

    final_score = float(
    semantic_score * 0.7
    +
    skill_score * 0.3
)

    return round(
    final_score,
    2
)
