import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          💧 Water Reporter
        </Link>
        <ul className="navbar-nav">
          <li><Link to="/">होम</Link></li>
          <li><Link to="/report">रिपोर्ट करें</Link></li>
          <li><Link to="/map">मैप देखें</Link></li>
          <li><Link to="/dashboard">डैशबोर्ड</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;