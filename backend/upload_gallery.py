"""
Upload images from local gallery to Cloudinary - Test Script
"""
import cloudinary
import cloudinary.uploader
from cloudinary.utils import cloudinary_url
import os
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
load_dotenv()

# Configure Cloudinary
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)

print("=" * 70)
print("CLOUDINARY GALLERY UPLOAD TEST")
print("=" * 70)

# Create a test gallery directory if it doesn't exist
gallery_dir = Path(__file__).parent / "test_gallery"
gallery_dir.mkdir(exist_ok=True)

print(f"\n📁 Gallery Directory: {gallery_dir}")
print(f"   Place your image files in this directory to upload them.")

# Find all image files
image_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'}
image_files = [f for f in gallery_dir.glob('*') if f.suffix.lower() in image_extensions]

if not image_files:
    print(f"\n⚠️  No images found in {gallery_dir}")
    print("   Please add some image files and run this script again.")
    print("\n   Supported formats: JPG, PNG, GIF, WebP, BMP")
    exit(1)

print(f"\n✓ Found {len(image_files)} image(s) to upload\n")

# Upload each image
successful = 0
failed = 0

for idx, image_file in enumerate(image_files, 1):
    print(f"\n[{idx}/{len(image_files)}] Processing: {image_file.name}")
    print("-" * 70)
    
    try:
        # Upload to Cloudinary
        print(f"  📤 Uploading to Cloudinary...")
        
        result = cloudinary.uploader.upload(
            str(image_file),
            folder="portfolio/gallery",
            public_id=image_file.stem,
            overwrite=True,
            quality="auto",
            fetch_format="auto"
        )
        
        print(f"  ✅ SUCCESS!")
        print(f"\n  📊 Image Details:")
        print(f"     • File: {image_file.name}")
        print(f"     • Size: {image_file.stat().st_size / 1024:.1f} KB (local)")
        print(f"     • Dimensions: {result.get('width')}x{result.get('height')}")
        print(f"     • Cloudinary Size: {result.get('bytes') / 1024:.1f} KB")
        print(f"     • Public ID: {result.get('public_id')}")
        
        print(f"\n  🔗 URLs:")
        print(f"     • Secure URL: {result.get('secure_url')}")
        
        # Generate optimized URLs
        optimized_url, _ = cloudinary_url(
            result.get('public_id'),
            fetch_format="auto",
            quality="auto"
        )
        print(f"     • Optimized: {optimized_url}")
        
        thumbnail_url, _ = cloudinary_url(
            result.get('public_id'),
            width=300,
            height=300,
            crop="fill",
            gravity="auto"
        )
        print(f"     • Thumbnail: {thumbnail_url}")
        
        successful += 1
        
    except Exception as e:
        print(f"  ❌ FAILED!")
        print(f"  Error: {str(e)}")
        failed += 1

# Summary
print("\n" + "=" * 70)
print("UPLOAD SUMMARY")
print("=" * 70)
print(f"\n  ✅ Successful: {successful}")
print(f"  ❌ Failed: {failed}")
print(f"  📊 Total: {len(image_files)}")

if successful == len(image_files):
    print("\n🎉 All images uploaded successfully to Cloudinary!")
    print("   You can now use these images in your portfolio!")
else:
    print("\n⚠️  Some images failed to upload. Please check the errors above.")

print("\n" + "=" * 70)
print("NEXT STEPS:")
print("=" * 70)
print("\n  1. Start the backend server:")
print("     cd backend && python main.py")
print("\n  2. Go to admin panel: http://localhost:5173/admin/login")
print("     Email: admin@example.com")
print("     Password: admin123")
print("\n  3. Add a project with an image and upload it to Cloudinary")
print("\n  4. View the portfolio: http://localhost:5173")
print("\n" + "=" * 70 + "\n")
