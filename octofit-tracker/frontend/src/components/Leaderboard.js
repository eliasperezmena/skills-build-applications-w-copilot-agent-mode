import React, { useEffect, useState } from 'react';
const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
export default function Leaderboard() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    console.log('Fetching from:', API_URL);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        console.log('Leaderboard data:', data);
        setItems(data.results || data);
      });
  }, []);
  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      <ul className="list-group">
        {items.map((item, i) => (
          <li key={item._id || i} className="list-group-item">
            Team: {item.team} - Points: {item.points}
          </li>
        ))}
      </ul>
    </div>
  );
}
