from transformers import pipeline

print("Loading AI Feedback model...")

feedback_generator = pipeline(
    "text2text-generation",
    model="google/flan-t5-small"
)

print("AI Feedback model loaded")


def generate_feedback(resume_text, job_description):

    try:

        prompt = f"""
Analyze this resume for the given job description.

Resume:
{resume_text[:800]}

Job Description:
{job_description[:500]}

Provide:
1. Strengths
2. Weaknesses
3. Missing Skills
4. Suggestions
"""

        result = feedback_generator(
            prompt,
            max_length=150,
            truncation=True
        )

        output = result[0]["generated_text"]

        # CLEAN OUTPUT

        output = output.replace("-", "")
        output = output.replace("_", "")
        output = output.replace("•", "")
        output = output.replace("\n\n", "\n")

        cleaned_lines = []

        for line in output.split("\n"):

            stripped = line.strip()

            # Remove long separator lines
            if (
                len(stripped) > 30
                and (
                    set(stripped) == {"-"}
                    or set(stripped) == {"_"}
                )
            ):
                continue

            # Remove empty lines
            if stripped == "":
                continue

            cleaned_lines.append(stripped)

        cleaned_output = "\n".join(cleaned_lines)

        # Fallback response if model gives bad output

        if len(cleaned_output) < 20:

            return """
Strengths:
- Strong technical foundation

Weaknesses:
- Resume lacks detailed project descriptions

Missing Skills:
- Add more industry-related tools

Suggestions:
- Add GitHub profile
- Add real-world projects
- Improve resume formatting
"""

        return cleaned_output

    except Exception as e:

        print("AI FEEDBACK ERROR:", str(e))

        return f"""
Strengths:
- Good programming knowledge

Weaknesses:
- Resume needs improvement

Missing Skills:
- Add more technical skills

Suggestions:
- Add projects
- Improve formatting
- Add LinkedIn and GitHub
"""