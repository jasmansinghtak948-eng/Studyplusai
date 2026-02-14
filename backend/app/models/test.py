"""Test and performance tracking models."""

from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, JSON, Boolean
from datetime import datetime
from app.db.database import Base


class TestResult(Base):
    """Test result model for performance tracking."""
    
    __tablename__ = "test_results"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    
    # Test info
    test_name = Column(String, nullable=False)
    subject = Column(String, nullable=False, index=True)
    total_questions = Column(Integer, nullable=False)
    correct_answers = Column(Integer, nullable=False)
    wrong_answers = Column(Integer, nullable=False)
    not_attempted = Column(Integer, nullable=False)
    
    # Score calculation
    score = Column(Float, nullable=False)  # Out of 100
    accuracy = Column(Float, nullable=False)  # Percentage
    time_taken = Column(Integer, nullable=False)  # In seconds
    
    # Chapter-wise performance (JSON format)
    chapter_performance = Column(JSON, nullable=True)  # {chapter: {correct, total, accuracy}}
    
    # Metadata
    test_date = Column(DateTime, default=datetime.utcnow, nullable=False, index=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    def __repr__(self):
        return f"<TestResult(id={self.id}, user_id={self.user_id}, score={self.score})>"


class StudySession(Base):
    """Study session tracking for analyzing study patterns."""
    
    __tablename__ = "study_sessions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    
    # Session details
    chapter = Column(String, nullable=False)
    subject = Column(String, nullable=False)
    duration_minutes = Column(Integer, nullable=False)  # Duration in minutes
    date = Column(DateTime, default=datetime.utcnow, nullable=False, index=True)
    
    # Quality metrics
    focus_score = Column(Float, nullable=True)  # 0-100
    notes = Column(String, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    def __repr__(self):
        return f"<StudySession(id={self.id}, user_id={self.user_id}, duration={self.duration_minutes})>"


class WeakArea(Base):
    """Identified weak areas based on test performance."""
    
    __tablename__ = "weak_areas"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    
    # Weak area details
    chapter = Column(String, nullable=False)
    subject = Column(String, nullable=False)
    accuracy = Column(Float, nullable=False)  # Current accuracy
    times_attempted = Column(Integer, default=1, nullable=False)
    priority_score = Column(Float, nullable=False)  # 0-100, higher = more important
    
    # Recommendation
    suggested_focus = Column(String, nullable=True)
    
    last_updated = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    def __repr__(self):
        return f"<WeakArea(id={self.id}, user_id={self.user_id}, chapter={self.chapter})>"
