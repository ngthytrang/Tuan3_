const percent = new Intl.NumberFormat('vi-VN', { style: 'percent', maximumFractionDigits: 1 });
const shortDay = new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', timeZone: 'UTC' });
const chart = document.querySelector('#chart');
const chartContent = document.querySelector('#chart-content');
const chartEmpty = document.querySelector('#chart-empty');
const metricKeys = ['total', 'done', 'pending', 'overdue'];
const series = [['done', 'đã hoàn thành'], ['pending', 'chưa xong']];
let statsDay;

function renderChart(days) {
    const maximum = Math.max(...days.flatMap(day => [day.done, day.pending]));
    chartContent.hidden = maximum === 0;
    chartEmpty.hidden = maximum !== 0;
    chart.replaceChildren(...days.map(day => {
        const item = document.createElement('li');
        const track = document.createElement('div');
        track.className = 'bar-track';
        const date = document.createElement('time');
        date.dateTime = day.date;
        date.textContent = shortDay.format(new Date(day.date + 'T00:00:00Z'));
        const values = document.createElement('div');
        values.className = 'chart-values';
        for (const [key, label] of series) {
            const bar = document.createElement('div');
            bar.className = `bar series-${key}`;
            bar.style.height = maximum ? `${day[key] / maximum * 100}%` : '0';
            bar.setAttribute('aria-hidden', 'true');
            track.append(bar);
            const value = document.createElement('span');
            value.className = `chart-value series-${key}`;
            const description = document.createElement('span');
            description.className = 'sr-only';
            description.textContent = ` ${label}`;
            value.append(String(day[key]), description);
            values.append(value);
        }
        item.append(date, track, values);
        return item;
    }));
}

async function loadStats() {
    const date = localDay();
    statsDay = date;
    const errorMessage = document.querySelector('#stats-error');
    const completionRate = document.querySelector('#completion-rate');
    try {
        const stats = await api(`/api/stats?today=${date}`);
        if (statsDay !== date) return;
        for (const key of metricKeys) {
            document.getElementById(key).textContent = stats[key];
        }
        completionRate.textContent = percent.format(stats.total > 0 ? stats.done / stats.total : 0);
        renderChart(stats.days);
        errorMessage.hidden = true;
    } catch (error) {
        if (statsDay !== date) return;
        for (const key of metricKeys) {
            document.getElementById(key).textContent = '—';
        }
        completionRate.textContent = '—';
        chartContent.hidden = true;
        chartEmpty.hidden = true;
        errorMessage.textContent = error.message;
        errorMessage.hidden = false;
    }
}

window.addEventListener('pageshow', loadStats);
window.setInterval(() => {
    if (statsDay !== localDay()) loadStats();
}, 15_000);
