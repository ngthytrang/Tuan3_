class RequestError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

function json(response, status, data) {
    response.writeHead(status, {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
    }).end(JSON.stringify(data));
}

async function readJson(request) {
    const chunks = [];
    let size = 0;
    for await (const chunk of request) {
        size += chunk.length;
        if (size <= 8192) chunks.push(chunk);
    }
    if (size > 8192) throw new RequestError(413, 'Dữ liệu gửi lên quá lớn.');
    try {
        const data = JSON.parse(Buffer.concat(chunks).toString('utf8'));
        if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error();
        return data;
    } catch {
        throw new RequestError(400, 'Dữ liệu gửi lên không hợp lệ.');
    }
}

function validDate(value) {
    if (typeof value !== 'string' || !/^(?!0000)\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const date = new Date(value + 'T00:00:00Z');
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

const categories = ['Học tập', 'Cá nhân', 'Công việc', 'Khác'];
const priorities = ['Cao', 'Vừa', 'Thấp'];

function taskFields(data, creating = false) {
    const name = typeof data.name === 'string' ? data.name.trim() : '';
    if (!name || name.length > 120) throw new RequestError(400, 'Tên công việc phải có từ 1 đến 120 ký tự.');
    if (!validDate(data.dueDate)) throw new RequestError(400, 'Ngày đến hạn không hợp lệ.');
    const time = data.time ?? '';
    if (typeof time !== 'string' || (time && !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(time))) {
        throw new RequestError(400, 'Giờ đến hạn không hợp lệ.');
    }
    const fields = { name, dueDate: data.dueDate, time };
    if (data.category !== undefined || creating) {
        fields.category = data.category === undefined ? 'Khác' : data.category;
        if (!categories.includes(fields.category)) throw new RequestError(400, 'Danh mục không hợp lệ.');
    }
    if (data.priority !== undefined || creating) {
        fields.priority = data.priority === undefined ? 'Vừa' : data.priority;
        if (!priorities.includes(fields.priority)) throw new RequestError(400, 'Mức ưu tiên không hợp lệ.');
    }
    if (data.notes !== undefined || creating) {
        const notes = data.notes === undefined ? '' : data.notes;
        if (typeof notes !== 'string' || notes.length > 500) {
            throw new RequestError(400, 'Ghi chú chỉ được chứa tối đa 500 ký tự.');
        }
        fields.notes = notes.trim();
    }
    return fields;
}

function summarize(tasks, today) {
    const date = new Date(today + 'T00:00:00Z');
    date.setUTCDate(date.getUTCDate() - 6);
    const days = new Map();
    for (let i = 0; i < 7; i++) {
        const day = date.toISOString().split('T')[0];
        days.set(day, { date: day, done: 0, pending: 0 });
        date.setUTCDate(date.getUTCDate() + 1);
    }

    const stats = { total: tasks.length, done: 0, pending: 0, overdue: 0 };
    for (const task of tasks) {
        const status = task.done ? 'done' : 'pending';
        stats[status]++;
        if (!task.done && task.dueDate < today) stats.overdue++;
        const day = days.get(task.dueDate);
        if (day) day[status]++;
    }
    return { ...stats, days: [...days.values()] };
}

async function handleApi(request, response, url, store) {
    const { pathname, searchParams } = url;
    const { method } = request;
    try {
        if (pathname === '/api/stats') {
            if (method !== 'GET') return methodNotAllowed(response, 'GET');
            const today = searchParams.get('today') ?? new Intl.DateTimeFormat('sv-SE').format(new Date());
            if (!validDate(today) || today < '0001-01-07') throw new RequestError(400, 'Ngày thống kê không hợp lệ.');
            return json(response, 200, summarize(store.list(), today));
        }
        if (pathname === '/api/tasks') {
            if (method === 'POST') return json(response, 201, store.create(taskFields(await readJson(request), true)));
            if (method !== 'GET') return methodNotAllowed(response, 'GET, POST');
            const date = searchParams.get('date');
            if (date !== null && !validDate(date)) throw new RequestError(400, 'Ngày cần xem không hợp lệ.');
            return json(response, 200, store.list(date));
        }
        const id = Number(/^\/api\/tasks\/([1-9]\d*)$/.exec(pathname)?.[1]);
        if (!Number.isSafeInteger(id)) throw new RequestError(404, 'Không tìm thấy đường dẫn.');

        let result;
        if (method === 'PUT') {
            result = store.edit(id, taskFields(await readJson(request)));
        } else if (method === 'PATCH') {
            const { done } = await readJson(request);
            if (typeof done !== 'boolean') throw new RequestError(400, 'Trạng thái hoàn thành không hợp lệ.');
            result = store.complete(id, done);
        } else if (method === 'DELETE') {
            result = store.remove(id);
        } else {
            return methodNotAllowed(response, 'PUT, PATCH, DELETE');
        }
        if (!result) throw new RequestError(404, 'Không tìm thấy công việc.');
        if (method === 'DELETE') return response.writeHead(204).end();
        return json(response, 200, result);
    } catch (error) {
        if (error instanceof RequestError) return json(response, error.status, { error: error.message });
        console.error(error);
        return json(response, 500, { error: 'Máy chủ gặp lỗi. Vui lòng thử lại.' });
    }
}

function methodNotAllowed(response, allow) {
    response.setHeader('Allow', allow);
    return json(response, 405, { error: 'Phương thức không được hỗ trợ.' });
}

module.exports = handleApi;
