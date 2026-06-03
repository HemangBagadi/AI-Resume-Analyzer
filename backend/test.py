import google.generativeai as genai

genai.configure(
    api_key="AIzaSyCMWV2JUr7xxy7fdgHs2WI3s0_7bbfDFYw"
)

model = genai.GenerativeModel(
    "gemini-2.0-flash"
)

response = model.generate_content(
    "Say hello"
)

print(response.text)