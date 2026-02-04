# Backend Setup Guide

## 📦 Dependencies

All dependencies are listed in `requirements.txt`:
- **fastapi** - Web framework
- **uvicorn** - ASGI server
- **sqlalchemy** - ORM
- **pydantic** - Data validation
- **python-jose** - JWT handling
- **passlib** - Password hashing
- **python-multipart** - File uploads

## 🔧 Installation

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

## 🚀 Running the Server

```bash
# Development (with auto-reload)
python main.py

# Or using uvicorn directly
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## 📚 API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🔐 Authentication

All admin endpoints require JWT token. Include in headers:
```
Authorization: Bearer <token>
```

### Login
```bash
curl -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

## 📝 Database

### SQLite (Development)
- File: `portfolio.db`
- Auto-created on first run
- Suitable for development

### PostgreSQL (Production)
```bash
# Install psycopg2
pip install psycopg2-binary

# Update DATABASE_URL in .env
DATABASE_URL=postgresql://user:password@localhost/portfolio
```

## 🗂️ Project Structure

```
backend/
├── app/
│   ├── routers/           # API endpoints
│   │   ├── auth.py       # Authentication
│   │   ├── about.py      # About section
│   │   ├── skills.py     # Skills management
│   │   ├── projects.py   # Projects
│   │   ├── experience.py # Work experience
│   │   ├── contact.py    # Contact info
│   │   └── resume.py     # Resume handling
│   ├── models.py         # SQLAlchemy models
│   ├── schemas.py        # Pydantic schemas
│   ├── database.py       # Database setup
│   ├── security.py       # Auth utilities
│   └── __init__.py
├── main.py              # FastAPI app entry
├── requirements.txt     # Dependencies
├── .env                # Environment variables
└── .env.example       # Example env file
```

## 🔑 Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Database
DATABASE_URL=sqlite:///./portfolio.db

# Security
SECRET_KEY=your-super-secret-key

# Admin credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123

# CORS origins
ALLOWED_ORIGINS=http://localhost:5173
```

## ⚙️ Models Overview

### Admin
- `id` - Primary key
- `email` - Admin email
- `hashed_password` - Encrypted password
- `created_at` - Creation timestamp

### About
- `id` - Primary key
- `title` - Section title
- `subtitle` - Subtitle
- `role` - Job role/title
- `description` - Long description
- `profile_image` - Binary image data
- `updated_at` - Last update time

### Skill
- `id` - Primary key
- `name` - Skill name
- `level` - Proficiency (0-100)
- `category` - Category (frontend, backend, tools, design)
- `created_at` - Creation time

### Project
- `id` - Primary key
- `title` - Project name
- `description` - Details
- `tech` - Comma-separated technologies
- `github` - GitHub link
- `live` - Live demo link
- `image` - Binary image
- `created_at` - Creation time

### Experience
- `id` - Primary key
- `title` - Job title
- `company` - Company name
- `duration` - Duration string
- `description` - Job details
- `highlights` - Comma-separated highlights
- `created_at` - Creation time

### ContactInfo
- `id` - Primary key
- `email` - Email address
- `phone` - Phone number
- `location` - Location/City
- `whatsapp` - WhatsApp link
- `updated_at` - Last update

### ContactMessage
- `id` - Primary key
- `name` - Sender name
- `email` - Sender email
- `subject` - Message subject
- `message` - Message content
- `created_at` - Submission time

## 🧪 Testing APIs

Use curl or Postman to test:

```bash
# Get all skills
curl http://localhost:8000/api/skills

# Add a new skill (requires auth)
curl -X POST http://localhost:8000/api/skills \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name": "Python",
    "level": 85,
    "category": "backend"
  }'

# Get all projects
curl http://localhost:8000/api/projects

# Submit contact form
curl -X POST http://localhost:8000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Project Inquiry",
    "message": "I would like to hire you..."
  }'
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port
python main.py --port 8001
```

### Database Errors
```bash
# Reset database
rm portfolio.db
# Restart server - it will recreate tables
```

### Import Errors
```bash
# Ensure you're in the project root
cd backend
# Install missing dependencies
pip install -r requirements.txt
```

## 📊 Production Deployment

### Using Gunicorn
```bash
pip install gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

### Docker
```dockerfile
FROM python:3.10
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 📞 Support

For issues or questions, refer to:
- FastAPI docs: https://fastapi.tiangolo.com
- SQLAlchemy docs: https://docs.sqlalchemy.org
- Pydantic docs: https://docs.pydantic.dev
