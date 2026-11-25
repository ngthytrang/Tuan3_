const http = require('node:http');
const { readFile } = require('node:fs/promises');
const path = require('node:path');
const handleApi = require('./api');
const { memoryStore, sqliteStore } = require('./storage');

const memory = process.argv.includes('--memory');
const store = memory ? memoryStore() : sqliteStore();

const routes = new Map([
    ['/', ['index.html', 'text/html']],
    ['/thong-ke', ['stats.html', 'text/html']],
    ['/styles.css', ['styles.css', 'text/css']],
    ['/tasks.js', ['tasks.js', 'text/javascript']],
    ['/client.js', ['client.js', 'text/javascript']],
    ['/stats.js', ['stats.js', 'text/javascript']],
]);

const server = http.createServer(async (request, response) => {
    const url = new URL('http://127.0.0.1' + request.url);
    if (url.pathname.startsWith('/api/')) return handleApi(request, response, url, store);
    const route = routes.get(url.pathname);
    if (request.method !== 'GET' && request.method !== 'HEAD') {
        response.writeHead(405, { Allow: 'GET, HEAD' }).end();
        return;
    }
    if (!route) {
        response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Không tìm thấy trang.');
        return;
    }
    const [file, type] = route;
    try {
        const content = await readFile(path.join(__dirname, 'public', file));
        response.writeHead(200, { 'Content-Type': `${type}; charset=utf-8`, 'Cache-Control': 'no-cache' });
        response.end(request.method === 'HEAD' ? undefined : content);
    } catch (error) {
        console.error(error);
        response.writeHead(500).end();
    }
});

const port = Number(process.env.PORT || 8080);
server.listen(port, '127.0.0.1', () => {
    console.log(`ToDo cá nhân (${memory ? 'bộ nhớ' : 'SQLite'}): http://127.0.0.1:${server.address().port}`);
});
