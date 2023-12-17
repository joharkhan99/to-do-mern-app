// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/todos`).then((response) => {
      setTodos(response.data);
    });
  }, []);

  const addTodo = () => {
    if (task.trim() !== "") {
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/todos`, { task })
        .then((response) => {
          setTodos([...todos, response.data]);
          setTask("");
        });
    }
  };

  const deleteTodo = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/todos/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo._id !== id));
      });
  };

  return (
    <div className="flex justify-center items-center p-10 mt-5">
      <div>
        <h1 className="text-2xl font-bold w-full text-center">ToDo List</h1>
        <div className="flex items-center gap-3 my-4">
          <input
            type="text"
            placeholder="Enter task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="border border-gray-400 p-2 rounded-lg outline-none"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add Task
          </button>
        </div>
        <ul className="w-full bg-gray-200 p-5 rounded-xl">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="bg-white mb-2 p-3 rounded-xl font-medium flex justify-between items-center"
            >
              {todo.task}
              <button
                onClick={() => deleteTodo(todo._id)}
                className="text-white hover:text-red-600 bg-red-500 rounded-md h-fit w-fit py-0 p-2 transition"
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
