"""Main FastAPI application for Study Plus AI."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from contextlib import asynccontextmanager
from app.db import init_db
from app.routes import auth_router, tests_router, health_router


# Lifespan context manager for startup/shutdown
@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Manage app startup and shutdown.
    """
    # Startup
    print("🚀 Starting Study Plus AI Server...")
    try:
        init_db()
        print("✅ Database initialized")
    except Exception as e:
        print(f"❌ Database initialization failed: {e}")
    
    yield
    
    # Shutdown
    print("🛑 Shutting down Study Plus AI Server...")


# Create FastAPI app
app = FastAPI(
    title="Study Plus AI - Academic Performance Intelligence System",
    description="Production-ready AI-powered academic platform",
    version="1.0.0",
    lifespan=lifespan
)


# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure properly in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# GZIP compression
app.add_middleware(GZipMiddleware, minimum_size=1000)


# Include routers
app.include_router(health_router)
app.include_router(auth_router)
app.include_router(tests_router)


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": "Welcome to Study Plus AI",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health"
    }


# Error handlers
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    """Handle uncaught exceptions."""
    return {
        "status": "error",
        "detail": str(exc)
    }


if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
