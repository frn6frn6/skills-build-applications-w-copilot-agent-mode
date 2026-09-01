import React, { useState, useEffect } from 'react';
import { fetchFromApi } from '../api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        const data = await fetchFromApi('users');
        setUsers(data);
        setError(null);
      } catch (err) {
        setError(`Failed to load users: ${err.message}`);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  return (
    <div className="section">
      <h2>Users</h2>
      {error && <div className="error">{error}</div>}
      {users.length === 0 ? (
        <div className="empty-state">No users found</div>
      ) : (
        <ul className="item-list">
          {users.map((user) => (
            <li key={user.id || user._id}>
              <div className="item-details">
                <span className="item-label">Name:</span>
                <span className="item-value">{user.name}</span>
                {user.email && (
                  <>
                    <span className="item-label" style={{ marginLeft: '16px' }}>Email:</span>
                    <span className="item-value">{user.email}</span>
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
