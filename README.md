# Aggregator
This application puts everything in 1 place, So it improves Productivity and make sure the user doesn't miss out anything

## For now it is CLI Based & focused for developers
To start using this..
1) Go to this websites
   a) Codeforces b) StackOverflow c) Kaggle d) dev.to e) Github f) GitLab g) GeeksforGeeks (optional) h) newsdata.io
 Go to API section and past your API key to get information based on your feed on CLI
2) Next Create `.env` file and Paste your API key from different websites mentioned above
3) Inside that Folder(the one which had all the files I've Provided) open terminal to view the working
4) Install this libraries in your system `pip install python-gitlab kaggle rich requests tabulate python-dotenv`

## Where this Libraries are used
`python-gitlab` (for the GitLab script)
`kaggle` (for the Kaggle script)
`rich` (for the DEV.to script)
`requests` (used by the News and DEV.to scripts)
`tabulate` (used by all scripts)
`python-dotenv` (used by all scripts)

## 🛠️ Explanation of Each Library
**python-gitlab:** This is the official Python wrapper for the GitLab API. Your first script uses it to authenticate and fetch lists of projects, issues, and pipelines from a GitLab instance.

**kaggle:** This is the official command-line tool and Python client for Kaggle. The second script uses it to authenticate with your Kaggle account and fetch lists of datasets and competitions.

**rich:** This is a powerful library for creating beautiful and rich text and formatting in the terminal. Your DEV.to script uses it to display styled output, including colored text, panels, and formatted Markdown content for articles.

**requests:** A very common library for making HTTP requests. The News and DEV.to scripts use it to communicate with their respective web APIs to get data.

**tabulate:** This library creates nicely formatted text-based tables. All your scripts use it to present the fetched data (like projects, articles, or datasets) in a clean, grid-like format.

**python-dotenv:** This helper library loads environment variables from a .env file. All your scripts use it to securely manage API keys and user credentials without hardcoding them directly in the code.

## How to Run it
1) Open terminal inside Aggregator Folder
2) Then type `python alldata.py` (here you will see all the info from different websites in 1 place)
3) To know more specifically(based on the one you would like to know, lets say devto) so this one going to be `python devto.py feed` then you would get by default top 10 tech related news. Can be done for all 6
4) To know Specifically what to type in each file go to the bottom, you will see `main` function there you will see what command to type after the website name, based on that real time information is shown

### After running it in CLI
<img width="1920" height="1080" alt="Screenshot_20250913_211254" src="https://github.com/user-attachments/assets/bb843f7b-dd98-41f3-a4a8-586c2abc5312" />

### How it Works ?
For this you can check out `logic.svg`, Every function works in same order(a.either use request library b.particular library for that website c.url(can only certain amount of info) d.Scrapping the webste(based on the website legal terms)


