"""Study optimization and recommendation engine."""

import numpy as np
from typing import Dict, List, Optional
from dataclasses import dataclass


@dataclass
class StudyRecommendation:
    """Study recommendation."""
    chapter: str
    priority_score: float  # 0-100
    reason: str
    estimated_hours: float
    urgency: str  # "critical", "high", "medium", "low"


class StudyOptimizer:
    """Optimize study plans based on performance and weak areas."""
    
    @staticmethod
    def calculate_priority_score(
        exam_weightage: float,
        weakness_level: float,
        scoring_potential: float
    ) -> float:
        """
        Calculate priority score for a chapter.
        
        Formula: Priority = Exam_weightage × Weakness × Scoring_potential
        
        Args:
            exam_weightage: Importance in exam (0-100)
            weakness_level: Current weakness (0-100, higher = weaker)
            scoring_potential: Potential to improve (0-100)
            
        Returns:
            Priority score (0-10000)
        """
        priority = (exam_weightage / 100) * (weakness_level / 100) * (scoring_potential / 100) * 10000
        return float(priority)
    
    @staticmethod
    def get_priority_chapters(
        chapters_data: Dict[str, Dict],
        top_n: int = 5
    ) -> List[StudyRecommendation]:
        """
        Get top priority chapters to focus on.
        
        Args:
            chapters_data: Dictionary with chapter data:
                {
                    "chapter_name": {
                        "exam_weightage": 20,
                        "accuracy": 45,
                        "attempts": 3,
                        "scoring_potential": 80
                    }
                }
            top_n: Number of top chapters to return
            
        Returns:
            List of prioritized study recommendations
        """
        recommendations = []
        
        for chapter, data in chapters_data.items():
            exam_weightage = data.get('exam_weightage', 50)
            accuracy = data.get('accuracy', 0)
            scoring_potential = data.get('scoring_potential', 100 - accuracy)
            
            # Weakness level (inverse of accuracy)
            weakness_level = 100 - accuracy
            
            # Calculate priority
            priority = StudyOptimizer.calculate_priority_score(
                exam_weightage,
                weakness_level,
                scoring_potential
            )
            
            # Determine urgency
            if priority > 5000:
                urgency = "critical"
            elif priority > 3000:
                urgency = "high"
            elif priority > 1000:
                urgency = "medium"
            else:
                urgency = "low"
            
            # Estimate study hours
            hours_needed = (weakness_level / 100) * 10  # 0-10 hours
            
            # Create reason
            reason = f"Weak area ({accuracy:.0f}% accuracy) with high exam weightage"
            
            recommendations.append(StudyRecommendation(
                chapter=chapter,
                priority_score=priority,
                reason=reason,
                estimated_hours=hours_needed,
                urgency=urgency
            ))
        
        # Sort by priority and return top N
        recommendations.sort(key=lambda x: x.priority_score, reverse=True)
        return recommendations[:top_n]
    
    @staticmethod
    def create_study_plan(
        weak_areas: List[Dict],
        available_hours: float,
        exam_date: Optional[str] = None
    ) -> List[Dict]:
        """
        Create an optimized study plan.
        
        Args:
            weak_areas: List of weak areas with priority scores
            available_hours: Total hours available for study
            exam_date: Target exam date
            
        Returns:
            List of daily study plan items
        """
        if not weak_areas:
            return []
        
        # Sort by priority
        sorted_areas = sorted(
            weak_areas,
            key=lambda x: x.get('priority_score', 0),
            reverse=True
        )
        
        plan = []
        hours_allocated = 0
        
        for area in sorted_areas:
            if hours_allocated >= available_hours:
                break
            
            estimated_hours = min(
                area.get('estimated_hours', 2),
                available_hours - hours_allocated
            )
            
            plan.append({
                'chapter': area.get('chapter', 'Unknown'),
                'priority': area.get('urgency', 'medium'),
                'hours': estimated_hours,
                'focus_areas': area.get('focus_areas', []),
                'recommended_resources': area.get('resources', [])
            })
            
            hours_allocated += estimated_hours
        
        return plan
    
    @staticmethod
    def calculate_optimal_study_hours(
        weak_areas_count: int,
        exam_distance_days: int,
        current_accuracy: float
    ) -> float:
        """
        Calculate optimal daily study hours.
        
        Args:
            weak_areas_count: Number of weak areas
            exam_distance_days: Days until exam
            current_accuracy: Current accuracy percentage
            
        Returns:
            Recommended daily study hours
        """
        # Base hours based on accuracy
        base_hours = max(2, 6 * (100 - current_accuracy) / 100)
        
        # Adjustment based on weak areas
        area_factor = 1 + (weak_areas_count / 10)
        
        # Adjustment based on time left
        time_factor = max(1, 30 / exam_distance_days) if exam_distance_days > 0 else 1
        
        recommended_hours = base_hours * area_factor * time_factor
        
        # Cap at 8 hours
        return min(8, float(recommended_hours))
