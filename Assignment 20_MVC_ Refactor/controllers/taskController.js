// ============================================================
// Controller Layer — taskController.js
// Responsibility: Business logic for each CRUD operation.
// Reads from / writes to the Model; sends HTTP responses.
// ============================================================

const taskModel = require('../models/taskModel');

// GET /tasks — retrieve all tasks
const getAllTasks = (req, res) => {
    const tasks = taskModel.getAllTasks();
    res.json(tasks);
};

// GET /tasks/:id — retrieve a task by ID
const getTaskById = (req, res) => {
    const id = parseInt(req.params.id);
    const task = taskModel.getTaskById(id);

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
};

// POST /tasks — create a new task
const createTask = (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    const newTask = taskModel.createTask(title, description);
    res.status(201).json(newTask);
};

// PUT /tasks/:id — update an existing task
const updateTask = (req, res) => {
    const id = parseInt(req.params.id);
    const updated = taskModel.updateTask(id, req.body);

    if (!updated) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updated);
};

// DELETE /tasks/:id — delete a task
const deleteTask = (req, res) => {
    const id = parseInt(req.params.id);
    const deleted = taskModel.deleteTask(id);

    if (!deleted) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully', task: deleted });
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
