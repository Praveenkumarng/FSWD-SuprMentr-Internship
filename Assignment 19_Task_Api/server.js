const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let tasks = [
    { id: 1, title: 'Learn Node.js', description: 'Study the basics of Node.js and Express', completed: false },
    { id: 2, title: 'Build Task API', description: 'Create a CRUD API for task management', completed: true }
];

// GET all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// GET task by ID
app.get('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// POST a new task
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }
    const newTask = {
        id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
        title,
        description: description || '',
        completed: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// PUT (update) a task
app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
        const { title, description, completed } = req.body;
        tasks[index] = {
            ...tasks[index],
            title: title !== undefined ? title : tasks[index].title,
            description: description !== undefined ? description : tasks[index].description,
            completed: completed !== undefined ? completed : tasks[index].completed
        };
        res.json(tasks[index]);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// DELETE a task
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
        const deletedTask = tasks.splice(index, 1);
        res.json({ message: 'Task deleted successfully', task: deletedTask[0] });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
