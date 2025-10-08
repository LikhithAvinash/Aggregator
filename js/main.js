// js/main.js

// Import all the widget renderers
import { renderCalendar } from './widgets/calendar.js';
import { renderHackerNews } from './widgets/hackerNews.js';
import { renderDevTo } from './widgets/devTo.js';
import { renderGitHub } from './widgets/github.js';
import { renderGitLab } from './widgets/gitlab.js';
import { renderStackOverflow } from './widgets/stackoverflow.js';
import { renderCodeforces } from './widgets/codeforces.js';
import { renderKaggle } from './widgets/kaggle.js';
import { renderReddit } from './widgets/reddit.js';
import { renderPyPI } from './widgets/pypi.js';
import { renderNpm } from './widgets/npm.js';

// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
    // Call all the functions to populate the dashboard
    renderCalendar();
    renderHackerNews();
    renderDevTo();
    renderGitHub();
    renderCodeforces();
    renderGitLab();
    renderStackOverflow();
    renderKaggle();
    renderReddit();
    renderPyPI();
    renderNpm();
});