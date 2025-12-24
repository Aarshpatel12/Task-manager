import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  
  // LocalStorage se email nikalo
  const userEmail = localStorage.getItem("userEmail");
  const API_URL = 'https://task-manager-3p1k.onrender.com'; 

  useEffect(() => {
    // Agar login nahi hai, to wapas login page bhejo
    if(!userEmail) {
        navigate('/login');
        return;
    }
    // Sirf is email ke tasks mango
    axios.get(`${API_URL}/get/${userEmail}`)
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  }, [userEmail, navigate]);

  const handleAdd = () => {
    if(task.trim() === "") return;
    // Task ke saath email bhi bhejo
    axios.post(`${API_URL}/add`, { task: task, email: userEmail })
      .then(result => window.location.reload())
      .catch(err => console.log(err));
  }

  // Baki code same hai (handleDone, handleDelete)
  const handleDone = (id) => {
    axios.put(`${API_URL}/update/`+id).then(() => window.location.reload());
  }
  const handleDelete = (id) => {
    axios.delete(`${API_URL}/delete/`+id).then(() => window.location.reload());
  }
  
  // Logout function
  const handleLogout = () => {
      localStorage.removeItem("userEmail");
      navigate('/login');
  }

  return (
    <div className="App">
      <div style={{display:'flex', justifyContent:'space-between'}}>
         <h3>User: {userEmail}</h3>
         <button onClick={handleLogout}>Logout</button>
      </div>
      <h1>My Task Manager</h1>
      
      {/* Input Box */}
      <div className="input_box">
        <input type="text" placeholder="Enter Task" onChange={(e) => setTask(e.target.value)} />
        <button className="add-btn" onClick={handleAdd}>Add</button>
      </div>

      {/* Lists (Pending & History) - Same as before */}
      <h2>Pending</h2>
      <ul>
        {todos.filter(todo => !todo.done).map(todo => (
             <li key={todo._id}>
                {todo.todo} 
                <button onClick={() => handleDone(todo._id)}>✅</button>
             </li>
        ))}
      </ul>
      <h2>History</h2>
      <ul>
        {todos.filter(todo => todo.done).map(todo => (
             <li key={todo._id}>
                <s>{todo.todo}</s>
                <button onClick={() => handleDelete(todo._id)}>🗑️</button>
             </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;