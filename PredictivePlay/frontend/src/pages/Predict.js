import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PredNavbar from '../components/PredNavbar';

const Predict = () => {
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState('');
  const [teams, setTeams] = useState([]);
  const [predictedTeam, setPredictedTeam] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(sessionStorage.getItem('username')); // Retrieve username from sessionStorage
    axios.get('/predict')
      .then(response => {
        setMatches(response.data.details);
      })
      .catch(error => {
        console.error('Error fetching matches:', error);
      });
  }, []);

  const handleMatchChange = (e) => {
    const matchId = e.target.value;
    setSelectedMatch(matchId);

    if (matchId) {
      axios.get(`/fetch-columns/${matchId}`)
        .then(response => {
          setTeams([response.data.TeamA, response.data.TeamB]);
        })
        .catch(error => {
          console.error('Error fetching teams:', error);
        });
    } else {
      setTeams([]);
    }
  };

  const handleTeamChange = (e) => {
    setPredictedTeam(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedMatch || !predictedTeam) {
      alert('Please select both a match and predicted team.');
      return;
    }

    const prediction = {
      match: selectedMatch,
      predicted: predictedTeam
    };

    axios.post('/predict', prediction)
      .then(response => {
        console.log('Prediction submitted:', response.data);
        // Optionally update UI or show success message
        alert('Prediction submitted successfully!');
        // Clear form fields if needed
        setSelectedMatch('');
        setPredictedTeam('');
      })
      .catch(error => {
        console.error('Error submitting prediction:', error);
        alert('Failed to submit prediction. Please try again.');
      });
  };

  return (
    <div className="container-fluid">
      <PredNavbar username={username} />
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6">
          <div className="prediction-form p-4 shadow">
            <h2 className="mb-4">Predict Your Match</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="matchDropdown">Select Match</label>
                <select className="form-control centered-select" id="matchDropdown" name="match" value={selectedMatch} onChange={handleMatchChange}>
                  <option value="">Select</option>
                  {matches.map(match => (
                    <option key={match._id} value={match._id}>{match.MatchTeams}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="teamADropdown">Select Your Team</label>
                <select className="form-control centered-select" id="teamADropdown" name="predicted" value={predictedTeam} onChange={handleTeamChange}>
                  <option value="">Select</option>
                  {teams.map(team => (
                    <option key={team} value={team}>{team}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary btn-block mt-4">Predict</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Predict;
