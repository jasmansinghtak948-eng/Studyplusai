"""Pydantic schemas for Study Plus AI."""

from .user import (
    UserBase, UserCreate, UserUpdate, UserResponse, UserDetailResponse,
    LoginRequest, TokenResponse, PhoneOTPRequest, PhoneOTPVerify,
    GoogleAuthRequest, AppleAuthRequest
)
from .test import (
    TestResultBase, TestResultCreate, TestResultResponse,
    StudySessionBase, StudySessionCreate, StudySessionResponse,
    WeakAreaBase, WeakAreaResponse, PerformanceStats,
    ChapterPerformance, DashboardMetrics
)

__all__ = [
    "UserBase", "UserCreate", "UserUpdate", "UserResponse", "UserDetailResponse",
    "LoginRequest", "TokenResponse", "PhoneOTPRequest", "PhoneOTPVerify",
    "GoogleAuthRequest", "AppleAuthRequest",
    "TestResultBase", "TestResultCreate", "TestResultResponse",
    "StudySessionBase", "StudySessionCreate", "StudySessionResponse",
    "WeakAreaBase", "WeakAreaResponse", "PerformanceStats",
    "ChapterPerformance", "DashboardMetrics"
]
