// js/widgets/stackoverflow.js

import { fetchData } from '../api.js';
import { renderList } from '../ui.js';

export async function renderStackOverflow() {
    const data = await fetchData('/stackoverflow/featured');
    renderList('#stackoverflow-feed', data, {
        title: 'title',
        url: 'link',
        meta: item => `
             <span><i class="fa-solid fa-trophy"></i> Bounty: ${item.bounty_amount || 0}</span>
             <span><i class="fa-solid fa-comments"></i> Answers: ${item.answer_count || 0}</span>
        `
    }, "Could not load Stack Overflow questions.");
}