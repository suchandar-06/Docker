from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import jobs
from app.database import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="India Jobs & Packages API",
    description="REST API connected to MySQL for job listings and packages in India",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(jobs.router, prefix="/api/jobs", tags=["Jobs"])

@app.get("/")
def root():
    return {
        "status": "online",
        "service": "India Jobs & Salary Packages API",
        "docs": "/docs",
        "health": "/health"
    }

@app.get("/health")
def health():
    return {"status": "healthy"}
