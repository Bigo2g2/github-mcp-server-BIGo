import React, { useState, useEffect } from 'react';

const Standings = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/standings') 
      .then(response => response.json())
      .then(data => {
        setStandings(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load standings');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return &lt;div>Loading standings...&lt;/div>;
  }

  if (error) {
    return &lt;div>{error}&lt;/div>;
  }

  return (
    &lt;div>
      &lt;h2>Standings&lt;/h2>
      &lt;table>
        &lt;thead>
          &lt;tr>
            &lt;th>Team&lt;/th>
            &lt;th>W&lt;/th>
            &lt;th>L&lt;/th>  
            &lt;th>Win %&lt;/th>
          &lt;/tr>
        &lt;/thead>
        &lt;tbody>
          {standings.map(team => (
            &lt;tr key={team.team_id}>
              &lt;td>{team.team_name}&lt;/td>
              &lt;td>{team.wins}&lt;/td>
              &lt;td>{team.losses}&lt;/td>
              &lt;td>{team.win_percentage}&lt;/td>
            &lt;/tr>
          ))}
        &lt;/tbody>
      &lt;/table>
    &lt;/div>
  );
};

export default Standings;
