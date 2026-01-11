from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.v1.endpoints import tasks, auth
from core.config import settings


from sqlmodel import SQLModel
from database.session import engine

# Disable redirect_slashes to avoid 307 redirects that cause CORS issues
app = FastAPI(title="Todo API", version="1.0.0", redirect_slashes=False)


@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)


# Add CORS middleware - must be added before routes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
)


# Include API routes
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(tasks.router, prefix="/api/tasks", tags=["tasks"])


@app.get("/api/health")
def health_check():
    return {"status": "healthy"}


@app.get("/")
def root():
    return {"message": "Welcome to the Todo API"}