"""
RAG Pipeline for Compliance Q&A

This module handles:
1. Loading compliance documents
2. Creating embeddings with OpenAI
3. Storing/retrieving from ChromaDB
4. Generating responses with GPT
"""

import json
import os
from pathlib import Path
from typing import List, Dict, Any

import chromadb
from openai import OpenAI

# Initialize OpenAI client
client = OpenAI()

# Initialize ChromaDB (persistent storage in ./chroma_db)
chroma_client = chromadb.PersistentClient(path="./chroma_db")

# Collection name for our compliance documents
COLLECTION_NAME = "compliance_docs"


def load_documents() -> List[Dict[str, Any]]:
    """Load compliance documents from JSON file."""
    data_path = Path(__file__).parent / "data" / "compliance_docs.json"
    with open(data_path, "r") as f:
        data = json.load(f)
    return data["documents"]


def get_embedding(text: str) -> List[float]:
    """Get embedding vector for a text using OpenAI."""
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    return response.data[0].embedding


def initialize_vector_store():
    """
    Initialize the vector store with compliance documents.
    Only runs if the collection is empty.
    """
    # Get or create collection
    collection = chroma_client.get_or_create_collection(
        name=COLLECTION_NAME,
        metadata={"description": "NIST CSF 2.0 and ISO 27001 compliance documents"}
    )

    # Check if already populated
    if collection.count() > 0:
        print(f"Vector store already has {collection.count()} documents")
        return collection

    # Load documents
    documents = load_documents()
    print(f"Loading {len(documents)} compliance documents...")

    # Prepare data for ChromaDB
    ids = []
    embeddings = []
    metadatas = []
    contents = []

    for doc in documents:
        # Create searchable text combining title and content
        searchable_text = f"{doc['title']}: {doc['content']}"

        ids.append(doc["id"])
        embeddings.append(get_embedding(searchable_text))
        metadatas.append({
            "source": doc["source"],
            "section": doc["section"],
            "title": doc["title"]
        })
        contents.append(doc["content"])

    # Add to collection
    collection.add(
        ids=ids,
        embeddings=embeddings,
        metadatas=metadatas,
        documents=contents
    )

    print(f"Successfully loaded {len(documents)} documents into vector store")
    return collection


def retrieve_relevant_docs(query: str, top_k: int = 4) -> List[Dict[str, Any]]:
    """
    Retrieve the most relevant compliance documents for a query.

    Args:
        query: The customer question
        top_k: Number of documents to retrieve

    Returns:
        List of relevant documents with metadata
    """
    collection = chroma_client.get_collection(name=COLLECTION_NAME)

    # Get query embedding
    query_embedding = get_embedding(query)

    # Search for similar documents
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k,
        include=["documents", "metadatas", "distances"]
    )

    # Format results
    relevant_docs = []
    for i in range(len(results["ids"][0])):
        relevant_docs.append({
            "id": results["ids"][0][i],
            "content": results["documents"][0][i],
            "source": results["metadatas"][0][i]["source"],
            "section": results["metadatas"][0][i]["section"],
            "title": results["metadatas"][0][i]["title"],
            "relevance_score": 1 - results["distances"][0][i]  # Convert distance to similarity
        })

    return relevant_docs


def generate_response(question: str, relevant_docs: List[Dict[str, Any]]) -> str:
    """
    Generate a vendor response using retrieved compliance documents.

    Args:
        question: The customer question
        relevant_docs: Retrieved compliance documents

    Returns:
        Generated vendor response
    """
    # Build context from retrieved documents
    context_parts = []
    for doc in relevant_docs:
        context_parts.append(
            f"[{doc['source']} - {doc['section']}]\n"
            f"{doc['title']}: {doc['content']}"
        )
    context = "\n\n".join(context_parts)

    # System prompt for professional vendor responses
    system_prompt = """You are a security compliance expert helping vendors respond to customer security questionnaires.
Your responses should be:
1. Professional and confident
2. Specific to the question asked
3. Reference relevant compliance frameworks (NIST CSF 2.0, ISO 27001)
4. Structured with clear sections when appropriate
5. Concise but comprehensive

Use the provided compliance framework context to inform your response.
Do NOT make up capabilities - only reference what is standard practice based on the frameworks."""

    # User prompt with context and question
    user_prompt = f"""Customer Question:
{question}

Relevant Compliance Framework Context:
{context}

Generate a professional vendor response that addresses the customer's question using the compliance framework context above. Include specific references to the frameworks where appropriate."""

    # Generate response
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.7,
        max_tokens=1000
    )

    return response.choices[0].message.content


def ask_compliance_question(question: str) -> Dict[str, Any]:
    """
    Main function: Process a compliance question through the RAG pipeline.

    Args:
        question: Customer's security question

    Returns:
        Dict with response, sources, and relevant snippets
    """
    # Step 1: Retrieve relevant documents
    relevant_docs = retrieve_relevant_docs(question, top_k=4)

    # Step 2: Generate response
    response = generate_response(question, relevant_docs)

    # Step 3: Extract unique sources
    sources = list(set(doc["source"] for doc in relevant_docs))

    return {
        "question": question,
        "response": response,
        "sources": sources,
        "relevant_snippets": [
            {
                "source": doc["source"],
                "section": doc["section"],
                "title": doc["title"],
                "content": doc["content"][:200] + "..." if len(doc["content"]) > 200 else doc["content"],
                "relevance": round(doc["relevance_score"], 3)
            }
            for doc in relevant_docs
        ]
    }


# Initialize on module load (for development)
if __name__ == "__main__":
    print("Initializing vector store...")
    initialize_vector_store()

    # Test query
    test_question = "How does your product ensure that only authorized users can access administrative functions?"
    print(f"\nTest Question: {test_question}\n")

    result = ask_compliance_question(test_question)
    print("Response:")
    print(result["response"])
    print("\nSources:", result["sources"])
