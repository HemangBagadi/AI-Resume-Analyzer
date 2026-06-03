from jose import JWTError, jwt

from passlib.context import CryptContext

from datetime import datetime, timedelta

# Secret Key

SECRET_KEY = "resume_ai_secret"

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 60

# Password Hashing

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

# Fake Database

fake_users_db = {}

# Hash Password

def hash_password(password):
    return pwd_context.hash(password)

# Verify Password

def verify_password(
    plain_password,
    hashed_password
):
    return pwd_context.verify(
        plain_password,
        hashed_password
    )

# Create JWT Token

def create_access_token(data):

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({
        "exp": expire
    })

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt