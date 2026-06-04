import mongoose from 'mongoose';
import User from '../models/User.js';
import Team from '../models/Team.js';
import Activity from '../models/Activity.js';
import LeaderboardEntry from '../models/Leaderboard.js';
import Workout from '../models/Workout.js';

// Seed the octofit_db database with test data.

const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

async function seedDatabase() {
  await mongoose.connect(MONGO_URI);
  console.log(`Connected to MongoDB at ${MONGO_URI}`);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    { name: 'Ava Patel', email: 'ava.patel@octofit.local', team: 'Trailblazers', level: 'Advanced', points: 145 },
    { name: 'Liam Chen', email: 'liam.chen@octofit.local', team: 'Peak Performers', level: 'Intermediate', points: 118 },
    { name: 'Maya Rivera', email: 'maya.rivera@octofit.local', team: 'Trailblazers', level: 'Beginner', points: 103 },
  ]);

  const teams = await Team.insertMany([
    { name: 'Trailblazers', captain: 'Ava Patel', members: 12, points: 410, status: 'Active' },
    { name: 'Peak Performers', captain: 'Liam Chen', members: 9, points: 356, status: 'Active' },
  ]);

  await Activity.insertMany([
    { user: 'Ava Patel', type: 'Run', duration: 35, points: 18, notes: 'Morning interval session' },
    { user: 'Liam Chen', type: 'Strength', duration: 45, points: 14, notes: 'Upper body and core workout' },
    { user: 'Maya Rivera', type: 'Walk', duration: 25, points: 8, notes: 'After-school walk with classmates' },
  ]);

  await LeaderboardEntry.insertMany([
    { rank: 1, name: 'Ava Patel', team: 'Trailblazers', points: 145 },
    { rank: 2, name: 'Liam Chen', team: 'Peak Performers', points: 118 },
    { rank: 3, name: 'Maya Rivera', team: 'Trailblazers', points: 103 },
  ]);

  await Workout.insertMany([
    { title: 'Morning Sprint Circuit', category: 'Cardio', difficulty: 'Intermediate', duration: 25, focus: 'Stamina' },
    { title: 'Core & Balance Flow', category: 'Mobility', difficulty: 'Beginner', duration: 20, focus: 'Balance' },
    { title: 'Power Lift Session', category: 'Strength', difficulty: 'Advanced', duration: 40, focus: 'Strength' },
  ]);

  console.log('Seeded collections:', {
    users: users.length,
    teams: teams.length,
    activities: 3,
    leaderboard: 3,
    workouts: 3,
  });

  await mongoose.disconnect();
}

seedDatabase().catch((error) => {
  console.error('Seed failed:', error);
  process.exitCode = 1;
});
