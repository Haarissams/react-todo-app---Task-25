import React, { useState } from 'react';

const TodoCard = ({ todo, updateTodo, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTask, setEditTask] = useState(todo);

  const handleStatusChange = (status) => {
    updateTodo(todo.id, { ...todo, status });
  };

  const handleEdit = () => {
    if (isEditing) {
      updateTodo(todo.id, editTask);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="todo-card">
      {isEditing ? (
        <div className="todo-edit">
          <input
            type="text"
            value={editTask.name}
            onChange={(e) => setEditTask({ ...editTask, name: e.target.value })}
          />
          <input
            type="text"
            value={editTask.description}
            onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
          />
          <button onClick={handleEdit}>Save</button>
        </div>
      ) : (
        <div className="todo-details">
          <h3>{todo.name}</h3>
          <p>Description: {todo.description}</p>
          <p>Status: 
            <span className={`status-label ${todo.status === 'completed' ? 'completed' : 'not-completed'}`}>
              {todo.status.charAt(0).toUpperCase() + todo.status.slice(1)}
            </span>
            <select value={todo.status} onChange={(e) => handleStatusChange(e.target.value)}>
              <option value="completed">Completed</option>
              <option value="not completed">Not Completed</option>
            </select>
          </p>
          <button className="edit-btn" onClick={handleEdit}>Edit</button>
          <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default TodoCard;
