// js/widgets/devTo.js

import { fetchData } from '../api.js';
import { renderList } from '../ui.js';

export async function renderDevTo() {
    const data = await fetchData('/devto/articles');
    renderList('#devto-feed', data, {
        title: 'title',
        url: 'url',
        meta: item => `
            <span><i class="fa-solid fa-heart"></i> ${item.public_reactions_count || 0}</span>
            <span><i class="fa-solid fa-comments"></i> ${item.comments_count || 0}</span>
        `
    }, "Could not load DEV.to articles.");
}