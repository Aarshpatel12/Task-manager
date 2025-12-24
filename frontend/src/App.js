import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  // Apna URL yahan set karo (Localhost ya Render)
  const API_URL = 'https://task-manager-3p1k.onrender.com'; 

  useEffect(() => {
    axios.get(`${API_URL}/get`)
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleAdd = () => {
    if(task.trim() === "") return;
    axios.post(`${API_URL}/add`, { task: task })
      .then(result => window.location.reload())
      .catch(err => console.log(err));
  }

  // Task ko History mein bhejne wala function
  const handleDone = (id) => {
    axios.put(`${API_URL}/update/`+id)
      .then(result => window.location.reload())
      .catch(err => console.log(err));
  }

  // History se Permanent Delete karne wala function
  const handleDelete = (id) => {
    axios.delete(`${API_URL}/delete/`+id)
      .then(result => window.location.reload())
      .catch(err => console.log(err));
  }

  return (
    <div className="App">
      <h1>My Task Manager</h1>
      
      <div className="input_box">
        <input 
          type="text" 
          placeholder="Enter Task" 
          onChange={(e) => setTask(e.target.value)} 
        />
        <button className="add-btn" onClick={handleAdd}>Add</button>
      </div>

      {/* --- ACTIVE TASKS SECTION --- */}
      <h2>Pending Tasks</h2>
      <ul>
        {
          todos.filter(todo => !todo.done).map((todo) => (
            <li key={todo._id} className="task-item">
                <span>{todo.todo}</span>
                {/* Green Check Button: Moves to History */}
                <button 
                  className="done-btn"
                  onClick={() => handleDone(todo._id)}>
                  ✅ Done
                </button>
            </li>
          ))
        }
      </ul>

      <hr /> {/* Ek line draw karne ke liye */}

      {/* --- HISTORY SECTION --- */}
      <h2>History (Completed)</h2>
      <ul>
        {
          todos.filter(todo => todo.done).map((todo) => (
            <li key={todo._id} className="task-item history-item">
                <span style={{textDecoration: "line-through"}}>{todo.todo}</span>
                {/* Red Delete Button: Deletes Permanently */}
                <button 
                  className="delete-btn"
                  onClick={() => handleDelete(todo._id)}>
                  🗑️ Delete
                </button>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;