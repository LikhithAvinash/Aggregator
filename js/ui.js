import { fetchData } from './api.js';

function renderList(container, data, keyMap, errorMessage) {
    if (!data || data.length === 0) {
        container.innerHTML = `<div class="error-state">${errorMessage}</div>`;
        return;
    }

    const renderItems = (items) => {
        return items.map(item => {
            const url = typeof keyMap.url === 'function' ? keyMap.url(item) : (item[keyMap.url] || '#');
            return `
                <div class="list-item">
                    <a href="${url}" target="_blank" rel="noopener noreferrer">${item[keyMap.title] || 'No Title'}</a>
                    ${keyMap.meta ? `<div class="list-item-meta">${keyMap.meta(item)}</div>` : ''}
                </div>
            `;
        }).join('');
    };

    if (data.length > 7) {
        container.innerHTML = renderItems(data.slice(0, 7));
        const showMoreButton = document.createElement('button');
        showMoreButton.textContent = 'Show more';
        showMoreButton.classList.add('show-more-button');
        container.appendChild(showMoreButton);

        showMoreButton.addEventListener('click', () => {
            container.innerHTML = renderItems(data);
        });
    } else {
        container.innerHTML = renderItems(data);
    }
}

export function renderCalendar() {
    const container = document.getElementById('calendar-widget');
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const today = now.getDate();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const monthName = now.toLocaleString('default', { month: 'long' });
    
    let html = `
        <div class="calendar-header">
            <span>${monthName} ${year}</span>
        </div>
        <div class="calendar">
    `;

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(day => {
        html += `<div class="calendar-day-name">${day}</div>`;
    });
    
    for (let i = 0; i < firstDayOfMonth; i++) {
        html += `<div class="calendar-day empty"></div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const isCurrent = day === today ? 'current-day' : '';
        html += `<div class="calendar-day ${isCurrent}">${day}</div>`;
    }
    
    html += `</div>`;
    container.innerHTML = html;
}

export async function renderHackerNews() {
    const container = document.getElementById('hackernews-feed');
    const data = await fetchData('/hackernews/topstories');
    renderList(container, data, {
        title: 'title',
        url: 'url',
        meta: item => `
            <span><i class="fa-solid fa-arrow-up"></i> ${item.score || 0}</span>
            <span><i class="fa-solid fa-comments"></i> ${item.descendants || 0}</span>
        `
    }, "Could not load Hacker News stories.");
}

export async function renderDevTo() {
    const container = document.getElementById('devto-feed');
    const data = await fetchData('/devto/articles');
    renderList(container, data, {
        title: 'title',
        url: 'url',
        meta: item => `
            <span><i class="fa-solid fa-heart"></i> ${item.public_reactions_count || 0}</span>
            <span><i class="fa-solid fa-comments"></i> ${item.comments_count || 0}</span>
        `
    }, "Could not load DEV.to articles.");
}

export async function renderGitHub() {
    const container = document.getElementById('github-repos');
    container.previousElementSibling.querySelector('span').innerText = 'GitHub Issues & PRs';

    const [issues, pulls] = await Promise.all([
        fetchData('/github/issues'),
        fetchData('/github/pulls') 
    ]);

    const combinedData = [...(issues || []), ...(pulls || [])];
    
    renderList(container, combinedData, {
        title: 'title',
        url: item => item.html_url || item.url,
        meta: item => {
            const icon = item.html_url && item.html_url.includes('/pull/')
                ? '<i class="fa-solid fa-code-pull-request"></i>' 
                : '<i class="fa-solid fa-circle-dot"></i>';
            
            let repoName = 'N/A';
            if (item.repository && item.repository.full_name) {
                repoName = item.repository.full_name;
            } else if (item.repository_url) {
                repoName = item.repository_url.split('/').slice(-2).join('/');
            }

            return `<span>${icon} ${repoName}</span>`;
        }
    }, "Could not load GitHub issues or PRs.");
}

export async function renderGitLab() {
    const container = document.getElementById('gitlab-projects');
    const data = await fetchData('/gitlab/projects');
    function renderList(container, data, keyMap, errorMessage) {
        if (data === null) {
            container.innerHTML = `<div class="error-state">${errorMessage}</div>`;
            return;
        }

        if (data.length === 0) {
            container.innerHTML = `<div class="Not Found">No items found.</div>`;
            return;
        }
        
        const html = data.slice(0, 7).map(item => {
            const url = typeof keyMap.url === 'function' ? keyMap.url(item) : (item[keyMap.url] || '#');
            return `
                <div class="list-item">
                    <a href="${url}" target="_blank" rel="noopener noreferrer">${item[keyMap.title] || 'No Title'}</a>
                    ${keyMap.meta ? `<div class="list-item-meta">${keyMap.meta(item)}</div>` : ''}
                </div>
            `;
        }).join('');
        
        container.innerHTML = html;
    }
}

export async function renderStackOverflow() {
    const container = document.getElementById('stackoverflow-feed');
    const data = await fetchData('/stackoverflow/featured');
    
    renderList(container, data, {
        title: 'title',
        url: 'link',
        meta: item => `
             <span><i class="fa-solid fa-trophy"></i> Bounty: ${item.bounty_amount || 0}</span>
             <span><i class="fa-solid fa-comments"></i> Answers: ${item.answer_count || 0}</span>
        `
    }, "Could not load Stack Overflow questions.");
}

export async function renderCodeforces() {
    const container = document.getElementById('codeforces-stats');
    // The handle is now fetched from the backend's .env via the /codeforces/userinfo/me endpoint
    // No need for a local CODEFORCES_HANDLE variable here.

    const data = await fetchData('/codeforces/userinfo/me');
    if (!data || data.rating === undefined) {
        container.innerHTML = `<div class="error-state">Could not load Codeforces stats. Ensure CODEFORCES_HANDLE is set in the backend's .env file.</div>`;
        return;
    }
    
    const formatRank = (rank) => rank ? rank.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'N/A';

    container.innerHTML = `
        <div class="cf-stat">
            <span class="cf-stat-label">Handle</span>
            <span class="cf-stat-value" style="color: var(--accent-color);">${data.handle}</span>
        </div>
        <div class="cf-stat">
            <span class="cf-stat-label">Rating</span>
            <span class="cf-stat-value">${data.rating || 'N/A'}</span>
        </div>
        <div class="cf-stat">
            <span class="cf-stat-label">Max Rating</span>
            <span class="cf-stat-value">${data.maxRating || 'N/A'}</span>
        </div>
        <div class="cf-stat">
            <span class="cf-stat-label">Rank</span>
            <span class="cf-stat-value">${formatRank(data.rank)}</span>
        </div>
        <div class="cf-stat">
            <span class="cf-stat-label">Max Rank</span>
            <span class="cf-stat-value">${formatRank(data.maxRank)}</span>
        </div>
    `;
}

export async function renderKaggle() {
    const container = document.getElementById('kaggle-feed');
    const data = await fetchData('/kaggle/datasets');
    renderList(container, data, {
        title: 'title',
        url: 'url',
        meta: item => `<span>Ref: ${item.ref}</span>`
    }, "Could not load Kaggle datasets.");
}

export async function renderReddit() {
    const container = document.getElementById('reddit-feed');
    const data = await fetchData('/reddit/r/learnprogramming/search?query=python');
    
    renderList(container, data, {
        title: 'title',
        url: 'url',
        meta: item => `
            <span><i class="fa-solid fa-arrow-up"></i> ${item.score || 0}</span>
            <span><strong>u/</strong>${item.author || 'N/A'}</span>
    `
    }, "Could not load Reddit posts.");
}

export async function renderPyPI() {
    const container = document.getElementById('pypi-feed');
    const data = await fetchData('/pypi/fastapi');

    if (!data || !data.name) {
        container.innerHTML = `<div class="error-state">Could not load PyPI package details.</div>`;
        return;
    }

    container.innerHTML = `
        <div class="list-item">
            <a href="https://pypi.org/project/${data.name}" target="_blank" rel="noopener noreferrer">
                
                ${data.name} (${data.version})
            </a>
            <div class="list-item-meta">
                <span>${data.summary || 'No summary available.'}</span>
            </div>
        </div>
    `;
}

export async function renderNpm() {
    const container = document.getElementById('npm-feed');
    const data = await fetchData('/npm/react'); 
    
    console.log("NPM Data Received:", data);

    if (!data || !data.name) {
        container.innerHTML = `<div class="error-state">Could not load npm package details.</div>`;
        return;
    }

    container.innerHTML = `
        <div class="list-item">
            <a href="https://www.npmjs.com/package/${data.name}" target="_blank" rel="noopener noreferrer">
                ${data.name} (${data.latest_version})
            </a>
            <div class="list-item-meta">
                <span>${data.description || 'No description available.'}</span>
            </div>
        </div>
    `;
}