import { Link, Routes, Route } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { getApiBaseUrl } from './components/api';
import './App.css';

function Home() {
  return (
    <div className="container py-5">
      <h1 className="mb-3">Welcome to OctoFit Tracker</h1>
      <p className="lead">
        A React 19 + Vite presentation tier for the multi-tier fitness tracker.
      </p>
      <div className="alert alert-info" role="status">
        API base URL: <strong>{getApiBaseUrl()}</strong>
      </div>
      <p className="text-muted mb-4">
        Set <strong>VITE_CODESPACE_NAME</strong> in <strong>.env.local</strong> for Codespaces URLs. If it is missing, the app falls back to the local backend on port 8000.
      </p>
      <div className="row g-3">
        {[
          ['Users', '/users'],
          ['Teams', '/teams'],
          ['Activities', '/activities'],
          ['Leaderboard', '/leaderboard'],
          ['Workouts', '/workouts'],
        ].map(([label, path]) => (
          <div className="col-md-4" key={path}>
            <Link className="btn btn-outline-primary w-100 py-3" to={path}>
              {label}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            OctoFit Tracker
          </Link>
          <div className="navbar-nav flex-wrap gap-2">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/users">Users</Link>
            <Link className="nav-link" to="/teams">Teams</Link>
            <Link className="nav-link" to="/activities">Activities</Link>
            <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
            <Link className="nav-link" to="/workouts">Workouts</Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}
