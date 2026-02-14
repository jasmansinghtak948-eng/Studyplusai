"""Performance analytics service."""

from sqlalchemy.orm import Session
from typing import List, Dict, Optional
from datetime import datetime, timedelta
from app.models import TestResult, WeakArea, StudySession
from app.schemas import TestResultCreate, DashboardMetrics
from app.ml import (
    PerformanceAnalyzer, RankPredictor, StudyOptimizer,
    BurnoutDetector, HeatmapAnalyzer
)


class PerformanceService:
    """Service for performance analysis and recommendations."""
    
    @staticmethod
    def create_test_result(
        db: Session,
        user_id: int,
        test_data: TestResultCreate
    ) -> TestResult:
        """Create and save test result."""
        
        # Calculate metrics
        accuracy = (test_data.correct_answers / test_data.total_questions * 100) if test_data.total_questions > 0 else 0
        score = (test_data.correct_answers / test_data.total_questions * 100) if test_data.total_questions > 0 else 0
        
        test_result = TestResult(
            user_id=user_id,
            test_name=test_data.test_name,
            subject=test_data.subject,
            total_questions=test_data.total_questions,
            correct_answers=test_data.correct_answers,
            wrong_answers=test_data.wrong_answers,
            not_attempted=test_data.not_attempted,
            score=score,
            accuracy=accuracy,
            time_taken=test_data.time_taken,
            chapter_performance=test_data.chapter_performance,
            test_date=datetime.utcnow()
        )
        
        db.add(test_result)
        db.commit()
        db.refresh(test_result)
        
        # Update weak areas
        PerformanceService._update_weak_areas(db, user_id, test_result)
        
        return test_result
    
    @staticmethod
    def _update_weak_areas(db: Session, user_id: int, test_result: TestResult) -> None:
        """Update weak areas based on test result."""
        
        if not test_result.chapter_performance:
            return
        
        for chapter, perf in test_result.chapter_performance.items():
            accuracy = perf.get('accuracy', 0)
            
            # Find or create weak area
            weak_area = db.query(WeakArea).filter(
                WeakArea.user_id == user_id,
                WeakArea.chapter == chapter,
                WeakArea.subject == test_result.subject
            ).first()
            
            if weak_area:
                # Update existing
                weak_area.times_attempted += 1
                weak_area.accuracy = accuracy
                weak_area.priority_score = PerformanceService._calculate_priority(accuracy, weak_area.times_attempted)
            else:
                # Create new if weak
                if accuracy < 70:  # Threshold for marking as weak
                    weak_area = WeakArea(
                        user_id=user_id,
                        chapter=chapter,
                        subject=test_result.subject,
                        accuracy=accuracy,
                        times_attempted=1,
                        priority_score=PerformanceService._calculate_priority(accuracy, 1)
                    )
                    db.add(weak_area)
            
            if weak_area:
                db.add(weak_area)
        
        db.commit()
    
    @staticmethod
    def _calculate_priority(accuracy: float, attempts: int) -> float:
        """Calculate priority score for weak area."""
        # Lower accuracy + more attempts = higher priority
        base_priority = 100 - accuracy
        attempt_factor = min(attempts / 5, 1)  # Cap at 1
        return base_priority * (1 + attempt_factor)
    
    @staticmethod
    def get_user_test_results(
        db: Session,
        user_id: int,
        limit: int = 10
    ) -> List[TestResult]:
        """Get user's test results."""
        
        return db.query(TestResult)\
            .filter(TestResult.user_id == user_id)\
            .order_by(TestResult.test_date.desc())\
            .limit(limit)\
            .all()
    
    @staticmethod
    def get_dashboard_metrics(db: Session, user_id: int) -> DashboardMetrics:
        """Get comprehensive dashboard metrics."""
        
        # Get recent test results
        recent_tests = PerformanceService.get_user_test_results(db, user_id, 20)
        
        if not recent_tests:
            return DashboardMetrics(
                overall_accuracy=0,
                test_count=0,
                study_sessions=0,
                weak_areas_count=0,
                burnout_score=0,
                improvement_trend=0,
                next_recommended_chapter=None
            )
        
        # Analyze performance
        tests_data = [
            {
                'score': t.score,
                'accuracy': t.accuracy,
                'chapter_performance': t.chapter_performance or {},
                'time_taken': t.time_taken,
                'total_questions': t.total_questions,
                'test_date': t.test_date
            }
            for t in recent_tests
        ]
        
        performance = PerformanceAnalyzer.analyze_test_results(tests_data)
        
        # Get weak areas
        weak_areas = db.query(WeakArea).filter(WeakArea.user_id == user_id).all()
        weak_areas_count = len(weak_areas)
        
        # Get study sessions
        recent_sessions = db.query(StudySession)\
            .filter(StudySession.user_id == user_id)\
            .filter(StudySession.date >= datetime.utcnow() - timedelta(days=7))\
            .all()
        
        # Burnout analysis
        sessions_data = [
            {
                'duration_minutes': s.duration_minutes,
                'focus_score': s.focus_score,
                'date': s.date.isoformat()
            }
            for s in recent_sessions
        ]
        
        burnout = BurnoutDetector.analyze_study_patterns(
            sessions_data,
            tests_data,
            days_lookback=7
        )
        
        # Next recommended chapter
        next_chapter = None
        if weak_areas:
            next_chapter = weak_areas[0].chapter
        
        return DashboardMetrics(
            overall_accuracy=performance.overall_accuracy,
            test_count=len(recent_tests),
            study_sessions=len(recent_sessions),
            weak_areas_count=weak_areas_count,
            burnout_score=burnout.burnout_score,
            improvement_trend=performance.improvement_trend,
            next_recommended_chapter=next_chapter
        )
    
    @staticmethod
    def get_study_recommendations(db: Session, user_id: int) -> List[Dict]:
        """Get personalized study recommendations."""
        
        weak_areas = db.query(WeakArea).filter(
            WeakArea.user_id == user_id
        ).order_by(WeakArea.priority_score.desc()).limit(5).all()
        
        if not weak_areas:
            return []
        
        recommendations = []
        for weak_area in weak_areas:
            recommendations.append({
                'chapter': weak_area.chapter,
                'accuracy': weak_area.accuracy,
                'priority_score': weak_area.priority_score,
                'times_attempted': weak_area.times_attempted,
                'suggested_hours': max(1, (100 - weak_area.accuracy) / 20)  # Scale from 1-5 hours
            })
        
        return recommendations
