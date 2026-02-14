# ML Models Quick Reference

## 1. PerformanceAnalyzer

Analyzes student test performance to identify patterns and trends.

### Usage
```python
from app.ml import PerformanceAnalyzer

test_results = [
    {
        'score': 75,
        'accuracy': 75,
        'chapter_performance': {
            'Chapter 1': {'accuracy': 80},
            'Chapter 2': {'accuracy': 70}
        },
        'time_taken': 1800,
        'total_questions': 50
    }
]

analysis = PerformanceAnalyzer.analyze_test_results(test_results)
print(analysis.overall_accuracy)  # 75.0
print(analysis.weak_chapters)     # ['Chapter 2']
print(analysis.strong_chapters)   # ['Chapter 1']
print(analysis.consistency_score) # 0-100
print(analysis.improvement_trend) # Percentage change
```

### Returns
- `overall_accuracy`: Average accuracy across all tests
- `chapter_accuracies`: Dict of chapter -> accuracy
- `improvement_trend`: Percentage change from first to last test
- `weak_chapters`: List of chapters below average
- `strong_chapters`: List of chapters above average
- `average_time_per_question`: Time efficiency metric
- `consistency_score`: Consistency of performance (0-100)

---

## 2. RankPredictor

Predicts future performance using linear regression on historical trends.

### Usage
```python
from app.ml import RankPredictor

historical_scores = [65, 72, 78, 85]

# Predict next score
predictions = RankPredictor.predict_next_score(historical_scores, 1)
print(predictions)  # [92]

# Get full prediction with confidence
prediction = RankPredictor.get_full_prediction(
    historical_scores,
    target_score=90,
    all_student_scores=[70, 75, 80, 85, 90]
)

print(prediction.predicted_score)  # 92.0
print(prediction.confidence)       # 75.5 (0-100)
print(prediction.trend)            # "improving"
print(prediction.predicted_rank)   # 2
print(prediction.improvement_needed) # 0 (already above target)
```

### Returns
- `predicted_score`: ML-predicted next test score
- `confidence`: Confidence level of prediction (0-100)
- `trend`: "improving" | "stable" | "declining"
- `predicted_rank`: Estimated rank among students
- `improvement_needed`: Points needed to reach target

---

## 3. StudyOptimizer

Generates AI-powered study recommendations using weighted priority scoring.

### Formula
```
Priority = (Exam_weightage × Weakness × Scoring_potential)
```

### Usage
```python
from app.ml import StudyOptimizer

chapters_data = {
    'Chapter 1': {
        'exam_weightage': 20,    # Importance in exam (%)
        'accuracy': 75,           # Current accuracy (%)
        'scoring_potential': 85   # Improvement potential (%)
    },
    'Chapter 2': {
        'exam_weightage': 30,
        'accuracy': 45,
        'scoring_potential': 80
    }
}

# Get priority chapters
recommendations = StudyOptimizer.get_priority_chapters(
    chapters_data,
    top_n=3
)

for rec in recommendations:
    print(f"{rec.chapter}: {rec.priority_score:.0f}")
    print(f"  Urgency: {rec.urgency}")
    print(f"  Hours: {rec.estimated_hours:.1f}")
    print(f"  Reason: {rec.reason}")
```

### Returns List of StudyRecommendation:
- `chapter`: Chapter name
- `priority_score`: Calculated priority (0-10000)
- `reason`: Why it's recommended
- `estimated_hours`: Study time needed (0-10)
- `urgency`: "critical" | "high" | "medium" | "low"

---

## 4. BurnoutDetector

Monitors study patterns to detect burnout and suggest recovery.

### Usage
```python
from app.ml import BurnoutDetector

study_sessions = [
    {
        'duration_minutes': 180,
        'focus_score': 45,      # 0-100
        'date': '2024-01-10'
    }
]

test_results = [...]

burnout = BurnoutDetector.analyze_study_patterns(
    study_sessions,
    test_results,
    days_lookback=30
)

print(burnout.burnout_score)    # 0-100
print(burnout.status)            # "healthy" | "caution" | "warning" | "critical"
print(burnout.risk_factors)      # ["Excessive study hours", ...]
print(burnout.recommendations)   # ["Take a break", ...]
print(burnout.recovery_days)     # Days recommended for recovery
```

### Burnout Thresholds
- 0-30: Healthy
- 30-50: Caution
- 50-70: Warning
- 70+: Critical

### Risk Factors Detected
- Excessive study hours (>8/day)
- Inconsistent study schedule
- Declining focus and concentration
- Declining test performance
- Performance stagnation
- Irregular study pattern

---

## 5. HeatmapAnalyzer

Creates visual heatmaps of performance across chapters and tests.

### Usage
```python
from app.ml import HeatmapAnalyzer

test_results = [
    {
        'test_name': 'Mock 1',
        'chapter_performance': {
            'Ch 1': {'accuracy': 75},
            'Ch 2': {'accuracy': 82}
        }
    }
]

# Chapter vs Accuracy heatmap
heatmap = HeatmapAnalyzer.create_chapter_accuracy_heatmap(test_results)

print(heatmap.chapters)      # ['Ch 1', 'Ch 2', ...]
print(heatmap.categories)    # ['Mock 1', 'Mock 2', ...]
print(heatmap.data)          # 2D array [[75, 82], ...]
print(heatmap.max_value)     # 100
print(heatmap.min_value)     # 0

# Get insights
insights = HeatmapAnalyzer.get_heatmap_insights(heatmap)

print(insights['hottest_areas'])      # Weakest chapters
print(insights['coldest_areas'])      # Strongest chapters
print(insights['volatile_areas'])     # Inconsistent performance
print(insights['improvement_areas'])  # Showing improvement
```

---

## Model Features Matrix

| Feature | Analyzer | Predictor | Optimizer | Burnout | Heatmap |
|---------|----------|-----------|-----------|---------|---------|
| Accuracy Analysis | ✓ | ✓ | ✓ | ✗ | ✓ |
| Trend Detection | ✓ | ✓ | ✗ | ✓ | ✗ |
| Predictions | ✗ | ✓ | ✗ | ✗ | ✗ |
| Recommendations | ✗ | ✗ | ✓ | ✓ | ✗ |
| Risk Detection | ✗ | ✗ | ✗ | ✓ | ✗ |
| Visualization | ✗ | ✗ | ✗ | ✗ | ✓ |

---

## Performance Optimization Tips

1. **Batch Operations**: Process multiple students' data together
2. **Caching**: Cache common analysis results for 1 hour
3. **Incremental Updates**: Update only changed metrics
4. **Database Indexes**: Index user_id, chapter, subject columns

## Data Format Requirements

All models expect consistent data format:

```python
test_result = {
    'score': float,              # 0-100
    'accuracy': float,           # 0-100
    'total_questions': int,
    'correct_answers': int,
    'time_taken': int,           # seconds
    'test_date': datetime,
    'test_name': str,
    'chapter_performance': {
        'chapter_name': {
            'accuracy': float,
            'correct': int,
            'total': int
        }
    }
}
```

---

For more details, see individual module docstrings.
