import mongoose, { Schema } from 'mongoose';
const leaderboardSchema = new Schema({
    rank: { type: Number, required: true },
    name: { type: String, required: true },
    team: { type: String, required: true },
    points: { type: Number, required: true },
}, { timestamps: true });
export default mongoose.model('LeaderboardEntry', leaderboardSchema);
