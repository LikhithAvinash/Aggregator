// js/widgets/codeforces.js

import { fetchData } from '../api.js';

const CODEFORCES_HANDLE = "likhithavinash"; // Keep config here or move to a central config file

export async function renderCodeforces() {
    const container = document.getElementById('codeforces-stats');
    if (!CODEFORCES_HANDLE) {
        container.innerHTML = `<div class="error-state">Please set your Codeforces handle.</div>`;
        return;
    }

    const data = await fetchData(`/codeforces/userinfo/${CODEFORCES_HANDLE}`);
    if (!data || data.rating === undefined) {
        container.innerHTML = `<div class="error-state">Could not load stats for "${CODEFORCES_HANDLE}".</div>`;
        return;
    }
    
    const formatRank = (rank) => rank ? rank.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'N/A';

    container.innerHTML = `
        <div class="cf-stat"><span class="cf-stat-label">Handle</span><span class="cf-stat-value" style="color: var(--accent-color);">${CODEFORCES_HANDLE}</span></div>
        <div class="cf-stat"><span class="cf-stat-label">Rating</span><span class="cf-stat-value">${data.rating || 'N/A'}</span></div>
        <div class="cf-stat"><span class="cf-stat-label">Max Rating</span><span class="cf-stat-value">${data.maxRating || 'N/A'}</span></div>
        <div class="cf-stat"><span class="cf-stat-label">Rank</span><span class="cf-stat-value">${formatRank(data.rank)}</span></div>
        <div class="cf-stat"><span class="cf-stat-label">Max Rank</span><span class="cf-stat-value">${formatRank(data.maxRank)}</span></div>
    `;
}