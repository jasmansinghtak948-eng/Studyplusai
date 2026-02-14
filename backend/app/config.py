"""
Configuration management for EduIntel AI
"""

import os
from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """Application settings."""
    
    # App
    app_name: str = "Study Plus AI"
    app_version: str = "1.0.0"
    debug: bool = os.getenv("DEBUG", "false").lower() == "true"
    
    # Database
    db_url: str = os.getenv(
        "DATABASE_URL",
        "postgresql://user:password@localhost:5432/studyplusai"
    )
    
    # JWT
    secret_key: str = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60
    refresh_token_expire_days: int = 7
    
    # OAuth
    google_client_id: str = os.getenv("GOOGLE_CLIENT_ID", "")
    google_client_secret: str = os.getenv("GOOGLE_CLIENT_SECRET", "")
    apple_team_id: str = os.getenv("APPLE_TEAM_ID", "")
    apple_client_id: str = os.getenv("APPLE_CLIENT_ID", "")
    apple_key_id: str = os.getenv("APPLE_KEY_ID", "")
    
    # CORS
    allowed_origins: list = os.getenv(
        "ALLOWED_ORIGINS",
        "http://localhost:3000,http://localhost:8000"
    ).split(",")
    
    # Email (for notifications)
    smtp_server: Optional[str] = os.getenv("SMTP_SERVER")
    smtp_port: Optional[int] = int(os.getenv("SMTP_PORT", "587"))
    email_address: Optional[str] = os.getenv("EMAIL_ADDRESS")
    email_password: Optional[str] = os.getenv("EMAIL_PASSWORD")
    
    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()
