# All-in-One CLI Dashboard
<p align="center">
<img alt="Screenshot of the CLI Dashboard" src="https://github.com/user-attachments/assets/bb843f7b-dd98-41f3-a4a8-586c2abc5312" />
</p>

This application is a command-line tool that aggregates data from various developer platforms into a single, unified view in your terminal. It helps improve productivity by bringing all your important feeds into one place, ensuring you don't miss out on anything important.

## ✨ Features
View upcoming Codeforces contests.
See the latest articles from your DEV.to feed, with an interactive mode to read full articles.

Get the GeeksforGeeks Problem of the Day.

List your recent GitHub repositories and assigned issues.

List your owned projects on GitLab.

See active Kaggle competitions.

View your recent questions on Stack Overflow.

## 📂 Project Structure
The project is organized with a main aggregator that calls modular, single-purpose scripts.

```
aggregator/
├── alldata.py

logic_diagram/
├── logic.svg
└── logic.txt

README.md

single_application/
├── __init__.py
├── codeforces.py
├── devto.py
├── gfg.py
├── github.py
├── gitlab_cli.py
├── kaggle_cli.py
├── news.py
└── stackoverflow.py
```




## 🛠️ Setup Instructions
Follow these steps to get the project running on your local machine.

### 1. Prerequisites
Python 3.8 or higher

Git

### 2. Clone the Repository
First, clone the project to your local machine:

git clone [https://github.com/LikhithAvinash/Aggregator.git](https://github.com/LikhithAvinash/Aggregator.git)
cd Aggregator

### 3. Create a Virtual Environment
It is highly recommended to use a virtual environment to manage dependencies.

#### Create the environment
python -m venv venv

#### Activate the environment
#### On Windows:
venv\Scripts\activate
#### On macOS / Linux:
source venv/bin/activate

### 4. Install Dependencies
Install all the required Python libraries using pip:

pip install python-gitlab kaggle rich requests tabulate python-dotenv

### 5. Configure Environment Variables
The script uses a .env file to securely store your API keys and credentials.

Create your .env file by making a copy of the template:

cp .env.example .env

Open the .env file with a text editor.

Add your personal API keys and usernames for each service. The file contains comments guiding you on where to find them. This file is included in .gitignore and will not be committed to the repository.

## 🚀 How to Run
Ensure your virtual environment is activated before running the scripts.

Running the Main Aggregator
To see all your feeds in one consolidated view, run the main alldata.py script from the project's root directory.

python aggregator/alldata.py

Running Individual Scripts (Standalone Mode)
Some scripts, like devto.py, can be run individually for a more detailed and interactive experience.

### Example: Run the DEV.to script to see the feed and read full articles
python single_application/devto.py feed

### Example: See your personal articles on DEV.to
python single_application/devto.py articles

Refer to the if __name__ == "__main__": block at the bottom of each script to see what commands are available.

For a visual representation of the project's logic, please see the [Logic Diagram](single_application/logic.svg).
