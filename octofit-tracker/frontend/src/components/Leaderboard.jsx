import { useEffect, useState } from 'react';
import { fetchJson } from './api';

const LEADERBOARD_API = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://127.0.0.1:8000/api/leaderboard/';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    fetchJson(LEADERBOARD_API)
      .then((data) => {
        if (active) setEntries(data);
      })
      .catch((err) => {
        if (active) setError(err instanceof Error ? err.message : 'Unable to load leaderboard');
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="container py-5">
      <h1 className="mb-3">Leaderboard</h1>
      <p className="text-muted">Current standings from the OctoFit API.</p>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="table-responsive">
        <table className="table table-hover align-middle shadow-sm rounded overflow-hidden">
          <thead className="table-primary">
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Team</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry._id || entry.rank}>
                <td>#{entry.rank}</td>
                <td>{entry.name}</td>
                <td>{entry.team}</td>
                <td>{entry.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
