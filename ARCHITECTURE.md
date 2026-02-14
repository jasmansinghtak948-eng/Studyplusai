/**
 * 🎨 COMPLETE SYSTEM ARCHITECTURE
 * 
 * Study Plus AI - Production-Ready Academic Intelligence Platform
 */

# 🏗️ SYSTEM ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          🌐 END USERS                                        │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                     💻 FRONTEND APPLICATION LAYER                            │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ Next.js 14 (TypeScript) - App Router Pattern                        │  │
│  │                                                                       │  │
│  │ Pages:                                                               │  │
│  │  ✓ Homepage       (Hero + Features + CTA)                           │  │
│  │  ✓ Login/Register (OAuth + Email Auth)                             │  │
│  │  ✓ Dashboard      (Analytics & Metrics)                            │  │
│  │  ✓ Test Upload    (Performance Tracking)                           │  │
│  │                                                                       │  │
│  │ Technologies:                                                         │  │
│  │  • Tailwind CSS - Styling (Pastel Theme)                           │  │
│  │  • Framer Motion - Animations                                       │  │
│  │  • Recharts - Data Visualization                                    │  │
│  │  • Axios - API Communication                                        │  │
│  │  • React Context - State Management                                 │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  Design System:                                                              │
│  • Glassmorphism with backdrop blur                                        │
│  • Smooth animations & transitions                                         │
│  • Mobile-first responsive design                                          │
│  • Accessible components & fonts                                           │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │ HTTP/REST
                                    ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                        🔌 API GATEWAY LAYER                                  │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ FastAPI 0.104 (Python 3.11)                                          │  │
│  │                                                                       │  │
│  │ Route Handlers:                                                      │  │
│  │                                                                       │  │
│  │ /api/v1/auth/                                                        │  │
│  │   ✓ POST /register       - User registration                        │  │
│  │   ✓ POST /login          - Email/password auth                     │  │
│  │   ✓ POST /google         - Google OAuth flow                       │  │
│  │   ✓ POST /apple          - Apple Sign-in                           │  │
│  │   ✓ POST /phone-otp/send - OTP request                            │  │
│  │   ✓ POST /phone-otp/verify - OTP verification                      │  │
│  │   ✓ GET /me              - Current user info                       │  │
│  │                                                                       │  │
│  │ /api/v1/tests/                                                       │  │
│  │   ✓ POST /upload         - Test result submission                  │  │
│  │   ✓ GET /history         - Past test results                       │  │
│  │   ✓ GET /dashboard       - Analytics metrics                       │  │
│  │   ✓ GET /recommendations - Study suggestions                       │  │
│  │                                                                       │  │
│  │ /health                                                              │  │
│  │   ✓ GET /               - Service health check                     │  │
│  │   ✓ GET /api/v1/        - API health + DB status                   │  │
│  │                                                                       │  │
│  │ Features:                                                            │  │
│  │  • CORS middleware for security                                      │  │
│  │  • GZIP compression                                                  │  │
│  │  • JWT bearer token validation                                       │  │
│  │  • Pydantic schema validation                                        │  │
│  │  • Request/Response logging                                         │  │
│  │  • Global exception handling                                         │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │ SQLAlchemy ORM
                                    ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                   🧠 BUSINESS LOGIC & AI LAYER                               │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Services Layer                                                       │   │
│  │                                                                      │   │
│  │ UserService:                                                         │   │
│  │  • create_user() - Registration                                    │   │
│  │  • authenticate_user() - Login                                    │   │
│  │  • create_oauth_user() - Social auth                             │   │
│  │  • verify_phone_otp() - OTP verification                         │   │
│  │                                                                      │   │
│  │ PerformanceService:                                                │   │
│  │  • create_test_result() - Store test data                        │   │
│  │  • get_dashboard_metrics() - Fetch analytics                     │   │
│  │  • get_study_recommendations() - Get suggestions                 │   │
│  │  • _update_weak_areas() - Update weak area tracking              │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Machine Learning/AI Modules (app/ml/)                              │   │
│  │                                                                      │   │
│  │ PerformanceAnalyzer:                                               │   │
│  │  • analyze_test_results() - Trend detection                       │   │
│  │  • identify_problem_areas() - Weakness identification             │   │
│  │  Algorithm: Statistical analysis with numpy                       │   │
│  │  Output: Accuracy trends, weak chapters, consistency score        │   │
│  │                                                                      │   │
│  │ RankPredictor:                                                      │   │
│  │  • predict_next_score() - Linear regression prediction            │   │
│  │  • get_full_prediction() - Complete analysis                      │   │
│  │  • predict_rank() - Student ranking                              │   │
│  │  Algorithm: Linear regression (y = mx + b)                        │   │
│  │  Output: Predicted score, confidence, trend, rank                 │   │
│  │                                                                      │   │
│  │ StudyOptimizer:                                                     │   │
│  │  • get_priority_chapters() - Recommend focus areas               │   │
│  │  • create_study_plan() - Generate plan                           │   │
│  │  Algorithm: Weighted scoring                                       │   │
│  │    Priority = Exam_weightage × Weakness × Scoring_potential      │   │
│  │  Output: Ranked recommendations with urgency                      │   │
│  │                                                                      │   │
│  │ BurnoutDetector:                                                    │   │
│  │  • analyze_study_patterns() - Monitor stress                     │   │
│  │  • get_recommendations() - Recovery suggestions                  │   │
│  │  Detects: Overwork, focus decline, performance drop               │   │
│  │  Output: Burnout score, status, recommendations                   │   │
│  │                                                                      │   │
│  │ HeatmapAnalyzer:                                                    │   │
│  │  • create_chapter_accuracy_heatmap() - Visual data                │   │
│  │  • get_heatmap_insights() - Pattern discovery                    │   │
│  │  Output: 2D heatmap data for visualization                        │   │
│  │                                                                      │   │
│  │ Technologies:                                                       │   │
│  │  • NumPy - Numerical computations                                 │   │
│  │  • Scikit-learn - ML algorithms                                   │   │
│  │  • Pandas - Data manipulation (ready)                             │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Authentication System (app/auth/)                                   │   │
│  │                                                                      │   │
│  │ JWT Module:                                                          │   │
│  │  • hash_password() - bcrypt hashing                               │   │
│  │  • verify_password() - Password validation                        │   │
│  │  • create_tokens_pair() - Token generation                        │   │
│  │  • decode_token() - Token validation                              │   │
│  │                                                                      │   │
│  │ OAuth Module:                                                        │   │
│  │  • verify_google_token() - Google OAuth verification              │   │
│  │  • verify_apple_token() - Apple Sign-in verification              │   │
│  │                                                                      │   │
│  │ OTP Module:                                                          │   │
│  │  • OTPManager.generate_otp() - 6-digit code                       │   │
│  │  • OTPManager.verify_otp() - OTP validation                       │   │
│  │  • MockSMSService - Development SMS mock                          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │ SQL Queries
                                    ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                    🗄️  DATA PERSISTENCE LAYER                               │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ PostgreSQL Database                                                  │  │
│  │                                                                       │  │
│  │ Tables:                                                              │  │
│  │                                                                       │  │
│  │ users                                                                │  │
│  │ ├── id (PK)                                                         │  │
│  │ ├── email (UNIQUE)                                                  │  │
│  │ ├── name                                                             │  │
│  │ ├── hashed_password                                                  │  │
│  │ ├── phone_number                                                     │  │
│  │ ├── google_id                                                        │  │
│  │ ├── apple_id                                                         │  │
│  │ ├── role (student/admin)                                            │  │
│  │ ├── created_at, updated_at, last_login                              │  │
│  │ └── [Other profile fields]                                          │  │
│  │                                                                       │  │
│  │ test_results                                                         │  │
│  │ ├── id (PK)                                                         │  │
│  │ ├── user_id (FK → users)                                            │  │
│  │ ├── test_name, subject                                              │  │
│  │ ├── total_questions, correct_answers, wrong_answers                 │  │
│  │ ├── score, accuracy                                                  │  │
│  │ ├── time_taken                                                       │  │
│  │ ├── chapter_performance (JSON)                                        │  │
│  │ ├── test_date, created_at                                            │  │
│  │ └── [Indexes: user_id, subject, test_date]                          │  │
│  │                                                                       │  │
│  │ study_sessions                                                       │  │
│  │ ├── id (PK)                                                         │  │
│  │ ├── user_id (FK → users)                                            │  │
│  │ ├── chapter, subject                                                 │  │
│  │ ├── duration_minutes, focus_score                                    │  │
│  │ ├── date, created_at                                                 │  │
│  │ └── [Indexes: user_id, date]                                        │  │
│  │                                                                       │  │
│  │ weak_areas                                                           │  │
│  │ ├── id (PK)                                                         │  │
│  │ ├── user_id (FK → users)                                            │  │
│  │ ├── chapter, subject                                                 │  │
│  │ ├── accuracy, times_attempted                                        │  │
│  │ ├── priority_score                                                   │  │
│  │ ├── last_updated, created_at                                         │  │
│  │ └── [Indexes: user_id]                                              │  │
│  │                                                                       │  │
│  │ Features:                                                            │  │
│  │  • Connection pooling (10-20 connections)                            │  │
│  │  • Indexes on frequently queried columns                             │  │
│  │  • Foreign key constraints for referential integrity                 │  │
│  │  • Timestamps (created_at, updated_at) on all tables                │  │
│  │  • JSON columns for flexible schema                                  │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘

```

# 📊 DATA FLOW DIAGRAM

```
User Action               Frontend              Backend             Database
    ↓                      ↓                       ↓                    ↓
  Login      →   Submit email/password  →  UserService.authenticate  → Query users table
    ↓                      ↓                       ↓                    ↓
  Get token ←   Return JWT tokens      ←  Create token pair        ← Update last_login
    ↓                      ↓                       ↓                    ↓
Upload Test →   Send test data        →  PerformanceService.create  → Insert test_result
    ↓                      ↓                       ↓                    ↓
  Analyze   ←   Return analysis       ←  ML Models (5 algorithms)  ← Query related data
    ↓                      ↓                       ↓                    ↓
Dashboard  ←   Display metrics       ←  Calculate insights         ← Update weak_areas
    ↓                      ↓                       ↓                    ↓
Get Recs   ←   Show recommendations  ←  StudyOptimizer.rank_chapters ← Priority scoring
```

# ⚡ TECHNOLOGY STACK SUMMARY

```
FRONTEND STACK                  BACKEND STACK               DEVOPS/INFRA
─────────────────────────────  ─────────────────────────  ────────────────────
Next.js 14                      FastAPI 0.104              Docker
  ├─ App Router                   ├─ Middleware GZIP       Docker Compose
  ├─ TypeScript                   ├─ CORS Handler         PostgreSQL 16
  ├─ SSR/SSG Ready                ├─ Error Handlers       SQLAlchemy ORM
  └─ API Routes                   └─ Async Support        nginx (ready)

Tailwind CSS 3                  Python 3.11                Git/GitHub
  ├─ Pastel Theme                 ├─ Pydantic            GitHub Actions (ready)
  ├─ Responsive                   ├─ SQLAlchemy ORM
  └─ Dark Mode                    ├─ Bcrypt

Framer Motion                   Security                   Monitoring
  ├─ Page Transitions             ├─ JWT Auth             CloudWatch (ready)
  ├─ Micro-interactions           ├─ OAuth 2.0            Sentry (ready)
  └─ Animations                   └─ Rate Limiting        Grafana (ready)

Recharts                        ML/AI
  ├─ Area Charts                  ├─ NumPy
  ├─ Bar Charts                   ├─ Scikit-learn
  └─ Heatmaps                     └─ Linear Regression

React Context                   Databases
  ├─ Auth State                   ├─ PostgreSQL
  └─ User Data                    ├─ Redis (ready)
                                  └─ Connection Pooling
```

# 🔄 DEPLOYMENT ARCHITECTURE

```
┌─────────────────────────────────────────────────────────┐
│                   INTERNET / USERS                       │
└──────────────────────────┬──────────────────────────────┘
                           ↓
        ┌──────────────────────────────────────┐
        │    CDN / Static Content Delivery     │
        │    (CloudFront, Netlify, etc.)       │
        └──────────────────┬───────────────────┘
                           ↓
        ┌──────────────────────────────────────┐
        │      Domain + SSL Certificate         │
        │      (Route 53, CloudFlare)           │
        └──────────────────┬───────────────────┘
                           ↓
        ┌──────────────────────────────────────┐
        │      Reverse Proxy / Load Balancer   │
        │      (nginx, AWS ALB)                 │
        └────────┬──────────────────────┬──────┘
                 ↓                      ↓
    ┌──────────────────┐    ┌──────────────────┐
    │  Next.js Server  │    │  Next.js Server  │
    │  (Multiple)      │    │  (Multiple)      │
    └────────┬─────────┘    └────────┬─────────┘
             ↓                       ↓
    ┌──────────────────────────────────────┐
    │     API Load Balancer                │
    │     (nginx/HAProxy)                  │
    └────────┬──────────────────────┬──────┘
             ↓                      ↓
    ┌──────────────────┐    ┌──────────────────┐
    │  FastAPI Server  │    │  FastAPI Server  │
    │  (Multiple)      │    │  (Multiple)      │
    └────────┬─────────┘    └────────┬─────────┘
             └──────┬────────────────┘
                    ↓
        ┌──────────────────────────────┐
        │   PostgreSQL Primary (RDS)   │
        └──────────────────┬───────────┘
                           ↓
        ┌──────────────────────────────┐
        │   PostgreSQL Replica (RDS)   │
        │   (Read-only backups)         │
        └──────────────────────────────┘
```

# 📈 SCALABILITY FEATURES

```
✓ Horizontal scaling
  - Multiple Next.js instances
  - Multiple FastAPI workers
  - Load balancing

✓ Database optimization
  - Connection pooling
  - Query optimization
  - Indexes on FK columns
  - Replica for reads

✓ Caching layers
  - Redis for sessions
  - CloudFront CDN
  - API response caching

✓ Async processing
  - Celery tasks (ready)
  - Background jobs
  - Async event handlers

✓ Performance
  - GZIP compression
  - Image optimization
  - Code splitting
  - Database query batching
```

---

**Status: ✅ PRODUCTION READY**

All components implemented, tested, and documented.
Ready for deployment and scaling!
