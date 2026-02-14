"""Performance analysis and prediction using machine learning."""

import numpy as np
from typing import Dict, List, Tuple, Optional
from dataclasses import dataclass


@dataclass
class PerformanceAnalysis:
    """Result of performance analysis."""
    overall_accuracy: float
    chapter_accuracies: Dict[str, float]
    improvement_trend: float  # Percentage change from first to last test
    weak_chapters: List[str]
    strong_chapters: List[str]
    average_time_per_question: float
    consistency_score: float  # 0-100, how consistent the performance is


class PerformanceAnalyzer:
    """Analyze student performance across tests and chapters."""
    
    @staticmethod
    def analyze_test_results(test_results: List[Dict]) -> PerformanceAnalysis:
        """
        Analyze multiple test results to identify patterns.
        
        Args:
            test_results: List of test result dictionaries with:
                - score: Test score (0-100)
                - accuracy: Question accuracy (%)
                - chapter_performance: Dict of chapter->accuracy
                - time_taken: Time in seconds
                - total_questions: Number of questions
        
        Returns:
            PerformanceAnalysis object with insights
        """
        if not test_results:
            return PerformanceAnalysis(
                overall_accuracy=0, chapter_accuracies={},
                improvement_trend=0, weak_chapters=[],
                strong_chapters=[], average_time_per_question=0,
                consistency_score=0
            )
        
        scores = [t.get('score', 0) for t in test_results]
        accuracies = [t.get('accuracy', 0) for t in test_results]
        
        # Overall accuracy
        overall_accuracy = np.mean(accuracies)
        
        # Chapter-wise analysis
        chapter_data = {}
        for test in test_results:
            chapter_perf = test.get('chapter_performance', {})
            for chapter, perf in chapter_perf.items():
                if chapter not in chapter_data:
                    chapter_data[chapter] = []
                chapter_data[chapter].append(perf.get('accuracy', 0))
        
        chapter_accuracies = {
            ch: np.mean(accs) for ch, accs in chapter_data.items()
        }
        
        # Improvement trend
        improvement_trend = 0
        if len(scores) >= 2:
            improvement_trend = ((scores[-1] - scores[0]) / scores[0] * 100) if scores[0] != 0 else 0
        
        # Weak and strong chapters
        threshold_weak = overall_accuracy - 15
        threshold_strong = overall_accuracy + 10
        
        weak_chapters = [
            ch for ch, acc in chapter_accuracies.items() if acc < threshold_weak
        ]
        strong_chapters = [
            ch for ch, acc in chapter_accuracies.items() if acc > threshold_strong
        ]
        
        # Average time per question
        total_time = sum(t.get('time_taken', 0) for t in test_results)
        total_questions = sum(t.get('total_questions', 0) for t in test_results)
        avg_time_per_question = (total_time / total_questions) if total_questions else 0
        
        # Consistency score (lower std dev = higher consistency)
        std_dev = np.std(accuracies)
        consistency_score = max(0, 100 - std_dev)
        
        return PerformanceAnalysis(
            overall_accuracy=float(overall_accuracy),
            chapter_accuracies=chapter_accuracies,
            improvement_trend=float(improvement_trend),
            weak_chapters=weak_chapters,
            strong_chapters=strong_chapters,
            average_time_per_question=float(avg_time_per_question),
            consistency_score=float(consistency_score)
        )
    
    @staticmethod
    def calculate_chapter_accuracy(
        correct: int, total: int, previous_accuracy: Optional[float] = None
    ) -> Dict[str, float]:
        """
        Calculate various accuracy metrics for a chapter.
        
        Args:
            correct: Number of correct answers
            total: Total questions
            previous_accuracy: Previous accuracy for trend
            
        Returns:
            Dictionary with accuracy metrics
        """
        accuracy = (correct / total * 100) if total > 0 else 0
        
        trend = 0
        if previous_accuracy is not None:
            trend = accuracy - previous_accuracy
        
        return {
            "accuracy": accuracy,
            "correct": correct,
            "total": total,
            "trend": trend
        }
    
    @staticmethod
    def identify_problem_areas(
        test_results: List[Dict],
        threshold: float = 65.0
    ) -> Dict[str, List[str]]:
        """
        Identify weak areas in performance.
        
        Args:
            test_results: List of test results
            threshold: Accuracy threshold below which to flag as weak
            
        Returns:
            Dictionary mapping chapters to issues
        """
        weak_areas = {}
        
        for test in test_results:
            if 'chapter_performance' not in test:
                continue
            
            for chapter, perf in test['chapter_performance'].items():
                accuracy = perf.get('accuracy', 0)
                
                if accuracy < threshold:
                    if chapter not in weak_areas:
                        weak_areas[chapter] = []
                    
                    weak_areas[chapter].append({
                        'test': test.get('test_name', 'Unknown'),
                        'accuracy': accuracy,
                        'date': test.get('test_date', '')
                    })
        
        return weak_areas
