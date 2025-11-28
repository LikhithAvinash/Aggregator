from fastapi import APIRouter, HTTPException, FastAPI, Query
from pydantic import BaseModel
import uvicorn
import praw # Import the PRAW library
import os
from dotenv import load_dotenv
from typing import Optional

# --- Configuration ---
load_dotenv()
# BEST PRACTICE: Store credentials as environment variables, not in code.
# You can set these in your terminal before running the app.
# export REDDIT_CLIENT_ID="YOUR_CLIENT_ID"
# export REDDIT_CLIENT_SECRET="YOUR_CLIENT_SECRET"
# export REDDIT_USER_AGENT="MyApiAggregator:v1.0 (by /u/YourUsername)"

# Add a configurable default subreddit (can be overridden with REDDIT_DEFAULT_SUBREDDIT env var)
DEFAULT_SUBREDDIT = os.getenv("REDDIT_DEFAULT_SUBREDDIT", "learnprogramming")

CLIENT_ID = os.getenv("REDDIT_CLIENT_ID")
CLIENT_SECRET = os.getenv("REDDIT_CLIENT_SECRET")
REDDIT_USERNAME_ENV = os.getenv("REDDIT_USERNAME")

# Check if credentials are set
if not all([CLIENT_ID, CLIENT_SECRET, REDDIT_USERNAME_ENV]):
    raise Exception("Missing Reddit API credentials in environment variables. Please ensure REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, and REDDIT_USERNAME are set.")

# Initialize PRAW in read-only mode (no user login needed for public content)
reddit = praw.Reddit(
    client_id=CLIENT_ID,
    client_secret=CLIENT_SECRET,
    user_agent=f"Python:DevDashAggregator:v1.0 (by /u/{REDDIT_USERNAME_ENV})",
)

# --- APIRouter Instance ---
router = APIRouter()

# --- Pydantic Models ---
class Post(BaseModel):
    id: str
    title: str
    subreddit: str
    url: str
    author: str
    score: int

# --- API Endpoints ---
@router.get("/r/{subreddit}/search", response_model=list[Post])
async def search_subreddit(
    subreddit: str,
    query: str = Query(..., min_length=1, description="The search term for posts.")
):
    """Searches a specific subreddit for posts matching a query using PRAW."""
    try:
        # PRAW handles the API call and authentication!
        subreddit_instance = reddit.subreddit(subreddit)
        search_results = subreddit_instance.search(query, limit=25)

        # Convert PRAW submission objects to our Pydantic model
        posts = [
            Post(
                id=submission.id,
                title=submission.title,
                subreddit=submission.subreddit.display_name,
                url=f"https://www.reddit.com{submission.permalink}",
                author=str(submission.author),
                score=submission.score
            )
            for submission in search_results
        ]
        return posts
    except Exception as e:
        # PRAW raises exceptions for errors like subreddit not found, auth errors, etc.
        raise HTTPException(status_code=500, detail=f"An error occurred with the Reddit API: {e}")

# New endpoint that uses query param `subreddit` but falls back to DEFAULT_SUBREDDIT
@router.get("/r/search", response_model=list[Post])
async def search_subreddit_default(
    query: str = Query(..., min_length=1, description="Search term"),
    subreddit: Optional[str] = None,
):
    """Search a configurable default subreddit (env) or the provided subreddit query param."""
    chosen = subreddit or DEFAULT_SUBREDDIT
    try:
        subreddit_instance = reddit.subreddit(chosen)
        search_results = subreddit_instance.search(query, limit=25)
        posts = [
            Post(
                id=submission.id,
                title=submission.title,
                subreddit=submission.subreddit.display_name,
                url=f"https://www.reddit.com{submission.permalink}",
                author=str(submission.author),
                score=submission.score
            ) for submission in search_results
        ]
        return posts
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred with the Reddit API: {e}")

# --- Standalone App ---
app = FastAPI(title="Standalone Reddit API with PRAW")
app.include_router(router, prefix="/reddit", tags=["Reddit"])

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
