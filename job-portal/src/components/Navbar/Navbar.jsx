import React from 'react';
import './Navbar.css'; // Ensure this import is present
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const router = useNavigate();
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Job It</h1>
      </div>
      <div className="navbar-links">
        <a onClick={ ()=>router("/jobs")}>Jobs</a>
        <a href="#dashboard">Dashboard</a>
        <a onClick={()=>router("/login")}>Login</a>
      </div>
    </nav>
  );
};

export default Navbar;
