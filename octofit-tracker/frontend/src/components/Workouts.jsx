import { useEffect, useState } from 'react';
import { fetchJson } from './api';

const WORKOUTS_API = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://127.0.0.1:8000/api/workouts/';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    fetchJson(WORKOUTS_API)
      .then((data) => {
        if (active) setWorkouts(data);
      })
      .catch((err) => {
        if (active) setError(err instanceof Error ? err.message : 'Unable to load workouts');
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="container py-5">
      <h1 className="mb-3">Workouts</h1>
      <p className="text-muted">Suggested routines and training plans.</p>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="row g-4">
        {workouts.map((workout) => (
          <article key={workout._id || workout.id} className="col-md-6 col-xl-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h2 className="h5 card-title">{workout.title}</h2>
                <p className="mb-1">Category: {workout.category}</p>
                <p className="mb-1">Difficulty: {workout.difficulty}</p>
                <p className="mb-1">Duration: {workout.duration} min</p>
                <p className="mb-0 text-muted">Focus: {workout.focus}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
