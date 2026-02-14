"""Burnout detection and recovery system."""

import numpy as np
from typing import Dict, List, Optional
from dataclasses import dataclass
from datetime import datetime, timedelta


@dataclass
class BurnoutAnalysis:
    """Burnout analysis result."""
    burnout_score: float  # 0-100, higher = more burnout
    status: str  # "healthy", "caution", "warning", "critical"
    risk_factors: List[str]
    recommendations: List[str]
    recovery_days: Optional[int] = None


class BurnoutDetector:
    """Detect burnout patterns and suggest recovery strategies."""
    
    # Thresholds for burnout levels
    HEALTHY_THRESHOLD = 30
    CAUTION_THRESHOLD = 50
    WARNING_THRESHOLD = 70
    CRITICAL_THRESHOLD = 85
    
    @staticmethod
    def analyze_study_patterns(
        study_sessions: List[Dict],
        test_results: List[Dict],
        days_lookback: int = 30
    ) -> BurnoutAnalysis:
        """
        Analyze study patterns to detect burnout.
        
        Args:
            study_sessions: List of study sessions with duration and focus_score
            test_results: List of test results
            days_lookback: Number of days to analyze
            
        Returns:
            BurnoutAnalysis object
        """
        now = datetime.utcnow()
        cutoff_date = now - timedelta(days=days_lookback)
        
        # Filter recent sessions
        recent_sessions = [
            s for s in study_sessions
            if datetime.fromisoformat(s.get('date', str(now))) >= cutoff_date
        ]
        
        recent_tests = [
            t for t in test_results
            if datetime.fromisoformat(t.get('test_date', str(now))) >= cutoff_date
        ]
        
        # Calculate metrics
        risk_factors = []
        burnout_components = []
        
        # 1. Overwork detection (excessive study hours)
        if recent_sessions:
            total_minutes = sum(s.get('duration_minutes', 0) for s in recent_sessions)
            daily_avg = total_minutes / days_lookback / 60  # Hours per day
            
            if daily_avg > 8:
                risk_factors.append("Excessive study hours (>8 hours/day)")
                burnout_components.append(min(100, daily_avg * 10))
            elif daily_avg < 1:
                risk_factors.append("Inconsistent study schedule")
                burnout_components.append(40)
        
        # 2. Focus degradation
        if recent_sessions:
            focus_scores = [s.get('focus_score', 50) for s in recent_sessions if s.get('focus_score')]
            if focus_scores and len(focus_scores) > 3:
                recent_focus = np.mean(focus_scores[-5:])
                early_focus = np.mean(focus_scores[:5])
                
                focus_decline = early_focus - recent_focus
                if focus_decline > 20:
                    risk_factors.append("Declining focus and concentration")
                    burnout_components.append(70)
        
        # 3. Score stagnation (no improvement)
        if len(recent_tests) >= 3:
            scores = [t.get('score', 0) for t in sorted(recent_tests, key=lambda x: x.get('test_date', ''))[-3:]]
            if scores:
                trend = scores[-1] - scores[0]
                if trend < -10:  # Declining performance
                    risk_factors.append("Declining test performance")
                    burnout_components.append(80)
                elif abs(trend) < 2 and sum(s < 60 for s in scores) > 1:  # Stagnation at low level
                    risk_factors.append("Performance stagnation")
                    burnout_components.append(60)
        
        # 4. Consistency issues
        if recent_sessions and len(recent_sessions) > 7:
            sessions_per_day = len(recent_sessions) / days_lookback
            if sessions_per_day < 0.5:  # Less than 1 session every 2 days
                risk_factors.append("Irregular study pattern")
                burnout_components.append(50)
        
        # Calculate overall burnout score
        burnout_score = np.mean(burnout_components) if burnout_components else 25
        
        # Determine status
        if burnout_score >= BurnoutDetector.CRITICAL_THRESHOLD:
            status = "critical"
        elif burnout_score >= BurnoutDetector.WARNING_THRESHOLD:
            status = "warning"
        elif burnout_score >= BurnoutDetector.CAUTION_THRESHOLD:
            status = "caution"
        else:
            status = "healthy"
        
        # Generate recommendations
        recommendations = BurnoutDetector.get_recommendations(status, risk_factors)
        
        # Calculate recovery days
        recovery_days = None
        if status in ["warning", "critical"]:
            recovery_days = max(3, (burnout_score - BurnoutDetector.CAUTION_THRESHOLD) // 5)
        
        return BurnoutAnalysis(
            burnout_score=float(burnout_score),
            status=status,
            risk_factors=risk_factors,
            recommendations=recommendations,
            recovery_days=recovery_days
        )
    
    @staticmethod
    def get_recommendations(status: str, risk_factors: List[str]) -> List[str]:
        """Generate recovery recommendations based on burnout status."""
        
        recommendations = []
        
        if status == "healthy":
            recommendations = [
                "Keep up your consistent study routine",
                "Maintain balanced study schedule",
                "Regular breaks and exercise recommended"
            ]
        elif status == "caution":
            recommendations = [
                "Consider reducing study hours slightly",
                "Take more frequent breaks",
                "Mix different subjects to keep it fresh"
            ]
        elif status == "warning":
            recommendations = [
                "⚠️ RECOMMENDED: Take 2-3 days off to recover",
                "Focus on rest and recovery",
                "When resuming, start with easier topics",
                "Consider consulting with mentor/teacher"
            ]
        elif status == "critical":
            recommendations = [
                "🚨 URGENT: Take 4-5 days complete rest",
                "Seek support from family/mentor",
                "Consider shorter, focused sessions (20-30 min)",
                "Physical exercise and adequate sleep essential",
                "Speak with guidance counselor if available"
            ]
        
        # Add specific recommendations based on risk factors
        if "Excessive study hours" in risk_factors:
            recommendations.append("Reduce daily study to max 6 hours")
        if "Declining focus" in risk_factors:
            recommendations.append("Use Pomodoro technique: 25 min study + 5 min break")
        if "Declining test performance" in risk_factors:
            recommendations.append("Review study strategy, consider tutor help")
        if "Irregular study pattern" in risk_factors:
            recommendations.append("Create fixed study schedule: same time daily")
        
        return recommendations
    
    @staticmethod
    def suggest_recovery_strategy(
        burnout_score: float,
        weak_areas: List[str],
        available_days: int
    ) -> Dict:
        """
        Suggest a recovery and improvement strategy.
        
        Args:
            burnout_score: Current burnout score (0-100)
            weak_areas: Areas where recovery needed
            available_days: Days available before next exam
            
        Returns:
            Dictionary with recovery strategy
        """
        
        rest_days = max(2, int((burnout_score - 50) / 10)) if burnout_score > 50 else 0
        study_days = max(available_days - rest_days, 1)
        
        return {
            "recommended_rest_days": rest_days,
            "study_days_available": study_days,
            "daily_hours": max(2, 8 * study_days / available_days) if study_days > 0 else 0,
            "focus_areas": weak_areas[:3],
            "recovery_activities": [
                "Physical exercise (30 min daily)",
                "Meditation or mindfulness (10 min daily)",
                "Adequate sleep (8+ hours)",
                "Social activities with friends",
                "Outdoor time and fresh air"
            ]
        }
