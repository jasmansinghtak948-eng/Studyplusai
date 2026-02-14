"""Test and performance API routes."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.db import get_db
from app.schemas import TestResultCreate, TestResultResponse, DashboardMetrics
from app.services import PerformanceService
from app.utils import normalize_test_data


router = APIRouter(prefix="/api/v1/tests", tags=["Tests & Performance"])


@router.post("/upload", response_model=dict)
async def upload_test_result(
    test_data: TestResultCreate,
    current_user = Depends(None),  # JWT dependency
    db: Session = Depends(get_db)
):
    """Upload a new test result."""
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated"
        )
    
    try:
        result = PerformanceService.create_test_result(
            db, current_user.id, test_data
        )
        
        return {
            "status": "success",
            "message": "Test result uploaded successfully",
            "test_id": result.id
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.get("/history", response_model=dict)
async def get_test_history(
    limit: int = 10,
    current_user = Depends(None),
    db: Session = Depends(get_db)
):
    """Get user's test history."""
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated"
        )
    
    try:
        results = PerformanceService.get_user_test_results(
            db, current_user.id, limit
        )
        
        return {
            "status": "success",
            "test_count": len(results),
            "tests": [
                {
                    "id": r.id,
                    "test_name": r.test_name,
                    "subject": r.subject,
                    "score": r.score,
                    "accuracy": r.accuracy,
                    "test_date": r.test_date
                }
                for r in results
            ]
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.get("/dashboard", response_model=dict)
async def get_dashboard_metrics(
    current_user = Depends(None),
    db: Session = Depends(get_db)
):
    """Get comprehensive dashboard metrics."""
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated"
        )
    
    try:
        metrics = PerformanceService.get_dashboard_metrics(db, current_user.id)
        
        return {
            "status": "success",
            "metrics": {
                "overall_accuracy": metrics.overall_accuracy,
                "test_count": metrics.test_count,
                "study_sessions": metrics.study_sessions,
                "weak_areas_count": metrics.weak_areas_count,
                "burnout_score": metrics.burnout_score,
                "improvement_trend": metrics.improvement_trend,
                "next_recommended_chapter": metrics.next_recommended_chapter
            }
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.get("/recommendations", response_model=dict)
async def get_study_recommendations(
    current_user = Depends(None),
    db: Session = Depends(get_db)
):
    """Get personalized study recommendations."""
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated"
        )
    
    try:
        recommendations = PerformanceService.get_study_recommendations(
            db, current_user.id
        )
        
        return {
            "status": "success",
            "recommendations": recommendations
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
