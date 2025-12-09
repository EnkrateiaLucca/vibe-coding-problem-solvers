"""
Compliance Q&A API

FastAPI backend that serves the RAG-powered compliance response generator.
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List

from rag import initialize_vector_store, ask_compliance_question


# Request/Response Models
class QuestionRequest(BaseModel):
    question: str

    class Config:
        json_schema_extra = {
            "example": {
                "question": "How does your product ensure that only authorized users can access administrative functions?"
            }
        }


class SnippetResponse(BaseModel):
    source: str
    section: str
    title: str
    content: str
    relevance: float


class AnswerResponse(BaseModel):
    question: str
    response: str
    sources: List[str]
    relevant_snippets: List[SnippetResponse]


# Lifespan context manager for startup/shutdown
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize vector store
    print("Starting up - initializing vector store...")
    initialize_vector_store()
    print("Vector store ready!")
    yield
    # Shutdown: cleanup if needed
    print("Shutting down...")


# Create FastAPI app
app = FastAPI(
    title="Compliance Q&A API",
    description="RAG-powered security compliance response generator using NIST CSF 2.0 and ISO 27001",
    version="1.0.0",
    lifespan=lifespan
)


# API Routes
@app.post("/api/ask", response_model=AnswerResponse)
async def ask_question(request: QuestionRequest):
    """
    Process a customer security question and generate a vendor response.

    The system:
    1. Retrieves relevant compliance framework snippets (NIST CSF 2.0, ISO 27001)
    2. Uses GPT to generate a professional vendor response
    3. Returns the response with source attribution
    """
    if not request.question.strip():
        raise HTTPException(status_code=400, detail="Question cannot be empty")

    try:
        result = ask_compliance_question(request.question)
        return AnswerResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing question: {str(e)}")


@app.get("/api/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "service": "compliance-qa"}


# Serve static files (HTML frontend)
app.mount("/static", StaticFiles(directory="static"), name="static")


# Serve index.html at root
@app.get("/")
async def root():
    return FileResponse("static/index.html")


# Run with: uvicorn main:app --reload
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
