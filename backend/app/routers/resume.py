from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Resume
from app.security import verify_token
import os
import shutil
from pathlib import Path

router = APIRouter()

# Define the upload directory
UPLOAD_DIR = Path(__file__).parent.parent.parent / "test_gallery"
UPLOAD_DIR.mkdir(exist_ok=True)

@router.get("/resume")
def get_resume(db: Session = Depends(get_db)):
    """Get resume URL"""
    resume = db.query(Resume).first()
    if resume and resume.resume_url:
        return {
            "id": resume.id,
            "filename": resume.filename,
            "url": resume.resume_url,
            "uploaded_at": resume.uploaded_at
        }
    return {
        "url": None,
        "message": "No resume uploaded yet"
    }

@router.post("/resume")
async def upload_resume(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    email: str = Depends(verify_token)
):
    """Upload resume to local storage (admin only)"""
    try:
        # Validate file type
        if not file.filename.endswith(('.pdf', '.doc', '.docx')):
            raise HTTPException(status_code=400, detail="Only PDF, DOC, or DOCX files are allowed")
        
        # Save file with fixed name to test_gallery
        file_content = await file.read()
        file_path = UPLOAD_DIR / "resume.pdf"
        
        # Save the file
        with open(file_path, "wb") as f:
            f.write(file_content)
        
        # Store relative path for serving
        resume_url = f"/test_gallery/resume.pdf"
        
        # Delete old resume if exists and update
        old_resume = db.query(Resume).first()
        if old_resume:
            old_resume.filename = file.filename
            old_resume.resume_url = resume_url
            db.commit()
            db.refresh(old_resume)
            resume = old_resume
        else:
            resume = Resume(
                filename=file.filename,
                resume_url=resume_url
            )
            db.add(resume)
            db.commit()
            db.refresh(resume)
        
        return {
            "id": resume.id,
            "filename": resume.filename,
            "url": resume_url,
            "message": "Resume uploaded successfully"
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error uploading resume: {e}")
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/resume")
def delete_resume(
    db: Session = Depends(get_db),
    email: str = Depends(verify_token)
):
    """Delete resume (admin only)"""
    try:
        resume = db.query(Resume).first()
        if resume:
            # Delete physical file if exists
            file_path = UPLOAD_DIR / "resume.pdf"
            if file_path.exists():
                file_path.unlink()
            
            db.delete(resume)
            db.commit()
            return {"message": "Resume deleted successfully"}
        return {"message": "No resume found"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


