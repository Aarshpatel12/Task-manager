import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  // DHYAAN DEIN: Agar local chala rahe ho to localhost use karo.
  // Agar Render par daal rahe ho, to Render wala link use karo.
  // Abhi main localhost likh raha hu testing ke liye:
  const API_URL = 'http://localhost:3001'; 
  // const API_URL = 'https://tumhara-app.onrender.com'; // Deploy karte waqt ye line use karna

  useEffect(() => {
    axios.get(`${API_URL}/get`)
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleAdd = () => {
    if(task.trim() === "") return; // Khali task add na ho
    axios.post(`${API_URL}/add`, { task: task })
      .then(result => {
        window.location.reload();
      })
      .catch(err => console.log(err));
  }

  // Delete ka Function
  const handleDelete = (id) => {
    axios.delete(`${API_URL}/delete/`+id)
      .then(result => {
        window.location.reload(); // Page refresh karke list update karega
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="App">
      <h1>My To-Do List</h1>
      
      <div className="input_box">
        <input 
          type="text" 
          placeholder="Enter Task" 
          onChange={(e) => setTask(e.target.value)} 
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <ul>
        {
          todos.map((todo) => (
             // Har list item ke saath ab ek Delete button bhi hai
             // MongoDB har item ko ek unique '_id' deta hai, hum wahi use kar rahe hain
            <li key={todo._id}>
                <span>{todo.todo}</span>
                <button 
                  style={{marginLeft: "10px", backgroundColor: "red", color: "white"}}
                  onClick={() => handleDelete(todo._id)}>
                  Delete
                </button>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;