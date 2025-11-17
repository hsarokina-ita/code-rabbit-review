"use client";

import { useState } from "react";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

type Filter = "all" | "active" | "completed";

function generateId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}-${Math.random().toString(36).substring(2, 15)}`;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: generateId(),
        text: inputValue.trim(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
          TODO List
        </h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a new todo..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-gray-100"
          />
          <button
            onClick={addTodo}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            Add
          </button>
        </div>

        <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 font-medium transition-colors ${
              filter === "all"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-4 py-2 font-medium transition-colors ${
              filter === "active"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            }`}
          >
            Active ({activeCount})
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-2 font-medium transition-colors ${
              filter === "completed"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            }`}
          >
            Completed
          </button>
        </div>

        <ul className="space-y-2">
          {filteredTodos.length === 0 ? (
            <li className="text-center py-8 text-gray-500 dark:text-gray-400">
              {filter === "all"
                ? "No todos yet. Add one above!"
                : filter === "active"
                ? "No active todos."
                : "No completed todos."}
            </li>
          ) : (
            filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
                  className="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
                <span
                  className={`flex-1 ${
                    todo.completed
                      ? "line-through text-gray-500 dark:text-gray-400"
                      : "text-gray-800 dark:text-gray-100"
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  type="button"
                  onClick={() => deleteTodo(todo.id)}
                  aria-label={`Delete "${todo.text}"`}
                  className="px-3 py-1 text-red-500 hover:text-red-700 dark:hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 rounded transition-colors"
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

