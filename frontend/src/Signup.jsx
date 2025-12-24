import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Backend URL (Render wala ya localhost)
        axios.post('https://task-manager-3p1k.onrender.com/register', { email, password })
        .then(result => {
            console.log(result);
            navigate('/login'); // Register ke baad login page par bhejo
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="App">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required/><br/>
                <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required/><br/>
                <button>Register</button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
}
export default Signup;