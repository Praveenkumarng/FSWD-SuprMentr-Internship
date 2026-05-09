// ============================================================
// Model Layer — taskModel.js
// Responsibility: In-memory data store and data-access helpers.
// The controller never touches the raw `tasks` array directly.
// ============================================================

let tasks = [
    { id: 1, title: 'Learn Node.js', description: 'Study the basics of Node.js and Express', completed: false },
    { id: 2, title: 'Build Task API', description: 'Create a CRUD API for task management', completed: true }
];

// Helper to generate the next unique ID
const getNextId = () =>
    tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

// Get all tasks
const getAllTasks = () => tasks;

// Get a single task by ID (returns undefined if not found)
const getTaskById = (id) => tasks.find(t => t.id === id);

// Create and persist a new task
const createTask = (title, description = '') => {
    const newTask = {
        id: getNextId(),
        title,
        description,
        completed: false
    };
    tasks.push(newTask);
    return newTask;
};

// Update an existing task's fields (returns updated task, or null if not found)
const updateTask = (id, { title, description, completed }) => {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return null;

    tasks[index] = {
        ...tasks[index],
        title:       title       !== undefined ? title       : tasks[index].title,
        description: description !== undefined ? description : tasks[index].description,
        completed:   completed   !== undefined ? completed   : tasks[index].completed
    };
    return tasks[index];
};

// Delete a task (returns deleted task, or null if not found)
const deleteTask = (id) => {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return null;

    const [deleted] = tasks.splice(index, 1);
    return deleted;
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
