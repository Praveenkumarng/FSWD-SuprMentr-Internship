// ============================================================
// Routes Layer — taskRoutes.js
// Responsibility: Maps HTTP endpoints to controller methods.
// Knows nothing about business logic or data.
// ============================================================

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Task routes
router.get('/tasks',        taskController.getAllTasks);   // GET    /tasks
router.get('/tasks/:id',    taskController.getTaskById);   // GET    /tasks/:id
router.post('/tasks',       taskController.createTask);    // POST   /tasks
router.put('/tasks/:id',    taskController.updateTask);    // PUT    /tasks/:id
router.delete('/tasks/:id', taskController.deleteTask);    // DELETE /tasks/:id

module.exports = router;
