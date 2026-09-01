import React, { useState, useEffect } from 'react';
import { fetchFromApi } from '../api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadWorkouts() {
      try {
        setLoading(true);
        const data = await fetchFromApi('workouts');
        setWorkouts(data);
        setError(null);
      } catch (err) {
        setError(`Failed to load workouts: ${err.message}`);
        setWorkouts([]);
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  if (loading) {
    return <div className="loading">Loading workouts...</div>;
  }

  return (
    <div className="section">
      <h2>Workouts</h2>
      {error && <div className="error">{error}</div>}
      {workouts.length === 0 ? (
        <div className="empty-state">No workouts found</div>
      ) : (
        <ul className="item-list">
          {workouts.map((workout) => (
            <li key={workout.id || workout._id}>
              <div className="item-details">
                <span className="item-label">Type:</span>
                <span className="item-value">{workout.type}</span>
                {workout.durationMinutes && (
                  <>
                    <span className="item-label" style={{ marginLeft: '16px' }}>Duration:</span>
                    <span className="item-value">{workout.durationMinutes} minutes</span>
                  </>
                )}
                {workout.calories && (
                  <>
                    <span className="item-label" style={{ marginLeft: '16px' }}>Calories:</span>
                    <span className="item-value">{workout.calories} kcal</span>
                  </>
                )}
                {workout.userId && (
                  <>
                    <span className="item-label" style={{ marginLeft: '16px' }}>User:</span>
                    <span className="item-value">{workout.userId}</span>
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
