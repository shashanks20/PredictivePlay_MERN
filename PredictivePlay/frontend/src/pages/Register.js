import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Register = () => {
  const [formData, setFormData] = useState({
    fname: '',
    email: '',
    password: '',
    cpassword: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.cpassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fname: formData.fname,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setError(null);
        navigate('/login');
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error('Error during registration:', err);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container register-container" style={{ marginTop: '6%' }}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="register-form">
              <h2>Register</h2>
              <form onSubmit={handleSubmit} autoComplete="off">
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="fname"
                    placeholder="Enter your Username"
                    value={formData.fname}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email ID</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter your Email ID"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cpassword">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="cpassword"
                    id="cpassword"
                    placeholder="Re-Enter password"
                    value={formData.cpassword}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-success btn-block">Register</button>
              </form>
              {error && <div className="alert alert-danger mt-3">{error}</div>}
              <div className="login-link">
                <p>Already registered? <Link to="/login">Login here</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
