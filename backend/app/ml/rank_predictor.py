"""Rank prediction engine using linear regression."""

import numpy as np
from typing import Dict, List, Optional
from dataclasses import dataclass
from datetime import datetime, timedelta


@dataclass
class RankPrediction:
    """Rank prediction result."""
    predicted_score: float
    confidence: float  # 0-100
    trend: str  # "improving", "stable", "declining"
    predicted_rank: Optional[int] = None
    improvement_needed: float = 0  # Points needed to reach target


class RankPredictor:
    """Predict future performance using trend analysis."""
    
    @staticmethod
    def predict_next_score(
        historical_scores: List[float],
        num_predictions: int = 1
    ) -> List[float]:
        """
        Predict next test scores using linear regression.
        
        Args:
            historical_scores: List of past test scores
            num_predictions: Number of future scores to predict
            
        Returns:
            List of predicted scores
        """
        if len(historical_scores) < 2:
            return historical_scores[-1:] * num_predictions if historical_scores else [0] * num_predictions
        
        # Prepare data
        x = np.arange(len(historical_scores)).reshape(-1, 1)
        y = np.array(historical_scores)
        
        # Calculate linear regression (manual implementation)
        n = len(x)
        x_mean = np.mean(x)
        y_mean = np.mean(y)
        
        numerator = np.sum((x.flatten() - x_mean) * (y - y_mean))
        denominator = np.sum((x.flatten() - x_mean) ** 2)
        
        slope = numerator / denominator if denominator != 0 else 0
        intercept = y_mean - slope * x_mean
        
        # Predict
        future_x = np.arange(len(historical_scores), len(historical_scores) + num_predictions)
        predictions = slope * future_x + intercept
        
        # Clamp scores between 0 and 100
        predictions = np.clip(predictions, 0, 100)
        
        return predictions.tolist()
    
    @staticmethod
    def calculate_confidence(
        historical_scores: List[float],
        prediction: float
    ) -> float:
        """
        Calculate confidence level of prediction.
        
        Confidence is based on:
        - Consistency of historical scores
        - Number of data points
        
        Args:
            historical_scores: Past scores
            prediction: Predicted score
            
        Returns:
            Confidence score (0-100)
        """
        if len(historical_scores) < 2:
            return 30.0
        
        # Calculate coefficient of variation
        std_dev = np.std(historical_scores)
        mean_score = np.mean(historical_scores)
        
        cv = (std_dev / mean_score) if mean_score != 0 else 0
        
        # Higher consistency (lower CV) = higher confidence
        confidence = max(0, 100 - (cv * 100))
        
        # More data points = higher confidence
        data_factor = min(50, len(historical_scores) * 5)
        confidence = (confidence + data_factor) / 2
        
        return float(confidence)
    
    @staticmethod
    def determine_trend(historical_scores: List[float]) -> str:
        """
        Determine performance trend.
        
        Args:
            historical_scores: Past scores
            
        Returns:
            "improving", "stable", or "declining"
        """
        if len(historical_scores) < 2:
            return "stable"
        
        # Compare last 3 scores with first 3 scores (if available)
        recent_avg = np.mean(historical_scores[-3:])
        early_avg = np.mean(historical_scores[:3])
        
        diff = recent_avg - early_avg
        
        if diff > 5:
            return "improving"
        elif diff < -5:
            return "declining"
        else:
            return "stable"
    
    @staticmethod
    def predict_rank(
        user_score: float,
        all_student_scores: List[float]
    ) -> int:
        """
        Predict user's rank based on score distribution.
        
        Args:
            user_score: User's score
            all_student_scores: Scores of all students
            
        Returns:
            Predicted rank (1 = highest)
        """
        if not all_student_scores:
            return 1
        
        # Count how many students scored more
        better_scores = sum(1 for s in all_student_scores if s > user_score)
        
        return better_scores + 1
    
    @staticmethod
    def get_full_prediction(
        historical_scores: List[float],
        target_score: float = 90.0,
        all_student_scores: Optional[List[float]] = None
    ) -> RankPrediction:
        """
        Get comprehensive prediction including score, confidence, and rank.
        
        Args:
            historical_scores: Past test scores
            target_score: Target performance score
            all_student_scores: All students' average scores for rank calculation
            
        Returns:
            RankPrediction object with all metrics
        """
        if not historical_scores:
            return RankPrediction(
                predicted_score=0,
                confidence=0,
                trend="stable",
                predicted_rank=None,
                improvement_needed=target_score
            )
        
        # Predict next score
        prediction = RankPredictor.predict_next_score(historical_scores, 1)[0]
        
        # Calculate confidence
        confidence = RankPredictor.calculate_confidence(historical_scores, prediction)
        
        # Determine trend
        trend = RankPredictor.determine_trend(historical_scores)
        
        # Calculate improvement needed
        improvement_needed = max(0, target_score - prediction)
        
        # Predict rank
        predicted_rank = None
        if all_student_scores:
            predicted_rank = RankPredictor.predict_rank(prediction, all_student_scores)
        
        return RankPrediction(
            predicted_score=float(prediction),
            confidence=float(confidence),
            trend=trend,
            predicted_rank=predicted_rank,
            improvement_needed=float(improvement_needed)
        )
