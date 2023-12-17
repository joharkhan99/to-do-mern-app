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

  return (
    <div>
      <h1>ToDo List</h1>
      <div>
        <input
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTodo}>Add Task</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>{todo.task}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
