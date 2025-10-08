// js/widgets/calendar.js

export function renderCalendar() {
    const container = document.getElementById('calendar-widget');
    if (!container) return;
    
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const today = now.getDate();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const monthName = now.toLocaleString('default', { month: 'long' });
    
    let html = `
        <div class="calendar-header">
            <span>${monthName} ${year}</span>
        </div>
        <div class="calendar">
    `;

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(day => {
        html += `<div class="calendar-day-name">${day}</div>`;
    });
    
    for (let i = 0; i < firstDayOfMonth; i++) {
        html += `<div class="calendar-day empty"></div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const isCurrent = day === today ? 'current-day' : '';
        html += `<div class="calendar-day ${isCurrent}">${day}</div>`;
    }
    
    html += `</div>`;
    container.innerHTML = html;
}