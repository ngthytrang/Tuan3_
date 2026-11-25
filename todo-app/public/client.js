const dateFormatter = new Intl.DateTimeFormat('sv-SE');

function localDay(date = new Date()) {
    return dateFormatter.format(date);
}

async function api(path, method = 'GET', data) {
    let response;
    try {
        response = await fetch(path, {
            method,
            headers: data === undefined ? undefined : { 'Content-Type': 'application/json' },
            body: data === undefined ? undefined : JSON.stringify(data),
        });
    } catch {
        throw new Error('Không thể kết nối máy chủ. Hãy kiểm tra máy chủ đang chạy rồi thử lại.');
    }

    if (response.status === 204) return;
    const result = await response.json().catch(() => null);
    if (!response.ok || result === null) {
        throw new Error(result?.error || 'Máy chủ trả về lỗi. Vui lòng thử lại.');
    }
    return result;
}
