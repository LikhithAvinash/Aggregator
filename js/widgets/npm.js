// js/widgets/npm.js

import { fetchData } from '../api.js';

export async function renderNpm() {
    const container = document.getElementById('npm-feed');
    if (!container) return;

    const data = await fetchData('/npm/react'); 

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