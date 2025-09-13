import requests
import argparse
from tabulate import tabulate
import os
from rich.console import Console
from rich.markdown import Markdown
from rich.panel import Panel
from dotenv import load_dotenv
load_dotenv()

# Base URL for DEV.to API   
BASE_URL = "https://dev.to/api"

console = Console()

def get_headers(api_key):
    return {"api-key": api_key}

def fetch_single_article(api_key, article_id):
    """Fetches and displays a single article by its ID."""
    url = f"{BASE_URL}/articles/{article_id}"
    console.print(f"\n[yellow]Fetching article {article_id}...[/yellow]")
    
    response = requests.get(url, headers=get_headers(api_key))
    
    if response.status_code == 200:
        article = response.json()
        title = article.get('title', 'No Title')
        author = article.get('user', {}).get('name', 'Unknown Author')
        url = article.get('url', '')
        tags = ", ".join(article.get('tags', []))

        header = f"[bold cyan]{title}[/bold cyan]\n[italic]by {author}[/italic]\n\nTags: [green]{tags}[/green]\nLink: [blue underline]{url}[/blue underline]"
        console.print(Panel(header, title="Article Details", border_style="blue"))

        body_markdown = article.get('body_markdown', 'No content available.')
        console.print(Markdown(body_markdown))  
        
    elif response.status_code == 404:
        console.print(f"[bold red]Error: Article with ID '{article_id}' not found.[/bold red]")
    else:
        console.print(f"[bold red]Error fetching article: {response.json()}[/bold red]")

def handle_article_selection(api_key):
    """Handles the user prompt to select an article to read."""
    while True:
        article_id = input("\nEnter an Article ID to read (or press Enter to quit): ")
        if not article_id.strip():
            break
        fetch_single_article(api_key, article_id)

# Fetch your published articles
def fetch_articles(api_key):
    url = f"{BASE_URL}/articles/me/published"
    response = requests.get(url, headers=get_headers(api_key))
    if response.status_code == 200:
        articles = response.json()
        if not articles:
            print("No published articles found. Try creating one on DEV.to!")
            return
        table = [(a["id"], a["title"][:40], a["url"]) for a in articles]
        print(tabulate(table, headers=["ID", "Title", "URL"], tablefmt="fancy_grid"))
        handle_article_selection(api_key) ####
    else:
        print("Error fetching articles:", response.json())

# Fetch your comments
def fetch_comments(api_key):
    # Step 1: get username
    user_url = f"{BASE_URL}/users/me"
    user_res = requests.get(user_url, headers=get_headers(api_key))
    if user_res.status_code != 200:
        print("Error fetching user info:", user_res.json())
        return

    username = user_res.json().get("username")

    # Step 2: fetch comments by username
    url = f"{BASE_URL}/comments?username={username}"
    response = requests.get(url, headers=get_headers(api_key))
    if response.status_code == 200:
        comments = response.json()
        if not comments:
            print("No comments found.")
            return
        table = [(c["id"], c["body_text"][:50]) for c in comments]
        print(tabulate(table, headers=["ID", "Comment (truncated)"], tablefmt="fancy_grid"))
    else:
        print("Error fetching comments:", response.json())

# Fetch your followers
def fetch_followers(api_key):
    url = f"{BASE_URL}/followers/users"
    response = requests.get(url, headers=get_headers(api_key))
    if response.status_code == 200:
        followers = response.json()
        if not followers:
            print("No followers yet.")
            return
        table = [(f["id"], f["name"], f["username"]) for f in followers]
        print(tabulate(table, headers=["ID", "Name", "Username"], tablefmt="fancy_grid"))
    else:
        print("Error fetching followers:", response.json())

# Fetch global DEV.to feed (like Home)
def fetch_feed(api_key):
    url = f"{BASE_URL}/articles"
    response = requests.get(url, headers=get_headers(api_key))
    if response.status_code == 200:
        feed = response.json()
        if not feed:
            print("No feed data available.")
            return
        table = [(a["id"], a["title"][:40], a["url"]) for a in feed[:10]]  # limit to 10 posts
        print(tabulate(table, headers=["ID", "Title", "URL"], tablefmt="fancy_grid"))
        handle_article_selection(api_key)
    else:
        print("Error fetching feed:", response.json())

def reading_list(api_key):
    url = f"{BASE_URL}/readinglist"
    response = requests.get(url,headers=get_headers(api_key))
    if response.status_code == 200:
        readinglist = response.json()
        
        if not readinglist:
            print("No Reading List was found")
            return 
        table = [(a["article"]["id"], a["article"]["title"][:40], a["article"]["url"]) for a in readinglist[:10]]
        print(tabulate(table,headers=["ID","Title","URL"],tablefmt="fancy_grid"))
        handle_article_selection(api_key)
    else:
        print("Error fetching Reading List:",response.json())

def main():
    parser = argparse.ArgumentParser(description="DEV.to CLI Dashboard")
    parser.add_argument("command", choices=["articles", "comments", "followers", "feed","readinglist"], help="What data to fetch")
    parser.add_argument("--id", help="Read a specific article by ID")
    parser.add_argument("--apikey", default=os.getenv("DEVTO_API_KEY"), help="Your DEV.to API key")
    args = parser.parse_args()

    if args.id:
        fetch_single_article(args.apikey, args.id)
        return

    if args.command == "articles":
        fetch_articles(args.apikey)
    elif args.command == "comments":
        fetch_comments(args.apikey)
    elif args.command == "followers":
        fetch_followers(args.apikey)
    elif args.command == "feed":
        fetch_feed(args.apikey)
    elif args.command == "readinglist":
        reading_list(args.apikey)

if __name__ == "__main__":
    main()

# -- add_argument is something that tells the parser to expect arguments(that are inside of tuple) from the user
# --  args stores the user_input and parse_args reads the user input

'''You Create the Tool: parser = argparse.ArgumentParser() creates the main parser object.

You Define the Rules: parser.add_argument("command", choices=[...]) teaches the parser what commands are valid.

It Auto-Generates the Help Menu: Based on your rules, the ArgumentParser builds a complete help text behind the scenes.

The User Asks for Help: When a user runs python your_script.py --help, the parser's only job is to display that pre-built help menu and then exit.'''

## so if user type something which is not in the choices then argparse automatically stops and print the output of --help