from sqlalchemy import Column, Integer, String, Text, Float, DateTime, LargeBinary
from sqlalchemy.dialects.postgresql import ARRAY
from datetime import datetime
from app.database import Base

class Admin(Base):
    """Admin user model for authentication"""
    __tablename__ = "admins"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

class About(Base):
    """About section content"""
    __tablename__ = "about"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, default="About Me")
    subtitle = Column(String, default="GET TO KNOW ME")
    role = Column(String)
    description = Column(Text)
    profile_image = Column(String, nullable=True)  # Cloudinary URL
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Hero(Base):
    """Hero section content"""
    __tablename__ = "hero"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, default="Maman Das")
    title = Column(String, default="Creative Designer & Full-Stack Developer")
    description = Column(Text, default="I craft beautiful, interactive digital experiences")
    hero_image = Column(String, nullable=True)  # Cloudinary URL
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Skill(Base):
    """Skills model"""
    __tablename__ = "skills"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    level = Column(Integer, default=50)  # 0-100
    category = Column(String)  # frontend, backend, tools, design
    created_at = Column(DateTime, default=datetime.utcnow)

class Project(Base):
    """Projects portfolio"""
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    tech = Column(String)  # Comma-separated technologies
    github = Column(String, nullable=True)
    live = Column(String, nullable=True)
    image = Column(String, nullable=True)  # Cloudinary URL
    created_at = Column(DateTime, default=datetime.utcnow)

class Experience(Base):
    """Work experience"""
    __tablename__ = "experience"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    company = Column(String)
    duration = Column(String)
    description = Column(Text)
    highlights = Column(String)  # Comma-separated highlights
    created_at = Column(DateTime, default=datetime.utcnow)

class ContactInfo(Base):
    """Contact information"""
    __tablename__ = "contact_info"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String)
    phone = Column(String)
    location = Column(String)
    whatsapp = Column(String, nullable=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class ContactMessage(Base):
    """Contact form submissions"""
    __tablename__ = "contact_messages"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    subject = Column(String)
    message = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

class Resume(Base):
    """Resume file"""
    __tablename__ = "resume"
    
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String)
    resume_url = Column(String, nullable=True)  # Cloudinary URL
    uploaded_at = Column(DateTime, default=datetime.utcnow)
