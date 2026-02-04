from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Admin
from app.schemas import AdminLogin, TokenResponse
from app.security import hash_password, verify_password, create_access_token

router = APIRouter()

# Default admin credentials (change in production)
DEFAULT_ADMIN_EMAIL = "admin@example.com"
DEFAULT_ADMIN_PASSWORD = "admin123"

@router.post("/login", response_model=TokenResponse)
def login(credentials: AdminLogin, db: Session = Depends(get_db)):
    """Admin login endpoint"""
    # Check if admin exists
    admin = db.query(Admin).filter(Admin.email == credentials.email).first()
    
    # If no admin exists, create default admin
    if not admin:
        if (credentials.email == DEFAULT_ADMIN_EMAIL and 
            credentials.password == DEFAULT_ADMIN_PASSWORD):
            admin = Admin(
                email=DEFAULT_ADMIN_EMAIL,
                hashed_password=hash_password(DEFAULT_ADMIN_PASSWORD)
            )
            db.add(admin)
            db.commit()
            db.refresh(admin)
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials",
            )
    
    # Verify password
    if not verify_password(credentials.password, admin.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )
    
    # Create token
    token = create_access_token(data={"sub": admin.email})
    return TokenResponse(token=token)

@router.get("/verify")
def verify_token_endpoint(email: str = Depends(lambda: None)):
    """Verify token endpoint"""
    return {"status": "authenticated"}
