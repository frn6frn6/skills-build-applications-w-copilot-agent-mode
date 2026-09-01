import React, { useState, useEffect } from 'react';
import { fetchFromApi } from '../api';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadActivities() {
      try {
        setLoading(true);
        const data = await fetchFromApi('activities');
        setActivities(data);
        setError(null);
      } catch (err) {
        setError(`Failed to load activities: ${err.message}`);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, []);

  if (loading) {
    return <div className="loading">Loading activities...</div>;
  }

  return (
    <div className="section">
      <h2>Activities</h2>
      {error && <div className="error">{error}</div>}
      {activities.length === 0 ? (
        <div className="empty-state">No activities found</div>
      ) : (
        <ul className="item-list">
          {activities.map((activity) => (
            <li key={activity.id || activity._id}>
              <div className="item-details">
                <span className="item-label">Activity:</span>
                <span className="item-value">{activity.name || activity.type}</span>
                {activity.description && (
                  <>
                    <span className="item-label" style={{ marginLeft: '16px' }}>Description:</span>
                    <span className="item-value">{activity.description}</span>
                  </>
                )}
                {activity.date && (
                  <>
                    <span className="item-label" style={{ marginLeft: '16px' }}>Date:</span>
                    <span className="item-value">{new Date(activity.date).toLocaleDateString()}</span>
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

