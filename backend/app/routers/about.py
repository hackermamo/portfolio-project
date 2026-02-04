from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import About
from app.schemas import AboutCreate, AboutResponse
from app.security import verify_token
from app.cloudinary_utils import upload_image, delete_image

router = APIRouter()

@router.get("/about", response_model=AboutResponse)
def get_about(db: Session = Depends(get_db)):
    """Get about section content"""
    about = db.query(About).first()
    if not about:
        # Create and return default if not exists
        from datetime import datetime
        default_description = "My name is Maman Das, and I am currently pursuing a Bachelor's degree in Computer Science and Engineering (CSE). Alongside my academic journey, I am a freelance graphic designer with over 4 years of hands-on experience in creative visual design.\n\nI specialize in branding, logo design, UI/UX, event branding, and digital creatives, with a strong focus on visual storytelling and unique concepts.\n\nMy background in CSE also gives me a basic understanding of coding and technology, which helps me bridge creativity with technical thinking and deliver modern, impactful design solutions."
        return {
            "id": 0,
            "title": "About Me",
            "subtitle": "GET TO KNOW ME",
            "role": "Creative Designer & Visual Storyteller",
            "description": default_description,
            "updated_at": datetime.utcnow()
        }
    return about

@router.put("/about", response_model=AboutResponse)
async def update_about(
    title: str = None,
    subtitle: str = None,
    role: str = None,
    description: str = None,
    file: UploadFile = File(None),
    db: Session = Depends(get_db),
    email: str = Depends(verify_token)
):
    """Update about section with optional profile image upload (admin only)"""
    about = db.query(About).first()
    
    if about:
        if title:
            about.title = title
        if subtitle:
            about.subtitle = subtitle
        if role:
            about.role = role
        if description:
            about.description = description
    else:
        about = About(
            title=title or "About Me",
            subtitle=subtitle or "GET TO KNOW ME",
            role=role or "Designer",
            description=description or ""
        )
        db.add(about)
    
    # Handle profile image upload
    if file:
        try:
            # Delete old image if exists
            if about.profile_image:
                delete_image("portfolio/about/profile_image")
            
            # Upload new image
            file_content = await file.read()
            image_url = upload_image(
                file_content,
                folder="portfolio/about",
                public_id="profile_image"
            )
            if image_url:
                about.profile_image = image_url
        except Exception as e:
            print(f"Error uploading profile image: {e}")
    
    db.commit()
    db.refresh(about)
    return about
