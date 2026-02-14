"""Pydantic schemas for user-related requests and responses."""

from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from app.models.user import UserRole


class UserBase(BaseModel):
    """Base user schema with common fields."""
    email: EmailStr
    name: str = Field(..., min_length=2, max_length=100)
    phone_number: Optional[str] = None
    school: Optional[str] = None
    grade: Optional[str] = None


class UserCreate(UserBase):
    """Schema for user creation."""
    password: str = Field(..., min_length=8, max_length=100)


class UserUpdate(BaseModel):
    """Schema for user profile updates."""
    name: Optional[str] = None
    phone_number: Optional[str] = None
    school: Optional[str] = None
    grade: Optional[str] = None
    bio: Optional[str] = None
    profile_picture: Optional[str] = None


class UserResponse(UserBase):
    """Schema for user response."""
    id: int
    role: UserRole
    is_active: bool
    is_verified: bool
    phone_verified: bool
    profile_picture: Optional[str]
    bio: Optional[str]
    created_at: datetime
    last_login: Optional[datetime]

    class Config:
        from_attributes = True


class UserDetailResponse(UserResponse):
    """Detailed user response with all fields."""
    google_id: Optional[str]
    apple_id: Optional[str]
    updated_at: datetime


# Authentication Schemas

class LoginRequest(BaseModel):
    """Schema for email/password login."""
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    """Schema for token response."""
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int  # Seconds


class PhoneOTPRequest(BaseModel):
    """Schema for requesting phone OTP."""
    phone_number: str = Field(..., pattern=r'^\+?1?\d{9,15}$')


class PhoneOTPVerify(BaseModel):
    """Schema for verifying phone OTP."""
    phone_number: str
    otp: str = Field(..., pattern=r'^\d{6}$')


class GoogleAuthRequest(BaseModel):
    """Schema for Google OAuth authorization."""
    id_token: str


class AppleAuthRequest(BaseModel):
    """Schema for Apple Sign-in authorization."""
    identity_token: str
    user_id: str
