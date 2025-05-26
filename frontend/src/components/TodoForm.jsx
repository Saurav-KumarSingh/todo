import React, { useState } from 'react';
import axios from 'axios';

const TodoForm = ({ onTodoAdded }) => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setLoading(true);
    try {
      await axios.post('http://localhost:8080/api/todos', { title: inputValue });
      setInputValue('');
      onTodoAdded(); // 🔁 Re-fetch todos after successful add
    } catch (err) {
      console.error('Error adding todo:', err);
      alert('Failed to add task.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-12">
      <input
        type="text"
        className="flex-grow p-4 border-2 border-purple-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500 transition duration-300 ease-in-out text-gray-800 placeholder-gray-400 text-lg font-medium shadow-inner"
        placeholder="What's on your mind today?"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className="px-8 py-4 bg-gradient-to-br from-purple-700 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-purple-600 focus:ring-offset-2 disabled:opacity-50"
      >
        {loading ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
};

export default TodoForm;
