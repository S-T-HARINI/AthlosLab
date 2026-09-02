from datetime import datetime
from pydantic import BaseModel, EmailStr, Field

class SignupRequest(BaseModel):
    username: str = Field(..., min_length=3, max_length=50, description="Unique username")
    email: EmailStr = Field(..., description="Valid email / Gmail address")
    password: str = Field(..., min_length=6, description="Password (min 6 chars)")

class LoginRequest(BaseModel):
    identifier: str = Field(..., description="Username or Email address")
    password: str = Field(..., description="User password")

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    created_at: datetime

    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
