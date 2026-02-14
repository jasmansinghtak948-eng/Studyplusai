"""Pydantic schemas for test results and performance tracking."""

from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from datetime import datetime


class TestResultBase(BaseModel):
    """Base test result schema."""
    test_name: str = Field(..., max_length=200)
    subject: str = Field(..., max_length=100)
    total_questions: int = Field(..., ge=1)
    correct_answers: int = Field(..., ge=0)
    wrong_answers: int = Field(..., ge=0)
    not_attempted: int = Field(..., ge=0)
    time_taken: int = Field(..., ge=1)  # Seconds
    chapter_performance: Optional[Dict[str, Any]] = None


class TestResultCreate(TestResultBase):
    """Schema for creating a new test result."""
    pass


class TestResultResponse(TestResultBase):
    """Schema for test result response."""
    id: int
    user_id: int
    score: float  # 0-100
    accuracy: float  # Percentage
    test_date: datetime
    created_at: datetime

    class Config:
        from_attributes = True


class StudySessionBase(BaseModel):
    """Base study session schema."""
    chapter: str = Field(..., max_length=200)
    subject: str = Field(..., max_length=100)
    duration_minutes: int = Field(..., ge=1)
    focus_score: Optional[float] = Field(None, ge=0, le=100)
    notes: Optional[str] = None


class StudySessionCreate(StudySessionBase):
    """Schema for creating a study session."""
    pass


class StudySessionResponse(StudySessionBase):
    """Schema for study session response."""
    id: int
    user_id: int
    date: datetime
    created_at: datetime

    class Config:
        from_attributes = True


class WeakAreaBase(BaseModel):
    """Base weak area schema."""
    chapter: str = Field(..., max_length=200)
    subject: str = Field(..., max_length=100)
    accuracy: float = Field(..., ge=0, le=100)
    priority_score: float = Field(..., ge=0, le=100)
    suggested_focus: Optional[str] = None


class WeakAreaResponse(WeakAreaBase):
    """Schema for weak area response."""
    id: int
    user_id: int
    times_attempted: int
    last_updated: datetime
    created_at: datetime

    class Config:
        from_attributes = True


# Performance Analytics Schemas

class PerformanceStats(BaseModel):
    """Overall performance statistics."""
    total_tests: int
    average_score: float
    average_accuracy: float
    total_study_hours: float
    recent_trend: str  # "improving", "stable", "declining"


class ChapterPerformance(BaseModel):
    """Performance data per chapter."""
    chapter: str
    accuracy: float
    attempts: int
    average_time: float
    priority: float


class DashboardMetrics(BaseModel):
    """Dashboard metrics summary."""
    overall_accuracy: float
    test_count: int
    study_sessions: int
    weak_areas_count: int
    burnout_score: float  # 0-100, higher = more burnout
    improvement_trend: float  # Percentage change
    next_recommended_chapter: Optional[str]
