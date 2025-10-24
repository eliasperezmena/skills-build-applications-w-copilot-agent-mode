import React, { useEffect, useState } from 'react';
const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
export default function Teams() {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    console.log('Fetching from:', API_URL);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        console.log('Teams data:', data);
        setTeams(data.results || data);
      });
  }, []);
  return (
    <div className="container mt-4">
      <h2>Teams</h2>
      <ul className="list-group">
        {teams.map((team, i) => (
          <li key={team._id || i} className="list-group-item">
            {team.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
