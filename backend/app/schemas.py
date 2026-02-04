from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# Auth Schemas
class AdminLogin(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    token: str
    token_type: str = "bearer"

# About Schema
class AboutCreate(BaseModel):
    title: str
    subtitle: str
    role: str
    description: str

class AboutResponse(AboutCreate):
    id: int
    profile_image: Optional[str] = None
    updated_at: datetime
    
    class Config:
        from_attributes = True

# Hero Schema
class HeroCreate(BaseModel):
    name: str
    title: str
    description: str

class HeroResponse(HeroCreate):
    id: int
    hero_image: Optional[str] = None
    updated_at: datetime
    
    class Config:
        from_attributes = True

# Skill Schema
class SkillCreate(BaseModel):
    name: str
    level: int = 50
    category: str

class SkillResponse(SkillCreate):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Project Schema
class ProjectCreate(BaseModel):
    title: str
    description: str
    tech: List[str] = []
    github: Optional[str] = None
    live: Optional[str] = None

class ProjectResponse(BaseModel):
    id: int
    title: str
    description: str
    tech: List[str]
    github: Optional[str]
    live: Optional[str]
    image: Optional[str] = None  # Cloudinary image URL
    created_at: datetime
    
    class Config:
        from_attributes = True

# Experience Schema
class ExperienceCreate(BaseModel):
    title: str
    company: str
    duration: str
    description: str
    highlights: List[str]

class ExperienceResponse(BaseModel):
    id: int
    title: str
    company: str
    duration: str
    description: str
    highlights: List[str]
    created_at: datetime
    
    class Config:
        from_attributes = True

# Contact Info Schema
class ContactInfoCreate(BaseModel):
    email: str
    phone: str
    location: str
    whatsapp: Optional[str] = None

class ContactInfoResponse(ContactInfoCreate):
    id: int
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# Contact Message Schema
class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class ContactMessageResponse(ContactMessageCreate):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Resume Schema
class ResumeResponse(BaseModel):
    id: int
    filename: str
    resume_url: Optional[str] = None
    uploaded_at: datetime
    
    class Config:
        from_attributes = True
