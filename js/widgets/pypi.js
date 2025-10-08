// js/widgets/pypi.js

import { fetchData } from '../api.js';

export async function renderPyPI() {
    const container = document.getElementById('pypi-feed');
    if (!container) return;

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