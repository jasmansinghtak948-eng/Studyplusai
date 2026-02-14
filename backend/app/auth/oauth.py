"""OAuth2 configuration for Google and Apple authentication."""

import os
from google.auth.transport import requests
from google.oauth2 import id_token


# OAuth2 Configuration
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "your-google-client-id")
APPLE_TEAM_ID = os.getenv("APPLE_TEAM_ID", "your-apple-team-id")
APPLE_CLIENT_ID = os.getenv("APPLE_CLIENT_ID", "your-apple-client-id")
APPLE_KEY_ID = os.getenv("APPLE_KEY_ID", "your-apple-key-id")


def verify_google_token(id_token_str: str) -> dict:
    """
    Verify Google ID token and extract user information.
    
    Args:
        id_token_str: Google ID token from frontend
        
    Returns:
        Dictionary with user info (email, name, picture, google_id)
        
    Raises:
        ValueError: If token is invalid
    """
    try:
        idinfo = id_token.verify_oauth2_token(
            id_token_str, 
            requests.Request(),
            GOOGLE_CLIENT_ID
        )
        
        # Verify token issuer
        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise ValueError('Wrong issuer')
        
        return {
            "google_id": idinfo['sub'],
            "email": idinfo['email'],
            "name": idinfo.get('name', ''),
            "picture": idinfo.get('picture', ''),
            "email_verified": idinfo.get('email_verified', False)
        }
    except Exception as e:
        raise ValueError(f"Invalid Google token: {str(e)}")


def verify_apple_token(identity_token: str) -> dict:
    """
    Verify Apple ID token and extract user information.
    
    Note: Full Apple token verification requires additional setup with JWKS.
    This is a simplified version.
    
    Args:
        identity_token: Apple identity token from frontend
        
    Returns:
        Dictionary with user info (apple_id, email, name)
        
    Raises:
        ValueError: If token is invalid
    """
    try:
        import jwt
        
        # Note: In production, verify the JWT signature using Apple's public key
        # For now, decode without verification (NOT recommended for production)
        payload = jwt.decode(identity_token, options={"verify_signature": False})
        
        return {
            "apple_id": payload['sub'],
            "email": payload.get('email', ''),
        }
    except Exception as e:
        raise ValueError(f"Invalid Apple token: {str(e)}")
