from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models import Project
from app.schemas import ProjectResponse
from app.security import verify_token
from app.cloudinary_utils import upload_image, delete_image

router = APIRouter()

@router.get("/projects", response_model=List[ProjectResponse])
def get_projects(db: Session = Depends(get_db)):
    """Get all projects"""
    projects = db.query(Project).all()
    result = []
    for project in projects:
        tech_list = project.tech.split(",") if project.tech else []
        result.append({
            "id": project.id,
            "title": project.title,
            "description": project.description,
            "tech": tech_list,
            "github": project.github,
            "live": project.live,
            "image": project.image,
            "created_at": project.created_at
        })
    return result

@router.post("/projects")
async def create_project(
    title: str = Form(...),
    description: str = Form(...),
    tech: str = Form(""),
    github: str = Form(""),
    live: str = Form(""),
    file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    email: str = Depends(verify_token)
):
    """Create new project with optional image upload (admin only)"""
    print(f"\n=== Creating Project ===")
    print(f"Title: {title}")
    print(f"Description: {description}")
    print(f"Tech: {tech}")
    print(f"File: {file.filename if file else 'None'}")
    
    if not title or not description:
        raise HTTPException(status_code=400, detail="Title and description are required")
    
    image_url = None
    if file and file.filename:
        try:
            print(f"Uploading file: {file.filename}")
            file_content = await file.read()
            if file_content:
                image_url = upload_image(
                    file_content,
                    folder="portfolio/projects",
                    public_id=f"project_{title.lower().replace(' ', '_')}"
                )
                print(f"✓ Image uploaded to Cloudinary: {image_url}")
        except Exception as e:
            print(f"✗ Error uploading image: {str(e)}")
            raise HTTPException(status_code=400, detail=f"Image upload failed: {str(e)}")
    
    try:
        tech_list = [t.strip() for t in tech.split(",") if t.strip()] if tech else []
        
        db_project = Project(
            title=title,
            description=description,
            tech=",".join(tech_list) if tech_list else "",
            github=github if github else None,
            live=live if live else None,
            image=image_url
        )
        db.add(db_project)
        db.commit()
        db.refresh(db_project)
        print(f"✓ Project created with ID: {db_project.id}")
        
        return {
            "id": db_project.id,
            "title": db_project.title,
            "description": db_project.description,
            "tech": db_project.tech.split(",") if db_project.tech else [],
            "github": db_project.github,
            "live": db_project.live,
            "image": db_project.image,
            "created_at": db_project.created_at
        }
    except Exception as e:
        print(f"✗ Error creating project: {str(e)}")
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Failed to create project: {str(e)}")

@router.put("/projects/{project_id}")
async def update_project(
    project_id: int,
    title: str = Form(""),
    description: str = Form(""),
    tech: str = Form(""),
    github: str = Form(""),
    live: str = Form(""),
    file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    email: str = Depends(verify_token)
):
    """Update project with optional image upload (admin only)"""
    db_project = db.query(Project).filter(Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Update fields if provided
    if title:
        db_project.title = title
    if description:
        db_project.description = description
    if tech:
        tech_list = [t.strip() for t in tech.split(",") if t.strip()]
        db_project.tech = ",".join(tech_list) if tech_list else ""
    if github:
        db_project.github = github
    if live:
        db_project.live = live
    
    # Update image if provided
    if file and file.filename:
        try:
            # Delete old image if exists
            if db_project.image:
                delete_image(f"portfolio/projects/project_{db_project.title.lower().replace(' ', '_')}")
            
            # Upload new image
            file_content = await file.read()
            image_url = upload_image(
                file_content,
                folder="portfolio/projects",
                public_id=f"project_{db_project.title.lower().replace(' ', '_')}"
            )
            if image_url:
                db_project.image = image_url
        except Exception as e:
            print(f"Error updating image: {e}")
    
    db.commit()
    db.refresh(db_project)
    
    return {
        "id": db_project.id,
        "title": db_project.title,
        "description": db_project.description,
        "tech": db_project.tech.split(",") if db_project.tech else [],
        "github": db_project.github,
        "live": db_project.live,
        "image": db_project.image,
        "created_at": db_project.created_at
    }

@router.delete("/projects/{project_id}")
def delete_project(
    project_id: int,
    db: Session = Depends(get_db),
    email: str = Depends(verify_token)
):
    """Delete project (admin only)"""
    db_project = db.query(Project).filter(Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    db.delete(db_project)
    db.commit()
    return {"message": "Project deleted"}
