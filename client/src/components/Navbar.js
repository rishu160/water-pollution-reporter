import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          💧 Raipur Water Reporter
        </Link>
        <ul className="navbar-nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/report">Report Pollution</Link></li>
          <li><Link to="/map">View Map</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;