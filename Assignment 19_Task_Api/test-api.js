const http = require('http');

function makeRequest(options, data) {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => resolve({ statusCode: res.statusCode, body: body }));
        });
        req.on('error', reject);
        if (data) req.write(JSON.stringify(data));
        req.end();
    });
}

async function test() {
    console.log('Testing Task API...');

    // 1. GET all tasks
    console.log('\n1. GET /tasks');
    const getRes = await makeRequest({ hostname: 'localhost', port: 3000, path: '/tasks', method: 'GET' });
    console.log('Status:', getRes.statusCode);
    console.log('Body:', getRes.body);

    // 2. POST a new task
    console.log('\n2. POST /tasks');
    const postData = { title: 'Test Task', description: 'Created by test script' };
    const postRes = await makeRequest({
        hostname: 'localhost',
        port: 3000,
        path: '/tasks',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }, postData);
    console.log('Status:', postRes.statusCode);
    console.log('Body:', postRes.body);

    // 3. PUT (update) a task
    console.log('\n3. PUT /tasks/1');
    const putData = { completed: true };
    const putRes = await makeRequest({
        hostname: 'localhost',
        port: 3000,
        path: '/tasks/1',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
    }, putData);
    console.log('Status:', putRes.statusCode);
    console.log('Body:', putRes.body);

    // 4. DELETE a task
    console.log('\n4. DELETE /tasks/2');
    const deleteRes = await makeRequest({ hostname: 'localhost', port: 3000, path: '/tasks/2', method: 'DELETE' });
    console.log('Status:', deleteRes.statusCode);
    console.log('Body:', deleteRes.body);

    console.log('\nTests completed.');
}

test().catch(console.error);
