import { useEffect, useState } from 'react';
import { fetchJson } from './api';

const ACTIVITIES_API = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://127.0.0.1:8000/api/activities/';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    fetchJson(ACTIVITIES_API)
      .then((data) => {
        if (active) setActivities(data);
      })
      .catch((err) => {
        if (active) setError(err instanceof Error ? err.message : 'Unable to load activities');
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="container py-5">
      <h1 className="mb-3">Activities</h1>
      <p className="text-muted">Recent logged activity sessions from the backend.</p>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="row g-4">
        {activities.map((activity) => (
          <article key={activity._id || activity.id} className="col-md-6 col-xl-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h2 className="h5 card-title">{activity.type}</h2>
                <p className="mb-1">User: {activity.user}</p>
                <p className="mb-1">Duration: {activity.duration} min</p>
                <p className="mb-1">Points: {activity.points}</p>
                <p className="mb-0 text-muted">{activity.notes || 'No notes recorded.'}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
