import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

const Fixtures = () => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch('/fixtures');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setDetails(data);
      } catch (err) {
        console.error('Error fetching fixtures data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container fixture-container">
        <h2>Fixtures</h2>
        <div className="fixture-table">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            details && (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className="date-column">Date</th>
                    <th>Matchs</th>
                  </tr>
                </thead>
                <tbody>
                  {details.map((detail, index) => (
                    <tr key={index}>
                      <td className="date-column">{detail.Date}</td>
                      <td>{detail.MatchTeams}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Fixtures;
