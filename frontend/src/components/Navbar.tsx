import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">🎓 Credential System</h1>
        <div className="navbar-links">
          <Link 
            to="/issue" 
            className={location.pathname === '/issue' ? 'active' : ''}
          >
            Issue Credential
          </Link>
          <Link 
            to="/verify" 
            className={location.pathname === '/verify' ? 'active' : ''}
          >
            Verify Credential
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;