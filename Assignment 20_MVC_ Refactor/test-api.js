// test-api.js — Automated verification of all CRUD endpoints
const http = require('http');

function request(method, path, body = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path,
            method,
            headers: { 'Content-Type': 'application/json' }
        };
        const req = http.request(options, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ status: res.statusCode, body: JSON.parse(data) }));
        });
        req.on('error', reject);
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
}

function pass(label) { console.log(`  ✅ PASS — ${label}`); }
function fail(label, reason) { console.log(`  ❌ FAIL — ${label}: ${reason}`); }

async function runTests() {
    console.log('\n========== Task API — MVC Refactor Tests ==========\n');

    // 1. GET /tasks — should return initial 2 tasks
    let res = await request('GET', '/tasks');
    res.status === 200 && Array.isArray(res.body) && res.body.length === 2
        ? pass('GET /tasks returns all tasks (200)')
        : fail('GET /tasks', `status=${res.status} count=${res.body.length}`);

    // 2. POST /tasks — create a new task
    res = await request('POST', '/tasks', { title: 'MVC Refactor', description: 'Restructure into MVC' });
    res.status === 201 && res.body.title === 'MVC Refactor'
        ? pass('POST /tasks creates task (201)')
        : fail('POST /tasks', `status=${res.status}`);
    const newId = res.body.id;

    // 3. POST /tasks — missing title → 400
    res = await request('POST', '/tasks', { description: 'No title' });
    res.status === 400
        ? pass('POST /tasks without title returns 400')
        : fail('POST /tasks (no title)', `status=${res.status}`);

    // 4. GET /tasks/:id — fetch the newly created task
    res = await request('GET', `/tasks/${newId}`);
    res.status === 200 && res.body.id === newId
        ? pass(`GET /tasks/${newId} returns correct task (200)`)
        : fail(`GET /tasks/${newId}`, `status=${res.status}`);

    // 5. PUT /tasks/:id — update completed status
    res = await request('PUT', `/tasks/${newId}`, { completed: true });
    res.status === 200 && res.body.completed === true
        ? pass(`PUT /tasks/${newId} updates task (200)`)
        : fail(`PUT /tasks/${newId}`, `status=${res.status}`);

    // 6. GET /tasks/:id — non-existent → 404
    res = await request('GET', '/tasks/9999');
    res.status === 404
        ? pass('GET /tasks/9999 returns 404 for unknown task')
        : fail('GET /tasks/9999', `status=${res.status}`);

    // 7. DELETE /tasks/:id — delete the new task
    res = await request('DELETE', `/tasks/${newId}`);
    res.status === 200 && res.body.task.id === newId
        ? pass(`DELETE /tasks/${newId} removes task (200)`)
        : fail(`DELETE /tasks/${newId}`, `status=${res.status}`);

    // 8. GET /tasks — confirm deletion, back to 2 tasks
    res = await request('GET', '/tasks');
    res.status === 200 && res.body.length === 2
        ? pass('GET /tasks after delete returns 2 tasks (200)')
        : fail('GET /tasks after delete', `count=${res.body.length}`);

    console.log('\n====================================================\n');
}

runTests().catch(console.error);
