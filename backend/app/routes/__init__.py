"""Routes module for EduIntel AI API."""

from .auth import router as auth_router
from .tests import router as tests_router
from .health import router as health_router

__all__ = ["auth_router", "tests_router", "health_router"]
