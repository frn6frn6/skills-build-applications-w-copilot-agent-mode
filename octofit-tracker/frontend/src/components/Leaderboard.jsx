import React, { useState, useEffect } from 'react';
import { fetchFromApi } from '../api';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        setLoading(true);
        const data = await fetchFromApi('leaderboard');
        setLeaderboard(data);
        setError(null);
      } catch (err) {
        setError(`Failed to load leaderboard: ${err.message}`);
        setLeaderboard([]);
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  if (loading) {
    return <div className="loading">Loading leaderboard...</div>;
  }

  return (
    <div className="section">
      <h2>Leaderboard</h2>
      {error && <div className="error">{error}</div>}
      {leaderboard.length === 0 ? (
        <div className="empty-state">No leaderboard data found</div>
      ) : (
        <ul className="item-list">
          {leaderboard.map((entry, index) => (
            <li key={entry.id || entry._id || index}>
              <div className="item-details">
                <span className="item-label">#{index + 1}</span>
                <span className="item-value">{entry.name || entry.username}</span>
                {entry.score && (
                  <>
                    <span className="item-label" style={{ marginLeft: '16px' }}>Score:</span>
                    <span className="item-value">{entry.score}</span>
                  </>
                )}
                {entry.workoutsCompleted && (
                  <>
                    <span className="item-label" style={{ marginLeft: '16px' }}>Workouts:</span>
                    <span className="item-value">{entry.workoutsCompleted}</span>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
