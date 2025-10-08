// js/widgets/reddit.js

import { fetchData } from '../api.js';
import { renderList } from '../ui.js';

export async function renderReddit() {
    const data = await fetchData('/reddit/top/programming');
    renderList('#reddit-feed', data, {
        title: 'title',
        url: item => `https://www.reddit.com${item.permalink}`,
        meta: item => `
            <span><i class="fa-solid fa-arrow-up"></i> ${item.score || 0}</span>
            <span><i class="fa-solid fa-comments"></i> ${item.num_comments || 0}</span>
        `
    }, "Could not load Reddit posts.");
}