from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Hero
from app.schemas import HeroCreate, HeroResponse
from app.security import verify_token
from app.cloudinary_utils import upload_image, delete_image

router = APIRouter()

@router.get("/hero", response_model=HeroResponse)
def get_hero(db: Session = Depends(get_db)):
    """Get hero section content"""
    hero = db.query(Hero).first()
    if not hero:
        # Create and return default if not exists
        from datetime import datetime
        return {
            "id": 0,
            "name": "Maman Das",
            "title": "Creative Designer & Full-Stack Developer",
            "description": "I craft beautiful, interactive digital experiences",
            "hero_image": None,
            "updated_at": datetime.utcnow()
        }
    return hero

@router.put("/hero", response_model=HeroResponse)
async def update_hero(
    name: str = Form(None),
    title: str = Form(None),
    description: str = Form(None),
    file: UploadFile = File(None),
    db: Session = Depends(get_db),
    email: str = Depends(verify_token)
):
    """Update hero section with optional image upload (admin only)"""
    hero = db.query(Hero).first()
    
    if hero:
        if name:
            hero.name = name
        if title:
            hero.title = title
        if description:
            hero.description = description
    else:
        hero = Hero(
            name=name or "Maman Das",
            title=title or "Creative Designer & Full-Stack Developer",
            description=description or "I craft beautiful, interactive digital experiences"
        )
        db.add(hero)
    
    # Handle hero image upload
    if file:
        try:
            # Delete old image if exists
            if hero.hero_image:
                delete_image("portfolio/hero/hero_image")
            
            # Upload new image
            file_content = await file.read()
            image_url = upload_image(
                file_content,
                folder="portfolio/hero",
                public_id="hero_image"
            )
            if image_url:
                hero.hero_image = image_url
        except Exception as e:
            print(f"Error uploading hero image: {e}")
    
    db.commit()
    db.refresh(hero)
    return hero
