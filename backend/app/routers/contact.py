from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import ContactInfo, ContactMessage
from app.schemas import ContactInfoCreate, ContactInfoResponse, ContactMessageCreate, ContactMessageResponse
from app.security import verify_token

router = APIRouter()

@router.get("/contact-info", response_model=ContactInfoResponse)
def get_contact_info(db: Session = Depends(get_db)):
    """Get contact information"""
    contact = db.query(ContactInfo).first()
    if not contact:
        return ContactInfoResponse(
            id=0,
            email="contact@example.com",
            phone="+91-XXXXXXXXXX",
            location="India",
            whatsapp="https://wa.me/91XXXXXXXXXX",
            updated_at=None
        )
    return contact

@router.put("/contact-info", response_model=ContactInfoResponse)
def update_contact_info(
    contact_data: ContactInfoCreate,
    db: Session = Depends(get_db),
    email: str = Depends(verify_token)
):
    """Update contact information (admin only)"""
    contact = db.query(ContactInfo).first()
    
    if contact:
        contact.email = contact_data.email
        contact.phone = contact_data.phone
        contact.location = contact_data.location
        contact.whatsapp = contact_data.whatsapp
    else:
        contact = ContactInfo(**contact_data.dict())
        db.add(contact)
    
    db.commit()
    db.refresh(contact)
    return contact

@router.post("/contact", response_model=ContactMessageResponse)
def submit_contact_form(
    message: ContactMessageCreate,
    db: Session = Depends(get_db)
):
    """Submit contact form"""
    db_message = ContactMessage(**message.dict())
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

@router.get("/contact/messages")
def get_contact_messages(
    db: Session = Depends(get_db),
    email: str = Depends(verify_token)
):
    """Get all contact messages (admin only)"""
    messages = db.query(ContactMessage).all()
    return messages
