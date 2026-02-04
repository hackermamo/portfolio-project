# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.staticfiles import StaticFiles
# import os

# from app.database import engine
# from app.models import Base
# from app.routers import auth, about, skills, projects, experience, contact, resume, hero

# # Create database tables
# Base.metadata.create_all(bind=engine)

# # Initialize FastAPI app
# app = FastAPI(
#     title="Portfolio API",
#     description="REST API for managing portfolio content",
#     version="1.0.0"
# )

# # CORS middleware
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # In production, specify exact origins
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Include routers
# app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
# app.include_router(about.router, prefix="/api", tags=["About"])
# app.include_router(hero.router, prefix="/api", tags=["Hero"])
# app.include_router(skills.router, prefix="/api", tags=["Skills"])
# app.include_router(projects.router, prefix="/api", tags=["Projects"])
# app.include_router(experience.router, prefix="/api", tags=["Experience"])
# app.include_router(contact.router, prefix="/api", tags=["Contact"])
# app.include_router(resume.router, prefix="/api", tags=["Resume"])

# # Serve test_gallery files
# from fastapi.staticfiles import StaticFiles
# from pathlib import Path
# test_gallery_path = Path(__file__).parent / "test_gallery"
# test_gallery_path.mkdir(exist_ok=True)
# app.mount("/test_gallery", StaticFiles(directory=str(test_gallery_path)), name="test_gallery")

# # Health check endpoint
# @app.get("/api/health")
# def health_check():
#     return {"status": "ok", "message": "API is running"}

# # Root endpoint
# @app.get("/api")
# def root():
#     return {
#         "message": "Welcome to Portfolio API",
#         "docs": "/docs",
#         "redoc": "/redoc"
#     }

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from app.database import engine
from app.models import Base
from app.routers import auth, about, skills, projects, experience, contact, resume, hero

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title="Portfolio API",
    description="REST API for managing portfolio content",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(about.router, prefix="/api", tags=["About"])
app.include_router(hero.router, prefix="/api", tags=["Hero"])
app.include_router(skills.router, prefix="/api", tags=["Skills"])
app.include_router(projects.router, prefix="/api", tags=["Projects"])
app.include_router(experience.router, prefix="/api", tags=["Experience"])
app.include_router(contact.router, prefix="/api", tags=["Contact"])
app.include_router(resume.router, prefix="/api", tags=["Resume"])

# Serve test_gallery files
from fastapi.staticfiles import StaticFiles
from pathlib import Path
test_gallery_path = Path(__file__).parent / "test_gallery"
test_gallery_path.mkdir(exist_ok=True)
app.mount("/test_gallery", StaticFiles(directory=str(test_gallery_path)), name="test_gallery")

# Health check endpoint
@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "API is running"}

# Root endpoint
@app.get("/api")
def root():
    return {
        "message": "Welcome to Portfolio API",
        "docs": "/docs",
        "redoc": "/redoc"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
