import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // corrected from 'fname' to 'username'
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem('username', username); // Store username in sessionStorage
        window.location.href = '/predict'; // Redirect to /predict after successful login
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container login-container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="login-form">
              <h2>Login</h2>
              <form onSubmit={handleSubmit} autoComplete="off">
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username" // changed from 'fname' to 'username'
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="off" // additional security measure
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off" // additional security measure
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Login</button>
              </form>
              {error && <div className="alert alert-danger mt-3">{error}</div>}
              <div className="register-link">
                <p>New user? <a href="/register">Register here</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
