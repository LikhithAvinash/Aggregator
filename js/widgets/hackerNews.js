// js/widgets/hackerNews.js

import { fetchData } from '../api.js';
import { renderList } from '../ui.js';

export async function renderHackerNews() {
    const data = await fetchData('/hackernews/topstories');
    renderList('#hackernews-feed', data, {
        title: 'title',
        url: 'url',
        meta: item => `
            <span><i class="fa-solid fa-arrow-up"></i> ${item.score || 0}</span>
            <span><i class="fa-solid fa-comments"></i> ${item.descendants || 0}</span>
        `
    }, "Could not load Hacker News stories.");
}