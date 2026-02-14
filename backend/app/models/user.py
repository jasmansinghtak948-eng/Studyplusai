"""User model for authentication and profile management."""

from sqlalchemy import Column, Integer, String, DateTime, Boolean, Enum
from datetime import datetime
import enum
from app.db.database import Base


class UserRole(str, enum.Enum):
    """User role enumeration."""
    STUDENT = "student"
    ADMIN = "admin"
    TEACHER = "teacher"


class User(Base):
    """User model for authentication and profile."""
    
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=True)  # Null for OAuth users
    phone_number = Column(String, unique=True, index=True, nullable=True)
    
    # Profile info
    profile_picture = Column(String, nullable=True)
    bio = Column(String, nullable=True)
    school = Column(String, nullable=True)
    grade = Column(String, nullable=True)
    
    # Authentication
    role = Column(Enum(UserRole), default=UserRole.STUDENT, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    is_verified = Column(Boolean, default=False, nullable=False)
    
    # OAuth
    google_id = Column(String, unique=True, nullable=True)
    apple_id = Column(String, unique=True, nullable=True)
    
    # Phone OTP
    phone_otp = Column(String, nullable=True)
    phone_otp_expires_at = Column(DateTime, nullable=True)
    phone_verified = Column(Boolean, default=False)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    last_login = Column(DateTime, nullable=True)
    
    def __repr__(self):
        return f"<User(id={self.id}, email={self.email}, role={self.role})>"
