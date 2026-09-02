import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.auth import router as auth_router
from app.database import engine, Base

# Setup logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("codevora")

app = FastAPI(
    title="AthlosLab Backend API",
    description="Backend Authentication & Learning Platform API for AthlosLab (SQLite)",
    version="1.0.0"
)

# Configure CORS Middleware for all local React frontend ports
origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
    "http://127.0.0.1:3002",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1)(:\d+)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Authentication Router
app.include_router(auth_router)

# Database Table Initialization Startup Handler
@app.on_event("startup")
def startup_db_client():
    logger.info("Initializing Codevora SQLite Database & Tables...")
    try:
        Base.metadata.create_all(bind=engine)
        logger.info("SQLite Database (codevora.db) & tables verified/created successfully.")
    except Exception as e:
        logger.error(f"⚠️ SQLite Database Initialization Error: {e}")

@app.get("/")
def root():
    return {
        "status": "online",
        "database": "SQLite (codevora.db)",
        "app": "AthlosLab API",
        "docs": "/docs"
    }
