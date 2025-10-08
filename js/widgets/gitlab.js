// js/widgets/gitlab.js

import { fetchData } from '../api.js';
import { renderList } from '../ui.js';

// Note: Your original file had a duplicate renderList function here. 
// We are now correctly using the imported one.
export async function renderGitLab() {
    const data = await fetchData('/gitlab/projects');
    renderList('#gitlab-projects', data, {
        title: 'name',
        url: 'web_url',
        meta: item => `
            <span><i class="fa-solid fa-star"></i> ${item.star_count || 0}</span>
            <span><i class="fa-solid fa-code-fork"></i> ${item.forks_count || 0}</span>
        `
    }, "Could not load GitLab projects.");
}