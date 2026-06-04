import { useEffect, useState } from 'react';
import { fetchJson } from './api';

const USERS_API = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://127.0.0.1:8000/api/users/';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    fetchJson(USERS_API)
      .then((data) => {
        if (active) setUsers(data);
      })
      .catch((err) => {
        if (active) setError(err instanceof Error ? err.message : 'Unable to load users');
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="container py-5">
      <h1 className="mb-3">Users</h1>
      <p className="text-muted">Live profile data from the OctoFit backend API.</p>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="row g-4">
        {users.map((user) => (
          <article key={user._id || user.id} className="col-md-6 col-xl-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h2 className="h5 card-title">{user.name}</h2>
                <p className="mb-1 text-muted">{user.email}</p>
                <p className="mb-1">Team: {user.team}</p>
                <p className="mb-1">Level: {user.level}</p>
                <p className="mb-0 fw-semibold">Points: {user.points}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
