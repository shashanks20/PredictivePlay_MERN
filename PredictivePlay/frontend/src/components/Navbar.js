import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{backgroundColor: '#333', paddingTop: '6px'}}>
    <Link className="navbar-brand" to="/" style={{color: '#efeaea', fontWeight: 'bold'}}>PredictivePlay</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/fixtures">Fixtures</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login/Signup</Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
