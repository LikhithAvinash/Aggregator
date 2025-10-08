// js/ui.js

export function renderList(containerSelector, data, keyMap, errorMessage) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    if (!data || data.length === 0) {
        container.innerHTML = `<div class="error-state">${errorMessage}</div>`;
        return;
    }
    
    const html = data.slice(0, 7).map(item => {
        const url = typeof keyMap.url === 'function' ? keyMap.url(item) : (item[keyMap.url] || '#');
        const title = item[keyMap.title] || 'No Title';
        const meta = keyMap.meta ? `<div class="list-item-meta">${keyMap.meta(item)}</div>` : '';
        
        return `
            <div class="list-item">
                <a href="${url}" target="_blank" rel="noopener noreferrer">${title}</a>
                ${meta}
            </div>
        `;
    }).join('');
    
    container.innerHTML = html;
}