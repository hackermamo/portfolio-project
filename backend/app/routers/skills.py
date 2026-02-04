from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import Skill
from app.schemas import SkillCreate, SkillResponse
from app.security import verify_token

router = APIRouter()

@router.get("/skills", response_model=List[SkillResponse])
def get_skills(db: Session = Depends(get_db)):
    """Get all skills"""
    skills = db.query(Skill).all()
    return skills

@router.post("/skills", response_model=SkillResponse)
def create_skill(
    skill: SkillCreate,
    db: Session = Depends(get_db),
    email: str = Depends(verify_token)
):
    """Create new skill (admin only)"""
    db_skill = Skill(**skill.dict())
    db.add(db_skill)
    db.commit()
    db.refresh(db_skill)
    return db_skill

@router.put("/skills/{skill_id}", response_model=SkillResponse)
def update_skill(
    skill_id: int,
    skill: SkillCreate,
    db: Session = Depends(get_db),
    email: str = Depends(verify_token)
):
    """Update skill (admin only)"""
    db_skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not db_skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    
    db_skill.name = skill.name
    db_skill.level = skill.level
    db_skill.category = skill.category
    db.commit()
    db.refresh(db_skill)
    return db_skill

@router.delete("/skills/{skill_id}")
def delete_skill(
    skill_id: int,
    db: Session = Depends(get_db),
    email: str = Depends(verify_token)
):
    """Delete skill (admin only)"""
    db_skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not db_skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    
    db.delete(db_skill)
    db.commit()
    return {"message": "Skill deleted"}
