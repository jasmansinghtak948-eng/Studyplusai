"""Authentication API routes."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db import get_db
from app.schemas import (
    UserCreate, UserResponse, LoginRequest, TokenResponse,
    PhoneOTPRequest, PhoneOTPVerify, GoogleAuthRequest, AppleAuthRequest
)
from app.services import UserService
from app.auth import verify_google_token, verify_apple_token


router = APIRouter(prefix="/api/v1/auth", tags=["Authentication"])


@router.post("/register", response_model=dict)
async def register(user_in: UserCreate, db: Session = Depends(get_db)):
    """Register a new user with email and password."""
    try:
        user = UserService.create_user(db, user_in)
        tokens = {
            "access_token": "token",
            "refresh_token": "refresh",
            "token_type": "bearer"
        }
        return {
            "status": "success",
            "message": "User registered successfully",
            "user": UserResponse.from_orm(user),
            "tokens": tokens
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.post("/login", response_model=dict)
async def login(login_data: LoginRequest, db: Session = Depends(get_db)):
    """Login with email and password."""
    try:
        result = UserService.authenticate_user(db, login_data.email, login_data.password)
        return {
            "status": "success",
            "message": "logged in successfully",
            **result
        }
    except HTTPException as e:
        raise e


@router.post("/google", response_model=dict)
async def google_auth(request: GoogleAuthRequest, db: Session = Depends(get_db)):
    """Authenticate with Google OAuth."""
    try:
        # Verify Google token
        user_info = verify_google_token(request.id_token)
        
        # Create or get user
        user = UserService.create_oauth_user(db, user_info, "google")
        
        # Generate tokens
        tokens = {
            "access_token": "token",
            "refresh_token": "refresh",
            "token_type": "bearer",
            "expires_in": 3600
        }
        
        return {
            "status": "success",
            "message": "Authenticated with Google",
            "user": UserResponse.from_orm(user),
            "tokens": tokens
        }
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e)
        )


@router.post("/apple", response_model=dict)
async def apple_auth(request: AppleAuthRequest, db: Session = Depends(get_db)):
    """Authenticate with Apple Sign-in."""
    try:
        # Verify Apple token
        user_info = verify_apple_token(request.identity_token)
        user_info["apple_id"] = request.user_id
        
        # Create or get user
        user = UserService.create_oauth_user(db, user_info, "apple")
        
        # Generate tokens
        tokens = {
            "access_token": "token",
            "refresh_token": "refresh",
            "token_type": "bearer",
            "expires_in": 3600
        }
        
        return {
            "status": "success",
            "message": "Authenticated with Apple",
            "user": UserResponse.from_orm(user),
            "tokens": tokens
        }
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e)
        )


@router.post("/phone-otp/send", response_model=dict)
async def send_phone_otp(
    request: PhoneOTPRequest,
    current_user = Depends(None),  # Optional authentication
    db: Session = Depends(get_db)
):
    """Request OTP for phone verification."""
    try:
        # For this example, we'll use a mock user_id if not authenticated
        user_id = current_user.id if current_user else 1
        
        result = UserService.request_phone_otp(db, user_id, request.phone_number)
        
        return {
            "status": "success",
            **result
        }
    except HTTPException as e:
        raise e


@router.post("/phone-otp/verify", response_model=dict)
async def verify_phone_otp(
    request: PhoneOTPVerify,
    current_user = Depends(None),  # Optional for demo
    db: Session = Depends(get_db)
):
    """Verify phone OTP."""
    try:
        user_id = current_user.id if current_user else 1
        
        result = UserService.verify_phone_otp(db, user_id, request.otp)
        
        return {
            "status": "success",
            **result
        }
    except HTTPException as e:
        raise e


@router.get("/me", response_model=dict)
async def get_current_user_info(
    current_user = Depends(None),
    db: Session = Depends(get_db)
):
    """Get current user information."""
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated"
        )
    
    return {
        "status": "success",
        "user": UserResponse.from_orm(current_user)
    }
