// js/widgets/github.js

import { fetchData } from '../api.js';
import { renderList } from '../ui.js';

export async function renderGitHub() {
    const header = document.querySelector('#github-repos')?.previousElementSibling?.querySelector('span');
    if (header) {
        header.innerText = 'GitHub Issues & PRs';
    }

    const [issues, pulls] = await Promise.all([
        fetchData('/github/issues'),
        fetchData('/github/pulls') 
    ]);

    const combinedData = [...(issues || []), ...(pulls || [])];
    
    renderList('#github-repos', combinedData, {
        title: 'title',
        url: 'html_url',
        meta: item => {
            const icon = item.pull_request 
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