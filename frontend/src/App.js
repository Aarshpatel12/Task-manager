import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import your new pages
// Dhyan rakhna ki ye files tumne bana li hon
import Signup from './Signup';
import Login from './Login';
import Home from './Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Agar koi '/signup' khole toh Signup page dikhao */}
        <Route path="/signup" element={<Signup />} />
        
        {/* Agar koi '/login' khole toh Login page dikhao */}
        <Route path="/login" element={<Login />} />
        
        {/* Agar koi '/home' khole toh Home (List) page dikhao */}
        <Route path="/home" element={<Home />} />
        
        {/* Default: Agar koi seedha site khole, toh Login par bhej do */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;