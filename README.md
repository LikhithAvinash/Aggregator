# Passive AI Aggregator
<p align="center">
<img alt="Developers Aggregator" src="./images/main.png" />
<img alt="Developers Aggregator" src="./images/chatbot.png" />
</p>   

## Problem
Developers rely on multiple tools and sources (GitHub, PyPI, StackOverflow, RSS feeds, Co-pilot, release notes) to track updates, bugs, and best practices.Updates are scattered across dozens of platforms.Tools like Dependabot only cover dependency version bumps, not full ecosystem changes.Developers must manually read changelogs, test updates, and decide if they’re safe — a time-consuming and error-prone process.

## Solution
An AI-powered Aggregator Agent that acts as your developer assistant:

- Passive Mode: Collects updates from GitHub, PyPI, RSS feeds, StackOverflow, etc. → summarizes bug fixes, security advisories, and improvements relevant to your project.

- Active Mode: Goes further by testing updates directly in your repo, analyzing benchmark results, and proposing pull requests with actionable recommendations.

👉 Instead of spending hours searching and validating updates, developers get a single AI agent that keeps projects secure, optimized, and up-to-date — with minimal effort.

## ✨ Features
:arrow_right: **Unified Data Access** → Fetch content from multiple platforms (Codeforces, Dev.to, GFG, GitHub, GitLab, Kaggle, StackOverflow) in one place.

:arrow_right: **Relevance filtering** → only shows updates that matter to your dependencies or tech stack.

:arrow_right: **Summarizes changelogs** (bug fixes, new features, CVEs) using LLMs.

:arrow_right: **Developers Friendly** → Can be extended to a command-line tool for quick queries.

:arrow_right: **Cross-Platform** → Works on Linux, Windows, and macOS with Python 3.

:arrow_right: **Aggregates updates** from GitHub Releases, PyPI, npm, DockerHub, StackOverflow, Dev.to, HackerNews, and RSS feeds.

:arrow_right: **Pluggable Architecture** → Add or remove modules without affecting the rest of the system.

:arrow_right: **Dual Usage**→ Can use **CLI or Web App**(Depends on the Developer's Comfort)

## 📂 Project Structure
The project is organized with a main aggregator that calls modular, single-purpose scripts.

```
📂 Aggregator
├── 📂 app
│   ├── 📂 aggregator  # Core aggregator logic (entrypoints + main pipeline)
│   │   ├── ep.py
│   │   ├── __init__.py
│   │   └── main.py
│   ├── 📂 endpoints   #  API endpoints (GitHub, PyPI, Reddit, StackOverflow, etc.)
│   │   ├── github_ep.py
│   │   ├── hn.py
│   │   ├── npm.py
│   │   ├── pypi.py
│   │   ├── reddit.py
│   │   └── so.py
│   ├── frontend.py    # Frontend/UI logic (dashboard or CLI bridge)
│   └── 📂 single_application   # Single-source integrations (Dev.to, Kaggle, GfG, etc.)
│       ├── codeforces.py
│       ├── devto.py
│       ├── gfg.py
│       ├── github.py
│       ├── gitlab.py
│       ├── hacker_news.py
│       ├── __init__.py
│       ├── kaggle.py
│       └── stackoverflow.py
├── 📂 cli
│   ├── 📂 agg          # CLI for full aggregator (all sources combined)
│   │   └── cli_agg.py
│   └── 📂 single_cli   # CLI for individual sources (Dev.to, GitHub, Kaggle, etc.)
│       ├── codeforces.py
│       ├── devto.py
│       ├── gfg.py
│       ├── github.py
│       ├── gitlab_cli.py
│       ├── __init__.py
│       ├── kaggle_cli.py
│       ├── news.py
│       └── stackoverflow.py
├── 📂 logic_diagram
│   ├── logic.svg     # Visual diagram of system flow
│   └── logic.txt     # Textual logic/architecture notes
├── requirements.txt  # Python dependencies
├── README.md         # Project documentation     
└── .gitignore        # Ignored files for cleaner repo
```

## 🛠️ Setup Instructions
Follow these steps to get the project running on your local machine.

### 1. Prerequisites
- Python 3.8 or higher

- Git

### 2. Clone the Repository
- First, clone the project to your local machine

- Navigate to that folder `cd Aggregator`

### 3. Create a Virtual Environment
   It is highly recommended to use a virtual environment to manage dependencies.

   #### Create the environment:
      python -m venv venv

   ### Activate the environment
   - On Windows:
     ```venv\Scripts\activate```
   - On macOS / Linux:
     ```source venv/bin/activate```

### 4. Install Dependencies
   Install all the required Python libraries using pip:

        pip install -r requirements.txt

### 5. Configure Environment Variables
- The script uses a .env file to securely store your API keys and credentials.

- Create your .env file by making a copy of the template:

- cp .env.example .env

- Open the .env file with a text editor.

- Add your personal API keys and usernames for each service. The file contains comments guiding you on where to find them. This file is included in .gitignore and will not be committed to the repository.

## API Key Links

### 1. DEV.to 👩‍💻
As before, you can generate your DEV.to API key from your account settings.

Link: [Dev.to](https://dev.to/settings/extensions)

Instructions: Scroll down to the "DEV Community API Keys" section and click the "Generate API Key" button.

### 2. GitHub 🐙
GitHub calls its API keys Personal Access Tokens (PATs).

Link: [Github](https://github.com/settings/tokens)

Instructions: Click on "Generate new token". You can choose between a fine-grained token (more secure) or a classic token. Give it a name, set an expiration date, and select the scopes (permissions) it needs.

### 3. Codeforces ⚔️
Codeforces allows you to generate API keys directly from your profile settings.

Link: [Codeforces](https://codeforces.com/settings/api)

Instructions: Click the "Add API key" button. It will generate a key and a secret that you can use for API calls.

### 4. Kaggle 📊
Kaggle's API key is provided in a downloadable file.

Link: Go to your account page: [Kaggle](https://www.kaggle.com/account)

Instructions: Scroll down to the "API" section and click the "Create New API Token" button. This will download a kaggle.json file to your computer. Your username and key are inside this file.

### 5. GitLab 🦊
Similar to GitHub, GitLab uses Personal Access Tokens.

Link: [GitLab](https://gitlab.com/-/profile/personal_access_tokens)

Instructions: Give your token a name, set an expiration date, and choose the necessary scopes (permissions). Then click "Create personal access token".

### 6. Hacker News 📰
For this service, you get your API key after signing up and logging into your dashboard.

Link: [Hacker News](https://hacker-news.firebaseio.com/v0)

Instructions: After you log in or sign up, your API key will be displayed directly on your main dashboard.

### 7. Stack Overflow (Stack Exchange) 📚
The Stack Exchange API requires you to "register an app" to get a key. This key is mainly for increasing your request quota.

Link: [Stack Overflow](https://stackapps.com/apps/oauth/register)

Instructions: Fill out the form to register your application. Once registered, you will be given a key that you can include in your API requests.

# For CLI
## 🚀 How to Run
- Ensure your virtual environment is activated before running the scripts.

- Running the Main Aggregator: To see all your feeds in one consolidated view, run the main alldata.py script from the project's root directory.

    `python agg/alldata.py`

- Running Individual Scripts (Standalone Mode): Some scripts, like devto.py, can be run individually for a more detailed and interactive experience.

    **Example: Run the DEV.to script to see the feed and read full articles**
    `python single_cli/devto.py feed`

    **Example: See your personal articles on DEV.to**
    `python single_cli/devto.py articles`

    - Refer to the ```if __name__ == "__main__":``` block at the bottom of each script to see what commands are available.

  # FOR Web App
  ## 🚀 How to Run
- Ensure your virtual environment is activated before running the scripts.

      python -m uvicorn file_name:app --reload    

  or

      uvicorn file_name:app --reload

- Running Individual Scripts (Standalone Mode): Some scripts, like devto.py, can be run individually for a more detailed and interactive experience: You can select it from side bar

## 🤔 How it works

- For a visual representation of the project's logic, please see the [Logic Diagram For CLI](logic_diagram/logic.svg).
