from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import Experience
from app.schemas import ExperienceCreate, ExperienceResponse
from app.security import verify_token

router = APIRouter()

@router.get("/experience", response_model=List[ExperienceResponse])
def get_experience(db: Session = Depends(get_db)):
    """Get all experiences"""
    experiences = db.query(Experience).all()
    result = []
    for exp in experiences:
        highlights = exp.highlights.split(",") if exp.highlights else []
        result.append({
            "id": exp.id,
            "title": exp.title,
            "company": exp.company,
            "duration": exp.duration,
            "description": exp.description,
            "highlights": highlights,
            "created_at": exp.created_at
        })
    return result

@router.post("/experience", response_model=ExperienceResponse)
def create_experience(
    experience: ExperienceCreate,
    db: Session = Depends(get_db),
    email: str = Depends(verify_token)
):
    """Create new experience (admin only)"""
    db_exp = Experience(
        title=experience.title,
        company=experience.company,
        duration=experience.duration,
        description=experience.description,
        highlights=",".join(experience.highlights)
    )
    db.add(db_exp)
    db.commit()
    db.refresh(db_exp)
    
    return {
        "id": db_exp.id,
        "title": db_exp.title,
        "company": db_exp.company,
        "duration": db_exp.duration,
        "description": db_exp.description,
        "highlights": db_exp.highlights.split(","),
        "created_at": db_exp.created_at
    }

@router.put("/experience/{exp_id}", response_model=ExperienceResponse)
def update_experience(
    exp_id: int,
    experience: ExperienceCreate,
    db: Session = Depends(get_db),
    email: str = Depends(verify_token)
):
    """Update experience (admin only)"""
    db_exp = db.query(Experience).filter(Experience.id == exp_id).first()
    if not db_exp:
        raise HTTPException(status_code=404, detail="Experience not found")
    
    db_exp.title = experience.title
    db_exp.company = experience.company
    db_exp.duration = experience.duration
    db_exp.description = experience.description
    db_exp.highlights = ",".join(experience.highlights)
    db.commit()
    db.refresh(db_exp)
    
    return {
        "id": db_exp.id,
        "title": db_exp.title,
        "company": db_exp.company,
        "duration": db_exp.duration,
        "description": db_exp.description,
        "highlights": db_exp.highlights.split(","),
        "created_at": db_exp.created_at
    }

@router.delete("/experience/{exp_id}")
def delete_experience(
    exp_id: int,
    db: Session = Depends(get_db),
    email: str = Depends(verify_token)
):
    """Delete experience (admin only)"""
    db_exp = db.query(Experience).filter(Experience.id == exp_id).first()
    if not db_exp:
        raise HTTPException(status_code=404, detail="Experience not found")
    
    db.delete(db_exp)
    db.commit()
    return {"message": "Experience deleted"}
