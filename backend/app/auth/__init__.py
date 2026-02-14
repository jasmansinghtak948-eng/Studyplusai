"""Authentication module for Study Plus AI."""

from .jwt import (
    hash_password, verify_password, create_access_token,
    create_refresh_token, decode_token, create_tokens_pair
)
from .oauth import verify_google_token, verify_apple_token
from .otp import OTPManager, MockSMSService

__all__ = [
    "hash_password", "verify_password", "create_access_token",
    "create_refresh_token", "decode_token", "create_tokens_pair",
    "verify_google_token", "verify_apple_token",
    "OTPManager", "MockSMSService"
]
