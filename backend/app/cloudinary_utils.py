import cloudinary
import cloudinary.uploader
from cloudinary.utils import cloudinary_url
import os
from typing import Optional
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configure Cloudinary
cloud_name = os.getenv("CLOUDINARY_CLOUD_NAME")
api_key = os.getenv("CLOUDINARY_API_KEY")
api_secret = os.getenv("CLOUDINARY_API_SECRET")

if not all([cloud_name, api_key, api_secret]):
    print(f"WARNING: Missing Cloudinary credentials!")
    print(f"  CLOUDINARY_CLOUD_NAME: {'✓' if cloud_name else '✗ MISSING'}")
    print(f"  CLOUDINARY_API_KEY: {'✓' if api_key else '✗ MISSING'}")
    print(f"  CLOUDINARY_API_SECRET: {'✓' if api_secret else '✗ MISSING'}")

cloudinary.config(
    cloud_name=cloud_name,
    api_key=api_key,
    api_secret=api_secret,
    secure=True
)

def upload_image(file_content: bytes, folder: str, public_id: str) -> Optional[str]:
    """
    Upload image to Cloudinary
    
    Args:
        file_content: Image file bytes
        folder: Cloudinary folder (e.g., 'portfolio/projects', 'portfolio/about')
        public_id: Public ID for the image
    
    Returns:
        Secure URL of the uploaded image or None if upload fails
    """
    try:
        # Save bytes to temporary location for upload
        import tempfile
        with tempfile.NamedTemporaryFile(delete=False, suffix='.jpg') as tmp:
            tmp.write(file_content)
            tmp_path = tmp.name
        
        # Upload to Cloudinary
        result = cloudinary.uploader.upload(
            tmp_path,
            folder=folder,
            public_id=public_id,
            overwrite=True,
            quality="auto",
            fetch_format="auto"
        )
        
        # Clean up temp file
        os.unlink(tmp_path)
        
        return result.get("secure_url")
    except Exception as e:
        config = cloudinary.config()
        print(f"Error uploading image to Cloudinary: {e}")
        print(f"  Current Cloudinary Config - Cloud Name: {config.cloud_name}, Has API Key: {'Yes' if config.api_key else 'No'}")
        return None


def get_optimized_url(public_id: str, width: int = None, height: int = None, crop: str = "auto") -> str:
    """
    Get optimized image URL from Cloudinary
    
    Args:
        public_id: Cloudinary public ID of the image
        width: Optional width for resizing
        height: Optional height for resizing
        crop: Crop strategy
    
    Returns:
        Optimized Cloudinary URL
    """
    try:
        url, _ = cloudinary_url(
            public_id,
            fetch_format="auto",
            quality="auto",
            width=width,
            height=height,
            crop=crop if (width or height) else None
        )
        return url
    except Exception as e:
        print(f"Error generating optimized URL: {e}")
        return None


def delete_image(public_id: str) -> bool:
    """
    Delete image from Cloudinary
    
    Args:
        public_id: Cloudinary public ID of the image
    
    Returns:
        True if deletion successful, False otherwise
    """
    try:
        result = cloudinary.uploader.destroy(public_id)
        return result.get("result") == "ok"
    except Exception as e:
        print(f"Error deleting image from Cloudinary: {e}")
        return False
