import React, { useState } from 'react';
import './App.css';

const initialTodos = [
  { id: 1, name: 'Learn CSS', description: 'Study CSS basics and advanced techniques.', status: 'not completed' },
  { id: 2, name: 'Build a React app', description: 'Create a to-do app with React.', status: 'not completed' },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [filter, setFilter] = useState('all');
  const [newTodo, setNewTodo] = useState({ name: '', description: '', status: 'not completed' });
  
  const addTodo = () => {
    setTodos([...todos, { ...newTodo, id: todos.length + 1 }]);
    setNewTodo({ name: '', description: '', status: 'not completed' });
  };

  const editTodo = (id, updatedTodo) => {
    setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const changeStatus = (id, status) => {
    editTodo(id, { ...todos.find(todo => todo.id === id), status });
  };

  const filteredTodos = todos.filter(todo => 
    filter === 'all' || filter === todo.status
  );

  return (
    <div className="App">
      <h1>To-Do List</h1>
      
      <div className="filter">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('not completed')}>Not Completed</button>
      </div>
      
      <div className="new-todo">
        <input 
          type="text" 
          placeholder="Task Name" 
          value={newTodo.name} 
          onChange={e => setNewTodo({ ...newTodo, name: e.target.value })} 
        />
        <input 
          type="text" 
          placeholder="Description" 
          value={newTodo.description} 
          onChange={e => setNewTodo({ ...newTodo, description: e.target.value })} 
        />
        <button onClick={addTodo}>Add Task</button>
      </div>
      
      <div className="todo-list">
        {filteredTodos.map(todo => (
          <div key={todo.id} className="todo-card">
            <h2>{todo.name}</h2>
            <p>{todo.description}</p>
            <select 
              value={todo.status} 
              onChange={e => changeStatus(todo.id, e.target.value)}
            >
              <option value="not completed">Not Completed</option>
              <option value="completed">Completed</option>
            </select>
            <button onClick={() => editTodo(todo.id, { ...todo, name: prompt('New Task Name:', todo.name) })}>Edit</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
