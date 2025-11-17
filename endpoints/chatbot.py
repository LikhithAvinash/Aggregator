from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

# --- Configuration ---
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# --- APIRouter Instance ---
router = APIRouter()

# --- Pydantic Models ---
class ChatRequest(BaseModel):
    query: str

class ChatResponse(BaseModel):
    response: str

# --- LangChain Setup ---
if not GEMINI_API_KEY:
    raise Exception("GEMINI_API_KEY environment variable not set.")

llm = ChatGoogleGenerativeAI(model="gemini-pro-latest", google_api_key=GEMINI_API_KEY)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant for the Developer Dashboard. You have access to information from various developer platforms. Here are the available features that you can answer questions about: DEV.to, Kaggle, Codeforces, GitLab, PyPI, npm, Reddit, GitHub, Hacker News, and Stack Overflow. You can ask me to get information about these platforms."),
    ("user", "{query}")
])

chain = prompt | llm | StrOutputParser()

# --- API Endpoints ---
@router.post("/invoke", response_model=ChatResponse)
async def invoke_chatbot(request: ChatRequest):
    """Invokes the chatbot with a user query."""
    if not request.query:
        raise HTTPException(status_code=400, detail="Query cannot be empty.")
    try:
        response = await chain.ainvoke({"query": request.query})
        return ChatResponse(response=response)
    except Exception as e:
        print(f"Backend Error: {e}")
        raise HTTPException(status_code=500, detail=f"Error invoking chatbot: {e}")
