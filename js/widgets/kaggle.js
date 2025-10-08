// js/widgets/kaggle.js

import { fetchData } from '../api.js';
import { renderList } from '../ui.js';

export async function renderKaggle() {
    const data = await fetchData('/kaggle/datasets');
    renderList('#kaggle-feed', data, {
        title: 'title',
        url: 'url',
        meta: item => `<span>Ref: ${item.ref}</span>`
    }, "Could not load Kaggle datasets.");
}