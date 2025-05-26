import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

import { Toaster } from 'react-hot-toast';

const App = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/todos');
      setTodos(response.data);
    } catch (err) {
      console.error('Failed to fetch todos:', err);
      setTodos([]);
    }
  };

  


  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-600 flex items-center justify-center p-5 font-sans antialiased">
      <div className="bg-white  p-7 md:p-12 rounded-3xl shadow-2xl w-full max-w-xl border border-gray-100 transform rotate-1 hover:rotate-0 transition-transform duration-700 ease-in-out">
        <h1 className="text-[10vw] md:text-6xl font-extrabold text-center text-gray-900 mb-14 tracking-tight leading-tight">
          <span className="text-purple-700">My</span>Todos
          <span className="text-pink-600">.</span>
        </h1>
        <TodoForm onTodoAdded={fetchTodos} />
        <TodoList todos={todos} onUpdateTodo={fetchTodos} />
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default App;
