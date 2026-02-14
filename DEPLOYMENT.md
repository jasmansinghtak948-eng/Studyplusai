# 🚀 Deployment Guide

## Production Checklist

### Backend (FastAPI)

1. **Environment Setup**
   - Generate secure SECRET_KEY: `openssl rand -hex 32`
   - Configure DATABASE_URL for production PostgreSQL
   - Set ALLOWED_ORIGINS for CORS
   - Set DEBUG=false

2. **Database**
   ```bash
   # Create database
   createdb studyplusai
   
   # Run migrations
   alembic upgrade head
   ```

3. **Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run with Gunicorn**
   ```bash
   gunicorn -w 4 -b 0.0.0.0:8000 "app.main:app"
   ```

5. **Monitoring**
   - Enable structured logging
   - Setup error tracking (Sentry)
   - Monitor performance metrics

### Frontend (Next.js)

1. **Build**
   ```bash
   npm run build
   ```

2. **Environment**
   - Set NEXT_PUBLIC_API_URL to production backend URL

3. **Deploy**
   - Vercel (recommended)
   - AWS Amplify
   - Docker container
   - Any Node.js hosting

### Docker Deployment

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Scale backend
docker-compose up -d --scale backend=3
```

### SSL/TLS Setup

- Use Let's Encrypt for certificates
- Configure reverse proxy (nginx)
- Redirect HTTP to HTTPS

### Database Backups

```bash
# Backup
pg_dump studyplusai > backup.sql

# Restore
psql studyplusai < backup.sql
```

### Performance Optimization

1. **Frontend**
   - Enable gzip compression
   - Optimize images
   - Code splitting with Next.js
   - CDN for static assets

2. **Backend**
   - Database connection pooling
   - Redis caching for frequent queries
   - Async task queue for heavy computations
   - Load balancing

### Monitoring & Alerts

- Application Performance Monitoring (APM)
- Database monitoring
- API response time tracking
- User analytics

## Security Hardening

- Regular dependency updates
- SQL injection prevention (ORM)
- XSS protection (Pydantic validation)
- CSRF tokens
- API rate limiting
- Input validation
- Output encoding
