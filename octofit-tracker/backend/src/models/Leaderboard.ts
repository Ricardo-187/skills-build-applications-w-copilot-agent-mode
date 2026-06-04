import mongoose, { Schema, type Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  rank: number;
  name: string;
  team: string;
  points: number;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  rank: { type: Number, required: true },
  name: { type: String, required: true },
  team: { type: String, required: true },
  points: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
