"""User authentication and management service."""

from sqlalchemy.orm import Session
from datetime import datetime
from app.models import User, UserRole
from app.schemas import UserCreate, UserResponse, UserUpdate
from app.auth import hash_password, verify_password, create_tokens_pair, OTPManager, MockSMSService
from fastapi import HTTPException, status


class UserService:
    """Service for user management and authentication."""
    
    @staticmethod
    def create_user(db: Session, user_in: UserCreate) -> User:
        """Create a new user."""
        
        # Check if user already exists
        existing_user = db.query(User).filter(User.email == user_in.email).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        # Create new user
        db_user = User(
            email=user_in.email,
            name=user_in.name,
            hashed_password=hash_password(user_in.password),
            phone_number=user_in.phone_number,
            school=user_in.school,
            grade=user_in.grade,
            is_active=True,
            is_verified=False
        )
        
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        
        return db_user
    
    @staticmethod
    def authenticate_user(db: Session, email: str, password: str) -> dict:
        """Authenticate user and return tokens."""
        
        user = db.query(User).filter(User.email == email).first()
        
        if not user or not verify_password(password, user.hashed_password or ""):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials"
            )
        
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User account is inactive"
            )
        
        # Update last login
        user.last_login = datetime.utcnow()
        db.commit()
        
        # Generate tokens
        tokens = create_tokens_pair(user.id, user.email)
        return {**tokens, "user": UserResponse.from_orm(user)}
    
    @staticmethod
    def get_user_by_id(db: Session, user_id: int) -> User:
        """Get user by ID."""
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        return user
    
    @staticmethod
    def get_user_by_email(db: Session, email: str) -> User:
        """Get user by email."""
        user = db.query(User).filter(User.email == email).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        return user
    
    @staticmethod
    def update_user(db: Session, user_id: int, user_update: UserUpdate) -> User:
        """Update user profile."""
        
        user = UserService.get_user_by_id(db, user_id)
        
        update_data = user_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(user, field, value)
        
        db.add(user)
        db.commit()
        db.refresh(user)
        
        return user
    
    @staticmethod
    def request_phone_otp(db: Session, user_id: int, phone_number: str) -> dict:
        """Request OTP for phone verification."""
        
        user = UserService.get_user_by_id(db, user_id)
        
        # Generate OTP
        otp, expiry = OTPManager.create_otp()
        
        # Update user
        user.phone_number = phone_number
        user.phone_otp = otp
        user.phone_otp_expires_at = expiry
        
        # Send OTP (mock)
        MockSMSService.send_otp(phone_number, otp)
        
        db.add(user)
        db.commit()
        
        return {"message": "OTP sent successfully", "phone": phone_number}
    
    @staticmethod
    def verify_phone_otp(db: Session, user_id: int, otp: str) -> dict:
        """Verify phone OTP."""
        
        user = UserService.get_user_by_id(db, user_id)
        
        # Verify OTP
        if not OTPManager.verify_otp(otp, user.phone_otp, user.phone_otp_expires_at):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid or expired OTP"
            )
        
        # Mark as verified
        user.phone_verified = True
        user.phone_otp = None
        user.phone_otp_expires_at = None
        
        db.add(user)
        db.commit()
        
        return {"message": "Phone verified successfully"}
    
    @staticmethod
    def create_oauth_user(db: Session, oauth_data: dict, provider: str) -> User:
        """Create or get user from OAuth."""
        
        email = oauth_data.get('email')
        
        # Check if user exists
        existing_user = db.query(User).filter(User.email == email).first()
        if existing_user:
            # Update OAuth ID if not set
            if provider == "google" and not existing_user.google_id:
                existing_user.google_id = oauth_data.get('google_id')
            elif provider == "apple" and not existing_user.apple_id:
                existing_user.apple_id = oauth_data.get('apple_id')
            
            db.add(existing_user)
            db.commit()
            return existing_user
        
        # Create new user
        new_user = User(
            email=email,
            name=oauth_data.get('name', email.split('@')[0]),
            is_active=True,
            is_verified=True,  # OAuth users are pre-verified
            google_id=oauth_data.get('google_id') if provider == "google" else None,
            apple_id=oauth_data.get('apple_id') if provider == "apple" else None,
            profile_picture=oauth_data.get('picture'),
        )
        
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        
        return new_user
