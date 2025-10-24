import React, { useEffect, useState } from 'react';
const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    console.log('Fetching from:', API_URL);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        console.log('Users data:', data);
        setUsers(data.results || data);
      });
  }, []);
  return (
    <div className="container mt-4">
      <h2>Users</h2>
      <ul className="list-group">
        {users.map((user, i) => (
          <li key={user._id || i} className="list-group-item">
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
