import express from 'express';
import mongoose from 'mongoose';
import User from './models/User.js';
import Team from './models/Team.js';
import Activity from './models/Activity.js';
import LeaderboardEntry from './models/Leaderboard.js';
import Workout from './models/Workout.js';
const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
const CODESPACE_NAME = process.env.CODESPACE_NAME?.trim();
app.use(express.json());
function getApiUrl(req) {
    if (CODESPACE_NAME) {
        return `https://${CODESPACE_NAME}-8000.app.github.dev`;
    }
    const forwardedProto = req.headers['x-forwarded-proto'];
    const host = req.headers.host;
    if (typeof forwardedProto === 'string' && host) {
        return `${forwardedProto}://${host}`;
    }
    return `http://localhost:${PORT}`;
}
app.get('/', (_req, res) => {
    res.json({
        message: 'OctoFit Tracker API is running',
        apiUrl: getApiUrl(_req),
    });
});
app.get('/api/config/', (req, res) => {
    res.json({
        apiUrl: getApiUrl(req),
        codespace: CODESPACE_NAME ?? null,
        port: PORT,
    });
});
app.get('/api/users/', async (_req, res) => {
    const users = await User.find({}).lean();
    res.json(users);
});
app.get('/api/teams/', async (_req, res) => {
    const teams = await Team.find({}).lean();
    res.json(teams);
});
app.get('/api/activities/', async (_req, res) => {
    const activities = await Activity.find({}).lean();
    res.json(activities);
});
app.get('/api/leaderboard/', async (_req, res) => {
    const leaderboard = await LeaderboardEntry.find({}).sort('rank').lean();
    res.json(leaderboard);
});
app.get('/api/workouts/', async (_req, res) => {
    const workouts = await Workout.find({}).lean();
    res.json(workouts);
});
mongoose
    .connect(MONGO_URI)
    .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Backend running at http://localhost:${PORT}`);
        console.log(`API URL: ${getApiUrl({ headers: {} })}`);
    });
})
    .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
});
