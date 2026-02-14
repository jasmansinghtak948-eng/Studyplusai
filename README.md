# 📚 Study Plus AI - Academic Performance Intelligence System

A production-ready AI-powered academic platform that analyzes student performance, predicts future scores, and provides personalized study recommendations.

## 🌟 Features

### Core Analytics
- **Performance Analyzer** - Detailed chapter-wise accuracy tracking
- **Rank Predictor** - ML-based future score prediction
- **Study Optimization** - AI-powered study plan generation
- **Burnout Detection** - Monitor stress and suggest recovery
- **Heatmap Analysis** - Visualize weak areas by chapter

### Authentication
- Email/Password login with JWT
- Google OAuth integration
- Apple Sign-in support
- Phone OTP verification
- Role-based access control (Student/Admin)

### Technology Stack

**Frontend**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Recharts (data visualization)
- Pastel glassmorphism design

**Backend**
- FastAPI
- PostgreSQL with SQLAlchemy ORM
- JWT Authentication
- Scikit-learn ML models
- NumPy/Pandas analytics

## 📁 Project Structure

```
/workspaces/Studyplusai/
├── backend/
│   ├── app/
│   │   ├── models/          # SQLAlchemy ORM models
│   │   ├── schemas/         # Pydantic schemas
│   │   ├── routes/          # API endpoints
│   │   ├── services/        # Business logic
│   │   ├── auth/            # JWT, OAuth, OTP
│   │   ├── ml/              # ML modules
│   │   ├── db/              # Database config
│   │   ├── utils/           # Helpers
│   │   └── main.py          # FastAPI app
│   ├── requirements.txt
│   ├── .env.example
│   └── main.py              # Entry point
├── frontend/
│   ├── src/
│   │   ├── app/             # Next.js pages
│   │   ├── components/      # React components
│   │   ├── services/        # API client
│   │   ├── context/         # Auth context
│   │   ├── utils/           # Utilities
│   │   └── styles/          # CSS
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── .env.example
└── docker-compose.yml
```

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL 14+
- Docker & Docker Compose (optional)

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup environment
cp .env.example .env
# Edit .env with your settings

# Initialize database
python -c "from app.db import init_db; init_db()"

# Run server
uvicorn app.main:app --reload
```

Backend runs on `http://localhost:8000`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local

# Run development server
npm run dev
```

Frontend runs on `http://localhost:3000`

### Docker Setup (Optional)

```bash
# From root directory
docker-compose up -d

# Backend: http://localhost:8000
# Frontend: http://localhost:3000
# PostgreSQL: localhost:5432
```

## 🔑 Key Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - Email/password login
- `POST /api/v1/auth/google` - Google OAuth
- `POST /api/v1/auth/apple` - Apple Sign-in
- `POST /api/v1/auth/phone-otp/send` - Request OTP
- `POST /api/v1/auth/phone-otp/verify` - Verify OTP

### Tests & Performance
- `POST /api/v1/tests/upload` - Upload test result
- `GET /api/v1/tests/history` - Get test history
- `GET /api/v1/tests/dashboard` - Dashboard metrics
- `GET /api/v1/tests/recommendations` - Study recommendations

## 🤖 ML Models

### Performance Analyzer
```python
from app.ml import PerformanceAnalyzer

analysis = PerformanceAnalyzer.analyze_test_results(test_results)
# Returns: accuracy, trends, weak chapters, consistency
```

### Rank Predictor
```python
from app.ml import RankPredictor

prediction = RankPredictor.get_full_prediction(
    historical_scores,
    target_score=90
)
# Returns: predicted_score, confidence, trend, rank
```

### Study Optimizer
```python
from app.ml import StudyOptimizer

recommendations = StudyOptimizer.get_priority_chapters(
    chapters_data,
    top_n=5
)
# Returns: prioritized study plan
```

### Burnout Detector
```python
from app.ml import BurnoutDetector

burnout = BurnoutDetector.analyze_study_patterns(
    study_sessions,
    test_results
)
# Returns: burnout_score, status, recommendations
```

## 🎨 Design System

### Color Palette (Pastel Gradient)
- Lavender: `#e0c3fc`
- Sky Blue: `#8ec5fc`
- Mint: `#a5fecb`
- Peach: `#ffdab9`
- Rose: `#ffb6c1`

### Components
- Glassmorphism cards with backdrop blur
- Smooth Framer Motion animations
- Recharts data visualizations
- Responsive Tailwind CSS layout

## 📊 Database Schema

### Users
- id, email, name, hashed_password
- phone_number, google_id, apple_id
- phone_verified, is_verified, role
- created_at, last_login

### Test Results
- id, user_id, test_name, subject
- total_questions, correct_answers, wrong_answers
- score, accuracy, time_taken
- chapter_performance (JSON), test_date

### Study Sessions
- id, user_id, chapter, subject
- duration_minutes, focus_score
- date, created_at

### Weak Areas
- id, user_id, chapter, subject
- accuracy, times_attempted
- priority_score, suggested_focus
- last_updated

## 🔐 Security

- JWT token-based authentication
- Password hashing with bcrypt
- CORS middleware configuration
- Rate limiting ready
- SQL injection protection via SQLAlchemy ORM

## 📝 API Documentation

Interactive API docs available at `http://localhost:8000/docs`

## 🧪 Testing

```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test
```

## 📚 Documentation

- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)
- [ML Models Documentation](./backend/app/ml/README.md)

## 🤝 Contributing

1. Create feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit changes (`git commit -m 'Add AmazingFeature'`)
3. Push to branch (`git push origin feature/AmazingFeature`)
4. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Author

**Jass Singh**
- GitHub: [@jasmansinghtak948-eng](https://github.com/jasmansinghtak948-eng)

## 🙌 Support

For support, email support@studyplusai.ai or open an issue on GitHub.

---

**Built with ❤️ for smarter learning**
