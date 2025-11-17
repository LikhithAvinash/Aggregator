import {
    renderCalendar,
    // renderHackerNews, // No longer needed
    // renderDevTo, // No longer needed
    renderGitHub,
    renderCodeforces,
    // renderGitLab,
    // renderStackOverflow, // No longer needed
    // renderReddit, // No longer needed
    renderKaggle,
    renderPyPI,
    renderNpm
} from './ui.js';

// All switcher logic is now handled by the React components.

document.addEventListener('DOMContentLoaded', () => {
    // Initial content rendering for the remaining widgets
    renderCalendar();
    renderGitHub();
    renderCodeforces();
    // renderGitLab();
    renderKaggle();
    renderPyPI();
    renderNpm();
});