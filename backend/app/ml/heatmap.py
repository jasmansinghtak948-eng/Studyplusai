"""Heatmap analysis for chapter vs accuracy performance."""

import numpy as np
from typing import Dict, List, Tuple
from dataclasses import dataclass


@dataclass
class HeatmapData:
    """Heatmap data for visualization."""
    chapters: List[str]
    categories: List[str]
    data: List[List[float]]  # 2D array of values
    max_value: float
    min_value: float


class HeatmapAnalyzer:
    """Analyze and visualize performance across chapters and categories."""
    
    @staticmethod
    def create_chapter_accuracy_heatmap(
        test_results: List[Dict]
    ) -> HeatmapData:
        """
        Create heatmap of chapter vs accuracy.
        
        Args:
            test_results: List of test results with chapter_performance
            
        Returns:
            HeatmapData for visualization
        """
        
        chapter_data = {}
        test_names = []
        
        # Collect data
        for test in test_results:
            test_name = test.get('test_name', 'Test')
            if test_name not in test_names:
                test_names.append(test_name)
            
            chapter_perf = test.get('chapter_performance', {})
            
            for chapter, perf in chapter_perf.items():
                if chapter not in chapter_data:
                    chapter_data[chapter] = {}
                
                chapter_data[chapter][test_name] = perf.get('accuracy', 0)
        
        # Create matrix
        chapters = sorted(chapter_data.keys())
        test_names = sorted(set(t.get('test_name', 'Test') for t in test_results))
        
        data = []
        for chapter in chapters:
            row = []
            for test_name in test_names:
                accuracy = chapter_data[chapter].get(test_name, 0)
                row.append(accuracy)
            data.append(row)
        
        # Flatten for min/max
        flat_data = [item for sublist in data for item in sublist]
        max_val = max(flat_data) if flat_data else 100
        min_val = min(flat_data) if flat_data else 0
        
        return HeatmapData(
            chapters=chapters,
            categories=test_names,
            data=data,
            max_value=max_val,
            min_value=min_val
        )
    
    @staticmethod
    def create_mistake_category_heatmap(
        test_results: List[Dict]
    ) -> HeatmapData:
        """
        Create heatmap of mistake categories (conceptual, calculation, careless, etc.).
        
        Args:
            test_results: List of test results with mistake breakdown
            
        Returns:
            HeatmapData for visualization
        """
        
        mistake_categories = [
            "Conceptual",
            "Calculation",
            "Careless",
            "Time Management",
            "Other"
        ]
        
        chapters = set()
        mistake_data = {}
        
        for test in test_results:
            chapter_perf = test.get('chapter_performance', {})
            
            for chapter, perf in chapter_perf.items():
                chapters.add(chapter)
                
                if chapter not in mistake_data:
                    mistake_data[chapter] = {cat: 0 for cat in mistake_categories}
                
                # Extract mistake breakdown (assuming it's in the performance data)
                mistakes = perf.get('mistakes', {})
                for cat in mistake_categories:
                    if cat in mistakes:
                        mistake_data[chapter][cat] += mistakes[cat]
        
        chapters = sorted(list(chapters))
        
        # Create matrix
        data = []
        for chapter in chapters:
            row = []
            for category in mistake_categories:
                count = mistake_data.get(chapter, {}).get(category, 0)
                row.append(float(count))
            data.append(row)
        
        # Normalize to percentage
        for i, row in enumerate(data):
            total = sum(row)
            if total > 0:
                data[i] = [val / total * 100 for val in row]
        
        flat_data = [item for sublist in data for item in sublist]
        max_val = max(flat_data) if flat_data else 100
        min_val = min(flat_data) if flat_data else 0
        
        return HeatmapData(
            chapters=chapters,
            categories=mistake_categories,
            data=data,
            max_value=max_val,
            min_value=min_val
        )
    
    @staticmethod
    def get_heatmap_insights(heatmap_data: HeatmapData) -> Dict:
        """
        Extract insights from heatmap data.
        
        Args:
            heatmap_data: HeatmapData object
            
        Returns:
            Dictionary with insights
        """
        
        insights = {
            "hottest_areas": [],  # Weakest chapters
            "coldest_areas": [],  # Strongest chapters
            "volatile_areas": [],  # Inconsistent performance
            "improvement_areas": []  # Areas showing improvement
        }
        
        if not heatmap_data.data or not heatmap_data.chapters:
            return insights
        
        for i, chapter in enumerate(heatmap_data.chapters):
            row = heatmap_data.data[i]
            
            avg_value = np.mean(row)
            std_value = np.std(row)
            
            # Identify patterns
            if avg_value < heatmap_data.min_value + (heatmap_data.max_value - heatmap_data.min_value) * 0.3:
                insights["hottest_areas"].append({
                    "chapter": chapter,
                    "avg_accuracy": avg_value
                })
            
            if avg_value > heatmap_data.max_value - (heatmap_data.max_value - heatmap_data.min_value) * 0.2:
                insights["coldest_areas"].append({
                    "chapter": chapter,
                    "avg_accuracy": avg_value
                })
            
            if std_value > (heatmap_data.max_value - heatmap_data.min_value) * 0.3:
                insights["volatile_areas"].append({
                    "chapter": chapter,
                    "volatility": std_value
                })
            
            # Check for improvement trend
            if len(row) >= 2 and row[-1] > row[0] + 10:
                insights["improvement_areas"].append({
                    "chapter": chapter,
                    "improvement": row[-1] - row[0]
                })
        
        # Sort by relevance
        insights["hottest_areas"].sort(key=lambda x: x["avg_accuracy"])
        insights["coldest_areas"].sort(key=lambda x: x["avg_accuracy"], reverse=True)
        insights["volatile_areas"].sort(key=lambda x: x["volatility"], reverse=True)
        insights["improvement_areas"].sort(key=lambda x: x["improvement"], reverse=True)
        
        return insights
