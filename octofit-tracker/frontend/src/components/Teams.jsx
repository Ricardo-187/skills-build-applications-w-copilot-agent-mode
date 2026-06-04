import { useEffect, useState } from 'react';
import { fetchJson } from './api';

const TEAMS_API = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://127.0.0.1:8000/api/teams/';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    fetchJson(TEAMS_API)
      .then((data) => {
        if (active) setTeams(data);
      })
      .catch((err) => {
        if (active) setError(err instanceof Error ? err.message : 'Unable to load teams');
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="container py-5">
      <h1 className="mb-3">Teams</h1>
      <p className="text-muted">Competitive squads and team performance metrics.</p>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="row g-4">
        {teams.map((team) => (
          <article key={team._id || team.id} className="col-md-6">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h2 className="h5 card-title">{team.name}</h2>
                <p className="mb-1">Captain: {team.captain}</p>
                <p className="mb-1">Members: {team.members}</p>
                <p className="mb-1">Points: {team.points}</p>
                <p className="mb-0 text-muted">Status: {team.status}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
