import { Link, Routes, Route } from 'react-router-dom';
import './App.css';

function Home() {
  return (
    <div className="container py-5">
      <h1 className="mb-3">Welcome to OctoFit Tracker</h1>
      <p className="lead">
        A modern React + Vite frontend for tracking workouts, teams, and progress.
      </p>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="container py-5">
      <h1 className="mb-3">Dashboard</h1>
      <p className="lead">Monitor activity, teams, and leaderboard metrics here.</p>
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
          <div className="navbar-nav">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
