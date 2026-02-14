"""OTP (One-Time Password) utilities for phone authentication."""

import random
import string
from datetime import datetime, timedelta
from typing import Optional, Tuple


class OTPManager:
    """Manage OTP generation, validation, and expiration."""
    
    OTP_LENGTH = 6
    OTP_EXPIRY_MINUTES = 10
    MAX_ATTEMPTS = 3
    
    @staticmethod
    def generate_otp() -> str:
        """Generate a random 6-digit OTP."""
        return ''.join(random.choices(string.digits, k=OTPManager.OTP_LENGTH))
    
    @staticmethod
    def create_otp() -> Tuple[str, datetime]:
        """
        Create OTP with expiration time.
        
        Returns:
            Tuple of (otp_code, expiry_time)
        """
        otp = OTPManager.generate_otp()
        expiry = datetime.utcnow() + timedelta(minutes=OTPManager.OTP_EXPIRY_MINUTES)
        return otp, expiry
    
    @staticmethod
    def verify_otp(otp: str, stored_otp: str, expiry_time: Optional[datetime]) -> bool:
        """
        Verify OTP against stored OTP and check expiration.
        
        Args:
            otp: OTP provided by user
            stored_otp: OTP stored in database
            expiry_time: OTP expiration time
            
        Returns:
            True if OTP is valid and not expired
        """
        if not stored_otp or not expiry_time:
            return False
        
        # Check expiration
        if datetime.utcnow() > expiry_time:
            return False
        
        # Check OTP match
        return otp == stored_otp


class MockSMSService:
    """Mock SMS service for development. In production, integrate with Twilio/AWS SNS."""
    
    # In production, store these in a real service like Redis
    _otp_cache = {}
    
    @staticmethod
    def send_otp(phone_number: str, otp: str) -> bool:
        """
        Send OTP to phone number.
        
        Args:
            phone_number: Phone number to send OTP to
            otp: OTP code to send
            
        Returns:
            True if sending was successful
        """
        # Mock implementation - logs to console
        print(f"\n📱 [MOCK SMS] Sending OTP to {phone_number}: {otp}")
        MockSMSService._otp_cache[phone_number] = otp
        return True
    
    @staticmethod
    def get_mock_otp(phone_number: str) -> Optional[str]:
        """Get mock OTP for testing purposes (development only)."""
        return MockSMSService._otp_cache.get(phone_number)


# In production, replace MockSMSService with real service like:
# from twilio.rest import Client
# client = Client(account_sid, auth_token)
