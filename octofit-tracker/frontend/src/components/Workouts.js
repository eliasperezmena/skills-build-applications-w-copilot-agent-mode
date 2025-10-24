import React, { useEffect, useState } from 'react';
const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
    console.log('Fetching from:', API_URL);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        console.log('Workouts data:', data);
        setWorkouts(data.results || data);
      });
  }, []);
  return (
    <div className="container mt-4">
      <h2>Workouts</h2>
      <ul className="list-group">
        {workouts.map((w, i) => (
          <li key={w._id || i} className="list-group-item">
            {w.name} - {w.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
