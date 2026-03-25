const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;

    res.setHeader('Content-Type', 'text/plain');

    if (url === '/') {
        res.statusCode = 200;
        res.end('Hello User, you are on the Home page');
    } else if (url === '/about') {
        res.statusCode = 200;
        res.end('Welcome to About Page');
    } else if (url === '/contact') {
        res.statusCode = 200;
        res.end('Contact us at hello@server.com');
    } else {
        res.statusCode = 404;
        res.end('Page Not Found');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});
