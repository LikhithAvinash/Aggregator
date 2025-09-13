# alldata.py

from codeforces import fetch_contests
from devto import fetch_feed
from gfg import fetch_gfg_potd
import github   # ✅ your existing GitHub CLI code (already reads token from .env)
from gitlab_cli import fetch_projects
from kaggle_cli import fetch_competitions
from stackoverflow import fetch_questions, get_user_id
import os
from dotenv import load_dotenv

# Load .env variables
load_dotenv()

def main():
    print("\n=== Codeforces Contests ===")
    fetch_contests()

    print("\n=== GeeksforGeeks POTD ===")
    fetch_gfg_potd()

    print("\n=== GitHub Repositories ===")
    github.fetch_repos()   # ✅ uses GITHUB_TOKEN from .env inside github.py

    print("\n=== GitHub Issues ===")
    github.fetch_issues()  # ✅ same here

    print("\n=== GitLab Projects ===")
    fetch_projects()

    print("\n=== Kaggle Competitions ===")
    fetch_competitions()

    print("\n=== StackOverflow Questions ===")
    username = os.getenv("STACKOVERFLOW_USERNAME")

    print("\n=== DEV.to Feed ===")
    fetch_feed(api_key=os.getenv("DEVTO_API_KEY", ""))
    
    if not username:
        print("❌ Please set STACKOVERFLOW_USERNAME in your .env file.")
    else:
        user_id, display_name = get_user_id(username)
        if user_id:
            print(f"✅ StackOverflow User: {display_name} (ID: {user_id})")
            fetch_questions(user_id)
        else:
            print(f"❌ Could not find StackOverflow user for username: {username}")

if __name__ == "__main__":
    main()
