import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

const Leaderboard = () => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(11);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch('/leaderboard');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setDetails(data);
      } catch (err) {
        console.error('Error fetching leaderboard data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, []);

  // Logic to paginate data
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = details.slice(indexOfFirstEntry, indexOfLastEntry);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Navbar />
      <div className="container leaderboard-container">
        <h2>Leaderboard</h2>
        <div className="leaderboard-table">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th className="username-column">Username</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEntries.map((detail, index) => (
                    <tr key={index}>
                      <td>{indexOfFirstEntry + index + 1}</td>
                      <td className="username-column">{detail.Username}</td>
                      <td>{detail.Score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination */}
              <div className="pagination">
                {[...Array(Math.ceil(details.length / entriesPerPage)).keys()].map((number) => (
                  <button
                    key={number + 1}
                    className={`pagination-button ${currentPage === number + 1 ? 'active' : ''}`}
                    onClick={() => paginate(number + 1)}
                  >
                    {number + 1}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
