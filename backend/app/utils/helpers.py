"""Utility functions for Study Plus AI."""

import json
from typing import Dict, Any, Optional


def normalize_test_data(raw_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Normalize test data from various sources.
    
    Args:
        raw_data: Raw test data dictionary
        
    Returns:
        Normalized test data
    """
    return {
        'test_name': raw_data.get('testName') or raw_data.get('test_name', 'Test'),
        'subject': raw_data.get('subject', 'General'),
        'total_questions': int(raw_data.get('totalQuestions') or raw_data.get('total_questions', 0)),
        'correct_answers': int(raw_data.get('correctAnswers') or raw_data.get('correct_answers', 0)),
        'wrong_answers': int(raw_data.get('wrongAnswers') or raw_data.get('wrong_answers', 0)),
        'not_attempted': int(raw_data.get('notAttempted') or raw_data.get('not_attempted', 0)),
        'time_taken': int(raw_data.get('timeTaken') or raw_data.get('time_taken', 0)),
        'chapter_performance': raw_data.get('chapterPerformance') or raw_data.get('chapter_performance')
    }


def paginate(query, page: int = 1, page_size: int = 10):
    """Paginate a SQLAlchemy query."""
    skip = (page - 1) * page_size
    return query.offset(skip).limit(page_size)


def format_response(data: Any, message: Optional[str] = None, status: str = "success") -> Dict:
    """
    Format API response consistently.
    
    Args:
        data: Response data
        message: Optional success message
        status: Response status (success/error)
        
    Returns:
        Formatted response dictionary
    """
    return {
        "status": status,
        "data": data,
        "message": message
    }


def calculate_accuracy(correct: int, total: int) -> float:
    """Calculate accuracy percentage."""
    return (correct / total * 100) if total > 0 else 0


def calculate_score(correct: int, total: int) -> float:
    """Calculate test score."""
    return (correct / total * 100) if total > 0 else 0
