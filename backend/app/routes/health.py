"""Health check and utility routes."""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import get_db


router = APIRouter(tags=["Health"])


@router.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "service": "Study Plus AI",
        "version": "1.0.0"
    }


@router.get("/api/v1/health")
async def api_health_check(db: Session = Depends(get_db)):
    """API health check with database connection."""
    try:
        # Test database connection
        db.execute("SELECT 1")
        db_status = "connected"
    except Exception:
        db_status = "disconnected"
    
    return {
        "status": "ok",
        "service": "Study Plus AI",
        "database": db_status
    }
