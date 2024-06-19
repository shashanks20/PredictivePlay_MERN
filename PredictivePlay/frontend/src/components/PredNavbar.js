import React from 'react';
import { Link } from 'react-router-dom';

const PredNavbar = () => {
  // Retrieve username from sessionStorage
  const username = sessionStorage.getItem('username');

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{ backgroundColor: '#333', paddingTop: '6px' }}>
      <Link className="navbar-brand" to="/" style={{ color: '#efeaea', fontWeight: 'bold' }}>PredictivePlay</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/" id="username">{username}</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default PredNavbar;
