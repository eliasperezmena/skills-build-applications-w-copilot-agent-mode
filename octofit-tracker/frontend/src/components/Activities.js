import React, { useEffect, useState } from 'react';
const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
export default function Activities() {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    console.log('Fetching from:', API_URL);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        console.log('Activities data:', data);
        setActivities(data.results || data);
      });
  }, []);
  return (
    <div className="container mt-4">
      <h2>Activities</h2>
      <ul className="list-group">
        {activities.map((a, i) => (
          <li key={a._id || i} className="list-group-item">
            {a.type} - {a.duration} min - {a.date}
          </li>
        ))}
      </ul>
    </div>
  );
}
