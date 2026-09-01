import React, { useState, useEffect } from 'react';
import { fetchFromApi } from '../api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadTeams() {
      try {
        setLoading(true);
        const data = await fetchFromApi('teams');
        setTeams(data);
        setError(null);
      } catch (err) {
        setError(`Failed to load teams: ${err.message}`);
        setTeams([]);
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  if (loading) {
    return <div className="loading">Loading teams...</div>;
  }

  return (
    <div className="section">
      <h2>Teams</h2>
      {error && <div className="error">{error}</div>}
      {teams.length === 0 ? (
        <div className="empty-state">No teams found</div>
      ) : (
        <ul className="item-list">
          {teams.map((team) => (
            <li key={team.id || team._id}>
              <div className="item-details">
                <span className="item-label">Team:</span>
                <span className="item-value">{team.name}</span>
                {team.description && (
                  <>
                    <span className="item-label" style={{ marginLeft: '16px' }}>Description:</span>
                    <span className="item-value">{team.description}</span>
                  </>
                )}
                {team.members && (
                  <>
                    <span className="item-label" style={{ marginLeft: '16px' }}>Members:</span>
                    <span className="item-value">{team.members.length}</span>
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
