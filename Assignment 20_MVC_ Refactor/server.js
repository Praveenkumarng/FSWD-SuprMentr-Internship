// ============================================================
// Entry Point — server.js
// Responsibility: Initialise Express, apply middleware,
// mount routes, and start the HTTP server.
// ============================================================

const express = require('express');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Mount task routes
app.use('/', taskRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
