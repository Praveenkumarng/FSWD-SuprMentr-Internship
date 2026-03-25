import { useState, useEffect } from 'react';

function TaskList() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    } else {
      return [];
    }
  });
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    const newTask = {
      id: crypto.randomUUID(),
      text: inputValue.trim(),
    };
    
    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="task-container">
      <header className="task-header">
        <h1>Dynamic Tasks</h1>
        <p>Manage your daily goals with style.</p>
      </header>
      
      <form className="task-form" onSubmit={handleAddTask}>
        <input 
          type="text" 
          className="task-input" 
          placeholder="What needs to be done?" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="task-add-button">
          Add Task
        </button>
      </form>

      <ul className="task-list">
        {tasks.length === 0 ? (
          <li className="task-empty">No tasks yet. Add one above!</li>
        ) : (
          tasks.map(task => (
            <li key={task.id} className="task-item">
              <span className="task-text">{task.text}</span>
              <button 
                onClick={() => handleDeleteTask(task.id)} 
                className="task-delete-button"
                aria-label="Delete task"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default TaskList;
