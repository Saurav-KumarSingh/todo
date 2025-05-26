import axios from 'axios';
import React, { useState } from 'react';

const TodoItem = ({ todo, onUpdateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete('http://localhost:8080/api/todos', { data: { id } });
      onUpdateTodo();
    } catch (err) {
      console.error('Failed to delete todo:', err);
      alert('Could not delete the todo.');
    }
  };

  const handleToggleComplete = async (id, currentStatus) => {
    try {
      await axios.put('http://localhost:8080/api/todos', {
        id,
        completed: !currentStatus,
      });
      onUpdateTodo();
    } catch (err) {
      console.error('Toggle failed:', err);
    }
  };

  const handleTitleUpdate = async () => {
    if (editTitle.trim() === '') {
      alert("Title can't be empty");
      return;
    }

    if (editTitle === todo.title) {
      setIsEditing(false); // no change, just exit edit mode
      return;
    }

    try {
      await axios.put('http://localhost:8080/api/todos', {
        id: todo.id,
        title: editTitle.trim(),
      });
      onUpdateTodo();
      setIsEditing(false);
    } catch (err) {
      console.error('Update failed:', err);
      alert('Could not update the todo.');
    }
  };

  // Allow save on Enter key in input field
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleTitleUpdate();
    }
    if (e.key === 'Escape') {
      setEditTitle(todo.title);
      setIsEditing(false);
    }
  };

  return (
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-4 sm:p-6 rounded-2xl shadow-md mb-5 border border-gray-200 transition-transform transform hover:scale-[1.01] duration-300 ease-in-out relative group overflow-hidden">

    {/* Task Info: Checkbox + Title/Input */}
    <div className="flex sm:flex-row items-start sm:items-center w-full flex-1 gap-3 z-10 min-w-0">
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => handleToggleComplete(todo.id, todo.completed)}
        className="w-6 h-6 sm:w-5 sm:h-5 my-2 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer flex-shrink-0"
      />

      {/* Editable Title */}
      {!isEditing ? (
        <p
          onDoubleClick={() => setIsEditing(true)}
          className={`text-lg sm:text-lg md:text-xl font-semibold break-words cursor-text truncate flex-grow min-w-0 mt-1 sm:mt-0 ${
            todo.completed ? 'line-through text-gray-500 italic opacity-70' : 'text-gray-800'
          }`}
          title={todo.title}
        >
          {todo.title}
        </p>
      ) : (
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleTitleUpdate}
          onKeyDown={handleKeyDown}
          autoFocus
          className="text-lg sm:text-lg md:text-xl font-semibold w-full border-b-2 border-purple-500 focus:outline-none focus:ring-0 truncate mt-1 sm:mt-0"
        />
      )}
    </div>

    {/* Action Icons */}
    <div className="flex flex-row gap-4 mt-4 sm:mt-0 sm:ml-4 justify-start sm:justify-end w-full sm:w-auto">
      {/* Edit icon */}
      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="p-3 text-blue-600 bg-blue-100 rounded-full opacity-100 transition-opacity duration-300 ease-in-out cursor-pointer flex-shrink-0 hover:bg-blue-200"
          title="Edit"
          aria-label="Edit todo"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>
      )}

      {/* Delete icon */}
      <button
        onClick={() => handleDeleteTodo(todo.id)}
        className="p-3 text-red-600 bg-red-100 rounded-full opacity-100 transition-opacity duration-300 ease-in-out cursor-pointer flex-shrink-0 hover:bg-red-200"
        title="Delete"
        aria-label="Delete todo"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  </div>
);


};

export default TodoItem;
