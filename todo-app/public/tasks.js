const today = document.querySelector('#today');
const list = document.querySelector('#tasks');
const search = document.querySelector('#search');
const filter = document.querySelector('#filter');
const categoryFilter = document.querySelector('#category-filter');
const priorityFilter = document.querySelector('#priority-filter');
const sort = document.querySelector('#sort');
const clearFilters = document.querySelector('#clear-filters');
const viewButtons = document.querySelectorAll('[data-view]');
const dailyProgress = document.querySelector('#daily-progress');
const progress = document.querySelector('#progress');
const progressLabel = document.querySelector('#progress-label');
const feedback = document.querySelector('#feedback');
const summary = document.querySelector('#summary');
const empty = document.querySelector('#empty');
const dialog = document.querySelector('#task-dialog');
const form = document.querySelector('#task-form');
const nameInput = document.querySelector('#task-name');
const dateInput = document.querySelector('#task-date');
const timeInput = document.querySelector('#task-time');
const categoryInput = document.querySelector('#task-category');
const priorityInput = document.querySelector('#task-priority');
const notesInput = document.querySelector('#task-notes');
const deleteDialog = document.querySelector('#delete-dialog');
const add = document.querySelector('#add');
const listError = document.querySelector('#list-error');
const formError = document.querySelector('#form-error');
const retry = document.querySelector('#retry');
const save = form.querySelector('button[type="submit"]');
const cancel = document.querySelector('#cancel');
const localDate = new Intl.DateTimeFormat('vi-VN', { dateStyle: 'full' });
const deadlineDate = new Intl.DateTimeFormat('vi-VN', { dateStyle: 'short', timeZone: 'UTC' });
const priorityRank = { Cao: 0, Vừa: 1, Thấp: 2 };
const emptyByView = {
    today: 'Bạn chưa có công việc nào hôm nay.',
    overdue: 'Bạn không có công việc quá hạn.',
    upcoming: 'Bạn chưa có công việc sắp tới.',
    all: 'Bạn chưa có công việc nào.',
};
let view = 'today';
let feedbackTimer;
let tasks = null;
let loadVersion = 0;
let busy = false;
let editingTask;
let deletingTask;

function showMessage(element, message = '') {
    element.textContent = message;
    element.hidden = !message;
}

function announce(message) {
    clearTimeout(feedbackTimer);
    showMessage(feedback, message);
    feedbackTimer = setTimeout(() => showMessage(feedback), 4000);
}

function normalize(name) {
    return name.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').replace(/đ/g, 'd');
}

function openForm(task) {
    if (busy) return;
    editingTask = task;
    document.querySelector('#form-title').textContent = task ? 'Sửa công việc' : 'Thêm công việc';
    nameInput.value = task?.name ?? '';
    nameInput.setCustomValidity('');
    dateInput.value = task?.dueDate ?? localDay();
    timeInput.value = task?.time ?? '';
    categoryInput.value = task?.category ?? 'Khác';
    priorityInput.value = task?.priority ?? 'Vừa';
    notesInput.value = task?.notes ?? '';
    showMessage(formError);
    dialog.showModal();
}

function action(label, task, handler) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.setAttribute('aria-label', `${label} ${task.name}`);
    button.addEventListener('click', handler);
    return button;
}

function taskRow(task) {
    const row = document.createElement('li');
    row.classList.toggle('completed', task.done);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.setAttribute('aria-label', `Hoàn thành ${task.name}`);
    checkbox.addEventListener('change', async () => {
        const changed = await mutate(() => api(`/api/tasks/${task.id}`, 'PATCH', { done: checkbox.checked }));
        if (!changed) checkbox.checked = task.done;
        if (changed && (document.activeElement === document.body || document.activeElement === checkbox)) {
            (list.querySelector(`[data-task-id="${task.id}"] input`) || filter).focus();
        }
    });
    row.dataset.taskId = task.id;

    const detail = document.createElement('div');
    const title = document.createElement('strong');
    title.textContent = task.name;
    const deadline = document.createElement('time');
    deadline.dateTime = task.time ? `${task.dueDate}T${task.time}` : task.dueDate;
    const day = task.dueDate === today.dateTime ? 'Hôm nay' : deadlineDate.format(new Date(task.dueDate + 'T00:00:00Z'));
    deadline.textContent = task.time ? `${day} · ${task.time}` : day;
    const metadata = document.createElement('div');
    metadata.className = 'task-meta';
    const classification = document.createElement('span');
    classification.textContent = task.category;
    const priority = document.createElement('span');
    priority.className = 'priority-badge';
    priority.dataset.priority = task.priority;
    priority.textContent = `Ưu tiên ${task.priority.toLowerCase()}`;
    metadata.append(deadline, classification, priority);
    if (isOverdue(task)) {
        const badge = document.createElement('span');
        badge.className = 'overdue-badge';
        badge.textContent = 'Quá hạn';
        metadata.append(badge);
    }
    detail.append(title, metadata);
    if (task.notes) {
        const notes = document.createElement('p');
        notes.className = 'task-notes';
        notes.textContent = task.notes;
        detail.append(notes);
    }

    const buttons = document.createElement('div');
    buttons.className = 'actions';
    buttons.append(action('Sửa', task, () => openForm(task)), action('Xóa', task, () => {
        if (busy) return;
        deletingTask = task;
        deleteDialog.returnValue = '';
        document.querySelector('#delete-message').textContent = `Bạn muốn xóa “${task.name}”?`;
        deleteDialog.showModal();
    }));
    row.append(checkbox, detail, buttons);
    return row;
}

function isOverdue(task) {
    return !task.done && task.dueDate < today.dateTime;
}

function matchesView(task) {
    if (view === 'today') return task.dueDate === today.dateTime;
    if (view === 'overdue') return isOverdue(task);
    if (view === 'upcoming') return task.dueDate > today.dateTime;
    return true;
}

function compareTasks(a, b) {
    if (sort.value === 'priority') {
        const byPriority = (priorityRank[a.priority] ?? 1) - (priorityRank[b.priority] ?? 1);
        if (byPriority) return byPriority;
    }
    return a.dueDate.localeCompare(b.dueDate)
        || (a.time || '24:00').localeCompare(b.time || '24:00')
        || a.id - b.id;
}

function render() {
    dailyProgress.hidden = !tasks || view !== 'today';
    if (!tasks) {
        list.replaceChildren();
        empty.hidden = true;
        return;
    }
    const query = normalize(search.value.trim());
    clearFilters.hidden = !query && filter.value === 'all' && !categoryFilter.value
        && !priorityFilter.value && sort.value === 'due';
    const sectionTasks = tasks.filter(matchesView);
    if (view === 'today') {
        const done = sectionTasks.filter(task => task.done).length;
        progress.max = sectionTasks.length || 1;
        progress.value = done;
        progressLabel.textContent = `${done}/${sectionTasks.length} việc đã xong`;
    }
    const visible = sectionTasks.filter(task => normalize(task.name).includes(query)
        && (filter.value === 'all' || task.done === (filter.value === 'done'))
        && (!categoryFilter.value || task.category === categoryFilter.value)
        && (!priorityFilter.value || task.priority === priorityFilter.value))
        .sort(compareTasks);
    list.replaceChildren(...visible.map(taskRow));
    summary.textContent = `${visible.length} / ${sectionTasks.length} công việc`;
    empty.hidden = visible.length > 0;
    empty.textContent = sectionTasks.length ? 'Không tìm thấy công việc phù hợp.' : emptyByView[view];
}

async function loadTasks() {
    const version = ++loadVersion;
    const now = new Date();
    const date = localDay(now);
    if (date !== today.dateTime) {
        tasks = null;
        today.dateTime = date;
        today.textContent = localDate.format(now);
        render();
    }
    summary.textContent = 'Đang tải…';
    showMessage(listError);
    retry.hidden = true;
    try {
        const result = await api('/api/tasks');
        if (version !== loadVersion) return;
        tasks = result;
        render();
    } catch (error) {
        if (version !== loadVersion) return;
        tasks = null;
        render();
        summary.textContent = '';
        showMessage(listError, error.message);
        retry.hidden = false;
    }
}

async function mutate(request, errorTarget = listError) {
    if (busy) return false;
    busy = true;
    save.disabled = true;
    cancel.disabled = true;
    showMessage(errorTarget);
    try {
        await request();
        await loadTasks();
        return true;
    } catch (error) {
        showMessage(errorTarget, error.message);
        return false;
    } finally {
        busy = false;
        save.disabled = false;
        cancel.disabled = false;
    }
}

add.addEventListener('click', () => openForm());
cancel.addEventListener('click', () => dialog.close());
dialog.addEventListener('cancel', event => {
    if (busy) event.preventDefault();
});
retry.addEventListener('click', loadTasks);
nameInput.addEventListener('input', () => nameInput.setCustomValidity(''));
search.addEventListener('input', render);
for (const control of [filter, categoryFilter, priorityFilter, sort]) {
    control.addEventListener('change', render);
}
clearFilters.addEventListener('click', () => {
    search.value = '';
    categoryFilter.value = '';
    priorityFilter.value = '';
    filter.value = 'all';
    sort.value = 'due';
    render();
    search.focus();
});
for (const button of viewButtons) {
    button.addEventListener('click', () => {
        view = button.dataset.view;
        for (const item of viewButtons) item.setAttribute('aria-pressed', String(item === button));
        document.querySelector('#view-title').textContent = button.textContent;
        document.title = `${button.textContent} | ToDo cá nhân`;
        showMessage(feedback);
        render();
    });
}
form.addEventListener('submit', async event => {
    event.preventDefault();
    const name = nameInput.value.trim();
    if (!name) {
        nameInput.setCustomValidity('Vui lòng nhập tên công việc.');
        nameInput.reportValidity();
        return;
    }
    const fields = {
        name, dueDate: dateInput.value, time: timeInput.value,
        category: categoryInput.value, priority: priorityInput.value, notes: notesInput.value,
    };
    const id = editingTask?.id;
    const saved = await mutate(() => api(id ? `/api/tasks/${id}` : '/api/tasks', id ? 'PUT' : 'POST', fields), formError);
    if (!saved) return;
    dialog.close();
    announce(id ? 'Đã lưu thay đổi.' : 'Đã thêm công việc.');
    add.focus();
});

deleteDialog.addEventListener('close', async () => {
    if (deleteDialog.returnValue === 'delete') {
        const id = deletingTask.id;
        if (await mutate(() => api(`/api/tasks/${id}`, 'DELETE'))) {
            announce('Đã xóa công việc.');
            add.focus();
        }
    }
});

window.addEventListener('pageshow', loadTasks);
window.setInterval(() => {
    if (today.dateTime !== localDay()) loadTasks();
}, 15_000);
