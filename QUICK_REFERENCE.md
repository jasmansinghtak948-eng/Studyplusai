/**
 * 🚀 QUICK REFERENCE GUIDE
 * Common tasks and code snippets
 */

// ============================================
// BACKEND EXAMPLES
// ============================================

// 1. CREATE A NEW USER
const userService = UserService();
await userService.create_user(db, UserCreate(
  email="user@example.com",
  name="John Doe",
  password="secure_password"
))

// 2. AUTHENTICATE USER
const result = await userService.authenticate_user(
  db,
  "user@example.com",
  "password"
)
// Returns: { access_token, refresh_token, user }

// 3. UPLOAD TEST RESULT
const test = await performanceService.create_test_result(
  db,
  user_id=1,
  TestResultCreate(
    test_name="Biology Mock",
    subject="Biology",
    total_questions=100,
    correct_answers=80,
    wrong_answers=15,
    not_attempted=5,
    time_taken=3600,
    chapter_performance={
      "Chapter 1": {"accuracy": 85},
      "Chapter 2": {"accuracy": 75}
    }
  )
)

// 4. GET DASHBOARD METRICS
const metrics = await performanceService.get_dashboard_metrics(db, user_id=1)
// Returns: DashboardMetrics with accuracy, test_count, burnout_score, etc.

// 5. GET STUDY RECOMMENDATIONS
const recommendations = await performanceService.get_study_recommendations(db, user_id=1)
// Returns: List of recommended chapters with priority scores

// ============================================
// ML/AI EXAMPLES
// ============================================

// 1. ANALYZE PERFORMANCE
from app.ml import PerformanceAnalyzer

analysis = PerformanceAnalyzer.analyze_test_results([
  {
    'score': 65, 'accuracy': 65,
    'chapter_performance': {"Ch1": {"accuracy": 70}, "Ch2": {"accuracy": 60}},
    'time_taken': 3600, 'total_questions': 100
  },
  {
    'score': 75, 'accuracy': 75,
    'chapter_performance': {"Ch1": {"accuracy": 80}, "Ch2": {"accuracy": 70}},
    'time_taken': 3600, 'total_questions': 100
  }
])

print(analysis.overall_accuracy)       # 70.0
print(analysis.improvement_trend)      # +15.38%
print(analysis.weak_chapters)          # ["Ch2"]
print(analysis.consistency_score)      # 90.5

// 2. PREDICT FUTURE SCORE
from app.ml import RankPredictor

prediction = RankPredictor.get_full_prediction(
  historical_scores=[65, 72, 78, 85],
  target_score=90
)

print(prediction.predicted_score)      # 92.0
print(prediction.trend)                # "improving"
print(prediction.confidence)           # 78.5
print(prediction.improvement_needed)   # -2.0 (exceeds target)

// 3. GET STUDY RECOMMENDATIONS
from app.ml import StudyOptimizer

chapters = {
  "Chapter 1": {
    "exam_weightage": 25,
    "accuracy": 65,
    "scoring_potential": 85
  },
  "Chapter 2": {
    "exam_weightage": 20,
    "accuracy": 45,
    "scoring_potential": 80
  }
}

recommendations = StudyOptimizer.get_priority_chapters(chapters, top_n=3)

for rec in recommendations:
  print(f"{rec.chapter}: Priority={rec.priority_score:.0f}, Urgency={rec.urgency}")
  print(f"  Study {rec.estimated_hours:.1f} hours")

// 4. DETECT BURNOUT
from app.ml import BurnoutDetector

burnout = BurnoutDetector.analyze_study_patterns(
  study_sessions=[...],
  test_results=[...],
  days_lookback=30
)

if burnout.status == "critical":
  print("⚠️ URGENT: Student needs rest")
  print(f"Recovery needed: {burnout.recovery_days} days")
  for rec in burnout.recommendations:
    print(f"  - {rec}")

// ============================================
// FRONTEND EXAMPLES
// ============================================

// 1. USE AUTH IN COMPONENT
import { useAuth } from '@/context/AuthContext';

export function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <div>Please login</div>;
  }
  
  return <div>Welcome, {user.name}!</div>;
}

// 2. FETCH API DATA
import { apiService } from '@/services/api';
import { useEffect, useState } from 'react';

export function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await apiService.getDashboard();
      setMetrics(data.metrics);
    };
    fetchData();
  }, []);
  
  return <div>{metrics?.overall_accuracy}%</div>;
}

// 3. CREATE GLASS CARD COMPONENT
import { GlassCard } from '@/components/common/UI';

export function MyCard() {
  return (
    <GlassCard className="p-6">
      <h2>Title</h2>
      <p>Content here</p>
    </GlassCard>
  );
}

// 4. ADD ANIMATION
import { motion } from 'framer-motion';

export function AnimatedElement() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      Animated content
    </motion.div>
  );
}

// 5. SHOW CHART
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { date: 'Jan', score: 65 },
  { date: 'Feb', score: 72 },
  { date: 'Mar', score: 78 }
];

export function Chart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <Area type="monotone" dataKey="score" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// ============================================
// COMMON API ENDPOINTS
// ============================================

// Authentication
POST   /api/v1/auth/register           # Create new user
POST   /api/v1/auth/login              # Login
GET    /api/v1/auth/me                 # Get current user
POST   /api/v1/auth/google             # Google OAuth
POST   /api/v1/auth/apple              # Apple Sign-in
POST   /api/v1/auth/phone-otp/send     # Request OTP
POST   /api/v1/auth/phone-otp/verify   # Verify OTP

// Tests & Performance
POST   /api/v1/tests/upload            # Upload test result
GET    /api/v1/tests/history           # Get test history
GET    /api/v1/tests/history?limit=10  # With limit
GET    /api/v1/tests/dashboard         # Get dashboard metrics
GET    /api/v1/tests/recommendations   # Get recommendations

// Health
GET    /health                         # Basic health check
GET    /api/v1/health                  # API health with DB check

// ============================================
// ENVIRONMENT SETUP
// ============================================

// Backend .env
DATABASE_URL=postgresql://user:pass@localhost:5432/studyplusai
SECRET_KEY=<generated with openssl rand -hex 32>
DEBUG=false
GOOGLE_CLIENT_ID=<your-google-id>
GOOGLE_CLIENT_SECRET=<your-google-secret>
APPLE_TEAM_ID=<your-apple-team-id>
APPLE_CLIENT_ID=<your-apple-client-id>
APPLE_KEY_ID=<your-apple-key-id>

// Frontend .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=Study Plus AI

// ============================================
// DOCKER COMMANDS
// ============================================

// Build all services
docker-compose build

// Start services
docker-compose up -d

// View logs
docker-compose logs -f backend
docker-compose logs -f frontend

// Stop services
docker-compose down

// Clean everything
docker-compose down -v

// Rebuild a specific service
docker-compose build --no-cache backend

// ============================================
// TESTING
// ============================================

// Backend - Install pytest
pip install pytest pytest-asyncio httpx

// Run tests
pytest backend/tests/

// Frontend - Install Jest
npm install --save-dev jest @testing-library/react

// Run tests
npm test

// ============================================
// DEBUGGING
// ============================================

// Backend - Add logging
import logging
logger = logging.getLogger(__name__)
logger.info("Message")
logger.error("Error message")

// Frontend - Console logging
console.log("Debug info");
console.error("Error info");

// Backend - FastAPI debug
uvicorn app.main:app --reload --log-level debug

// ============================================
// PERFORMANCE MONITORING
// ============================================

// Monitor API response times
curl -w "@-" -o /dev/null -s http://localhost:8000/api/v1/health

// Check database performance
EXPLAIN ANALYZE SELECT * FROM test_results WHERE user_id = 1;

// Monitor memory usage
docker stats studyplusai_backend studyplusai_frontend

// ============================================
// DATABASE OPERATIONS
// ============================================

// Connect to PostgreSQL
psql -U studyplusai -d studyplusai -h localhost

// List tables
\\dt

// View table structure
\\d test_results

// Export data
pg_dump studyplusai > backup.sql

// Import data
psql studyplusai < backup.sql

// ============================================
// GIT OPERATIONS
// ============================================

// Create feature branch
git checkout -b feature/amazing-feature

// Commit changes
git add .
git commit -m "feat: Add amazing feature"

// Push to GitHub
git push origin feature/amazing-feature

// Create pull request
# Go to GitHub and click "New Pull Request"

// Merge to main
git checkout main
git pull
git merge feature/amazing-feature
git push origin main

// ============================================
// USEFUL LINKS
// ============================================

Next.js Docs: https://nextjs.org/docs
FastAPI Docs: https://fastapi.tiangolo.com/
Tailwind CSS: https://tailwindcss.com/docs
Framer Motion: https://www.framer.com/motion
Recharts: https://recharts.org
SQLAlchemy: https://sqlalchemy.org/

Pastel Color Generator: https://coolors.co
Tailwind UI: https://tailwindui.com
Iconography: https://react-icons.github.io/react-icons
