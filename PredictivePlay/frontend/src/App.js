import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Fixtures from './pages/Fixtures';
import Login from './pages/Login';
import Leaderboard from './pages/Leaderboard';
import Register from './pages/Register';
import Predict from './pages/Predict'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/leaderboard" exact element={<Leaderboard/>} />
        <Route path="/fixtures" element={<Fixtures />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/predict" element={<Predict />} />
      </Routes>
    </Router>
  );
}

export default App;