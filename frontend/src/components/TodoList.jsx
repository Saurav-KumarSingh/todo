import TodoItem from "./TodoItem";

const TodoList = ({ todos,onUpdateTodo }) => {
  if (todos.length === 0) {
    return (
      <p className="text-center text-gray-600 text-2xl py-12 font-semibold animate-fade-in">
        No tasks yet! Let's add your first one. 🎉
      </p>
    );
  }

  return (
    <div className="space-y-5"> {/* Increased space-y */}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdateTodo={onUpdateTodo}
        />
      ))}
    </div>
  );
};


export default TodoList;