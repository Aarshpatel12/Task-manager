import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Button Dabaya Gaya!"); // Step 1 Check
        console.log("Sending data:", email, password);

        // DHYAAN DEIN: Link wahi hona chahiye jo Backend ka hai
        axios.post('https://task-manager-3p1k.onrender.com/login', { email, password })
        .then(result => {
            console.log("Server Response:", result.data); // Step 2 Check

            if(result.data === "Success") {
                console.log("Login Successful");
                localStorage.setItem("userEmail", email);
                navigate('/home');
            } else {
                // Agar password galat hai ya user nahi mila
                alert(JSON.stringify(result.data)); 
            }
        })
        .catch(err => {
            console.log("Error aa gaya:", err); // Step 3 Check
            alert("Connection Error! Console dekho.");
        });
    }

    return (
        <div className="App">
            <h2>Login Testing</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    onChange={e => setEmail(e.target.value)} 
                    required
                />
                <br/>
                <input 
                    type="password" 
                    placeholder="Password" 
                    onChange={e => setPassword(e.target.value)} 
                    required
                />
                <br/>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
    );
}

export default Login;