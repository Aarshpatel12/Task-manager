import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://task-manager-3p1k.onrender.com/login', { email, password })
        .then(result => {
            if(result.data === "Success") {
                // Browser mein email save kar lo taaki tasks filter kar sakein
                localStorage.setItem("userEmail", email);
                navigate('/home');
            } else {
                alert("Incorrect password or email");
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="App">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required/><br/>
                <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required/><br/>
                <button>Login</button>
            </form>
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
    );
}
export default Login;