import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [task, setTask] = useState(""); // Input field ke liye state
  const [todos, setTodos] = useState([]); // List display karne ke liye state

  // Jab page load ho, tab data fetch karo
  useEffect(() => {
    axios.get('https://task-manager-3p1k.onrender.com/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  }, []);

  // Naya task add karne ka function
  const handleAdd = () => {
    axios.post('https://task-manager-3p1k.onrender.com/add', { task: task })
      .then(result => {
        // Page refresh na ho isliye list update kar rahe hain
        window.location.reload(); 
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="App">
      <h1>My To-Do List</h1>
      
      {/* Input Section */}
      <div>
        <input 
          type="text" 
          placeholder="Enter Task" 
          onChange={(e) => setTask(e.target.value)} 
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      {/* List Section */}
      <ul>
        {
          todos.map((todo, index) => (
            <li key={index}>{todo.todo}</li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;